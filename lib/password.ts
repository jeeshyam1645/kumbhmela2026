import { randomBytes, scrypt, timingSafeEqual } from "crypto";
import { promisify } from "util";

const scryptAsync = promisify(scrypt);

export async function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const derived = (await scryptAsync(password, salt, 64)) as Buffer;
  return `${derived.toString("hex")}.${salt}`;
}

export async function verifyPassword(password: string, stored: string) {
  const [hashed, salt] = stored.split(".");
  if (!hashed || !salt) return false;
  const hashedBuf = Buffer.from(hashed, "hex");
  const supplied = (await scryptAsync(password, salt, 64)) as Buffer;
  if (hashedBuf.length !== supplied.length) return false;
  return timingSafeEqual(hashedBuf, supplied);
}
