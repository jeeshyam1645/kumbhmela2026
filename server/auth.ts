import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Express } from "express";
import session from "express-session";
import { scrypt, randomBytes, timingSafeEqual } from "crypto";
import { promisify } from "util";
import { users, insertUserSchema } from "@shared/schema";
import { db, pool } from "./db";
import { eq } from "drizzle-orm";
import connectPgSimple from "connect-pg-simple";
import rateLimit from "express-rate-limit";

const scryptAsync = promisify(scrypt);
const PgSession = connectPgSimple(session);

// --- SECURITY: RATE LIMITER ---
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Limit each IP to 10 login requests per windowMs
  message: "Too many login attempts, please try again later."
});

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

export function setupAuth(app: Express) {
  const sessionSettings: session.SessionOptions = {
    store: new PgSession({ pool, createTableIfMissing: true }),
    secret: process.env.SESSION_SECRET || "super_secret_key_change_in_prod",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      secure: process.env.NODE_ENV === "production",
    },
  };

  if (process.env.NODE_ENV === "production") {
    app.set("trust proxy", 1);
  }

  app.use(session(sessionSettings));
  app.use(passport.initialize());
  app.use(passport.session());

  // 1. LOCAL STRATEGY
  passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        const [user] = await db.select().from(users).where(eq(users.username, username)).limit(1);
        if (!user) return done(null, false, { message: "Incorrect username." });
        
        // If user registered via Google, they won't have a password
        if (!user.password) {
          return done(null, false, { message: "Please log in with Google." });
        }

        const isValid = await comparePasswords(password, user.password);
        if (!isValid) return done(null, false, { message: "Incorrect password." });
        
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    })
  );

  // 2. GOOGLE STRATEGY
  passport.use(new GoogleStrategy({
      clientID: process.env.GOOGLE_CLIENT_ID || "", // Reads from .env
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      callbackURL: "/api/auth/google/callback"
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails?.[0].value;
        const googleId = profile.id;

        if (!email) return done(new Error("No email found from Google"), false);

        // Check if user exists
        let [user] = await db.select().from(users).where(eq(users.username, email)).limit(1);

        if (!user) {
          // Create new social user (No password)
          [user] = await db.insert(users).values({
            username: email,
            googleId: googleId,
            name: profile.displayName || "Google User",
            role: "user",
            mobile: "", // Optional
          }).returning();
        } else if (!user.googleId) {
          // Link existing account if email matches
          await db.update(users).set({ googleId }).where(eq(users.id, user.id));
        }
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  ));

  passport.serializeUser((user: any, done) => done(null, user.id));
  passport.deserializeUser(async (id: number, done) => {
    try {
      const [user] = await db.select().from(users).where(eq(users.id, id)).limit(1);
      done(null, user);
    } catch (err) {
      done(err);
    }
  });

  // --- ROUTES ---

  // Google Login Trigger
  app.get("/api/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));

  // Google Callback
  app.get("/api/auth/google/callback", 
    passport.authenticate("google", { failureRedirect: "/" }),
    (req, res) => {
      res.redirect("/"); // Redirect to home on success
    }
  );

  // Local Register (Protected by Rate Limit)
  app.post("/api/register", loginLimiter, async (req, res, next) => {
    try {
      const result = insertUserSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json(result.error);
      }

      const { username, password, name, mobile } = result.data;

      // Ensure password is provided for manual registration
      if (!password) {
        return res.status(400).send("Password is required for registration");
      }

      const [existingUser] = await db
        .select()
        .from(users)
        .where(eq(users.username, username))
        .limit(1);

      if (existingUser) {
        return res.status(400).send("Username already exists");
      }

      const hashedPassword = await hashPassword(password);

      const [newUser] = await db.insert(users).values({
        username,
        password: hashedPassword,
        role: "user",
        name,
        mobile: mobile || "",
      }).returning();

      req.login(newUser, (err) => {
        if (err) return next(err);
        res.status(201).json(newUser);
      });
    } catch (err) {
      next(err);
    }
  });

  // Local Login (Protected by Rate Limit)
  app.post("/api/login", loginLimiter, (req, res, next) => {
    passport.authenticate("local", (err: any, user: any, info: any) => {
      if (err) return next(err);
      if (!user) return res.status(400).send(info.message || "Login failed");
      req.login(user, (err) => {
        if (err) return next(err);
        return res.json(user);
      });
    })(req, res, next);
  });

  app.post("/api/logout", (req, res, next) => {
    req.logout((err) => {
      if (err) return next(err);
      res.sendStatus(200);
    });
  });

  app.get("/api/user", (req, res) => {
    if (req.isAuthenticated()) return res.json(req.user);
    res.status(401).send("Not logged in");
  });
}