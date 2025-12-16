import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Express } from "express";
import session from "express-session";
import { scrypt, randomBytes, timingSafeEqual } from "crypto";
import { promisify } from "util";
import { users, insertUserSchema } from "@app/shared";
import { db, pool } from "./db";
import { eq } from "drizzle-orm";
import connectPgSimple from "connect-pg-simple";
import rateLimit from "express-rate-limit";

const scryptAsync = promisify(scrypt);
const PgSession = connectPgSimple(session);

/* ---------------- RATE LIMITER ---------------- */
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: "Too many login attempts, please try again later.",
});

/* ---------------- PASSWORD UTILS ---------------- */
async function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const derivedKey = (await scryptAsync(password, salt, 64)) as Buffer;
  return `${derivedKey.toString("hex")}.${salt}`;
}

async function comparePasswords(supplied: string, stored: string) {
  const [hashed, salt] = stored.split(".");
  const hashedBuf = Buffer.from(hashed, "hex");
  const suppliedBuf = (await scryptAsync(supplied, salt, 64)) as Buffer;
  return timingSafeEqual(hashedBuf, suppliedBuf);
}

/* ===================== AUTH SETUP ===================== */
export function setupAuth(app: Express) {
  /* ---------- REQUIRED FOR RENDER / VERCEL ---------- */
  app.set("trust proxy", 1);

  /* ---------------- SESSION CONFIG ---------------- */
  const sessionSettings: session.SessionOptions = {
    store: new PgSession({
      pool,
      createTableIfMissing: true,
    }),
    secret: process.env.SESSION_SECRET || "CHANGE_ME_IN_PRODUCTION",
    resave: false,
    saveUninitialized: false,
    proxy: true,
    cookie: {
      httpOnly: true,
      secure: true,            // REQUIRED for SameSite=None
      sameSite: "none",        // REQUIRED for Google OAuth
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    },
  };

  app.use(session(sessionSettings));
  app.use(passport.initialize());
  app.use(passport.session());

  /* ===================== LOCAL STRATEGY ===================== */
  passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        const [user] = await db
          .select()
          .from(users)
          .where(eq(users.username, username))
          .limit(1);

        if (!user) {
          return done(null, false, { message: "Incorrect username." });
        }

        if (!user.password) {
          return done(null, false, {
            message: "This account uses Google login.",
          });
        }

        const isValid = await comparePasswords(password, user.password);
        if (!isValid) {
          return done(null, false, { message: "Incorrect password." });
        }

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    })
  );

  /* ===================== GOOGLE STRATEGY ===================== */
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        callbackURL:
          "https://magh-mela-backend.onrender.com/api/auth/google/callback",
      },
      async (_accessToken, _refreshToken, profile, done) => {
        try {
          const email = profile.emails?.[0]?.value;
          const googleId = profile.id;

          if (!email) {
            return done(new Error("No email received from Google"));
          }

          let [user] = await db
            .select()
            .from(users)
            .where(eq(users.username, email))
            .limit(1);

          if (!user) {
            [user] = await db
              .insert(users)
              .values({
                username: email,
                googleId,
                name: profile.displayName || "Google User",
                role: "user",
                mobile: "",
              })
              .returning();
          } else if (!user.googleId) {
            await db
              .update(users)
              .set({ googleId })
              .where(eq(users.id, user.id));
          }

          return done(null, user);
        } catch (err) {
          return done(err);
        }
      }
    )
  );

  /* ===================== SESSION SERIALIZATION ===================== */
  passport.serializeUser((user: any, done) => done(null, user.id));

  passport.deserializeUser(async (id: number, done) => {
    try {
      const [user] = await db
        .select()
        .from(users)
        .where(eq(users.id, id))
        .limit(1);
      done(null, user);
    } catch (err) {
      done(err);
    }
  });

  /* ===================== ROUTES ===================== */

  // --- GOOGLE LOGIN ---
  app.get(
    "/api/auth/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
  );

  app.get(
    "/api/auth/google/callback",
    passport.authenticate("google", { failureRedirect: "/" }),
    (_req, res) => {
      res.redirect("https://kumbhmela2026-1216-1458.vercel.app");
    }
  );

  // --- REGISTER ---
  app.post("/api/register", loginLimiter, async (req, res, next) => {
    try {
      const result = insertUserSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json(result.error);
      }

      const { username, password, name, mobile } = result.data;

      if (!password) {
        return res.status(400).send("Password required");
      }

      const [existing] = await db
        .select()
        .from(users)
        .where(eq(users.username, username))
        .limit(1);

      if (existing) {
        return res.status(400).send("User already exists");
      }

      const hashedPassword = await hashPassword(password);

      const [newUser] = await db
        .insert(users)
        .values({
          username,
          password: hashedPassword,
          name,
          mobile: mobile || "",
          role: "user",
        })
        .returning();

      req.login(newUser, (err) => {
        if (err) return next(err);
        res.status(201).json(newUser);
      });
    } catch (err) {
      next(err);
    }
  });

  // --- LOGIN ---
  app.post("/api/login", loginLimiter, (req, res, next) => {
    passport.authenticate("local", (err: any, user: any, info: any) => {
      if (err) return next(err);
      if (!user) return res.status(400).send(info?.message || "Login failed");

      req.login(user, (err) => {
        if (err) return next(err);
        res.json(user);
      });
    })(req, res, next);
  });

  // --- LOGOUT ---
  app.post("/api/logout", (req, res, next) => {
    req.logout((err) => {
      if (err) return next(err);
      res.sendStatus(200);
    });
  });

  // --- CURRENT USER ---
  app.get("/api/user", (req, res) => {
    if (req.isAuthenticated()) {
      return res.json(req.user);
    }
    res.status(401).send("Not logged in");
  });
}
