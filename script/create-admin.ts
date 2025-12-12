import { db } from "../server/db";
import { users } from "../shared/schema";
import { scrypt, randomBytes } from "crypto";
import { promisify } from "util";
import { eq } from "drizzle-orm";

const scryptAsync = promisify(scrypt);

async function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const derivedKey = (await scryptAsync(password, salt, 64)) as Buffer;
  return `${derivedKey.toString("hex")}.${salt}`;
}

async function main() {
  // --- CONFIGURATION ---
  const username = "admin";       // The username you will use to login
  const password = "admin123";    // The password
  const name = "System Admin";
  // ---------------------

  console.log(`Checking for user '${username}'...`);

  const existingUser = await db.select().from(users).where(eq(users.username, username));

  if (existingUser.length > 0) {
    console.log(`User '${username}' already exists. Promoting to ADMIN...`);
    await db.update(users)
      .set({ role: "admin" })
      .where(eq(users.username, username));
  } else {
    console.log(`Creating new ADMIN user '${username}'...`);
    const hashedPassword = await hashPassword(password);
    
    await db.insert(users).values({
      username,
      password: hashedPassword,
      name,
      role: "admin",
      mobile: "9999999999" // Dummy mobile for admin
    });
  }

  console.log("✅ Success! Admin account is ready.");
  console.log(`👉 Login with: ${username} / ${password}`);
  process.exit(0);
}

main().catch((err) => {
  console.error("Error creating admin:", err);
  process.exit(1);
});