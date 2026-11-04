import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { eq } from "drizzle-orm";
import { getDb, type Database } from "./db";
import { users } from "./schema";
import { verifyPassword } from "./password";
import { clientIp, rateLimit } from "./rate-limit";

const googleId = process.env.AUTH_GOOGLE_ID || process.env.GOOGLE_CLIENT_ID;
const googleSecret = process.env.AUTH_GOOGLE_SECRET || process.env.GOOGLE_CLIENT_SECRET;
const DEFAULT_ADMIN_EMAIL = "maghmelastays@gmail.com";

function adminEmailAllowlist(): Set<string> {
  const raw = process.env.ADMIN_EMAILS;
  const source = raw === undefined ? DEFAULT_ADMIN_EMAIL : raw;
  return new Set(
    source
      .split(",")
      .map((entry) => entry.trim().toLowerCase())
      .filter((entry) => entry.length > 0),
  );
}

function isAllowlistedAdmin(identity: string | null | undefined): boolean {
  if (!identity) return false;
  const normalized = identity.trim().toLowerCase();
  if (!normalized) return false;
  return adminEmailAllowlist().has(normalized);
}

/** Promote an allowlisted account to admin. Never writes a non-admin role. */
async function grantAdminIfAllowlisted(
  db: Database,
  userId: number,
  currentRole: string,
  identities: Array<string | null | undefined>,
): Promise<boolean> {
  if (!identities.some((identity) => isAllowlistedAdmin(identity))) return false;
  if (currentRole !== "admin") {
    await db.update(users).set({ role: "admin" }).where(eq(users.id, userId));
  }
  return true;
}

function authSecret() {
  return (
    process.env.AUTH_SECRET ||
    process.env.NEXTAUTH_SECRET ||
    (process.env.NEXT_PHASE === "phase-production-build" ? "build-time-placeholder" : undefined)
  );
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  trustHost: true,
  secret: authSecret(),
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
  providers: [
    ...(googleId && googleSecret ? [Google({ clientId: googleId, clientSecret: googleSecret })] : []),
    Credentials({
      credentials: {
        username: { label: "Username" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, request) {
        const ip = request ? clientIp(request) : "local";
        if (!(await rateLimit(`login:${ip}`, 10, 15 * 60 * 1000))) return null;

        const username = String(credentials?.username || "").trim();
        const password = String(credentials?.password || "");
        const db = getDb();
        if (!db || !username || !password) return null;

        const [user] = await db.select().from(users).where(eq(users.username, username)).limit(1);
        if (!user?.password) return null;
        const valid = await verifyPassword(password, user.password);
        if (!valid) return null;
        const allowlisted = await grantAdminIfAllowlisted(db, user.id, user.role, [username, user.username]);
        return { id: String(user.id), name: user.name, email: user.username, role: allowlisted ? "admin" : user.role };
      },
    }),
  ],
  callbacks: {
    async signIn({ account, profile }) {
      if (account?.provider !== "google") return true;
      const email = profile?.email;
      if (!email) return false;
      const db = getDb();
      if (!db) return false;

      const [existing] = await db.select().from(users).where(eq(users.username, email)).limit(1);
      if (!existing) {
        await db.insert(users).values({
          username: email,
          googleId: account.providerAccountId,
          name: profile?.name || "Google User",
          role: isAllowlistedAdmin(email) ? "admin" : "user",
          mobile: "",
        });
      } else {
        const patch: { googleId?: string; role?: string } = {};
        if (!existing.googleId) patch.googleId = account.providerAccountId;
        if (existing.role !== "admin" && (isAllowlistedAdmin(email) || isAllowlistedAdmin(existing.username))) {
          patch.role = "admin";
        }
        if (patch.googleId || patch.role) {
          await db.update(users).set(patch).where(eq(users.id, existing.id));
        }
      }
      return true;
    },
    async jwt({ token, user, account, profile }) {
      if (user?.id) token.uid = user.id;
      if (user?.role) token.role = user.role;
      if (isAllowlistedAdmin(user?.email)) token.role = "admin";
      if (account?.provider === "google" && profile?.email) {
        const db = getDb();
        if (db) {
          const [row] = await db.select().from(users).where(eq(users.username, profile.email)).limit(1);
          if (row) {
            token.uid = String(row.id);
            token.role = row.role;
            token.name = row.name;
            // Re-read must not drop an allowlisted admin back to the stored role.
            if (await grantAdminIfAllowlisted(db, row.id, row.role, [profile.email, row.username])) {
              token.role = "admin";
            }
          }
        }
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = String(token.uid || token.sub || "");
      session.user.role = String(token.role || "user");
      return session;
    },
  },
});

export async function requireUser() {
  const session = await auth();
  if (!session?.user?.id) return null;
  return session;
}

export async function requireAdmin() {
  const session = await requireUser();
  if (!session || session.user.role !== "admin") return null;
  return session;
}
