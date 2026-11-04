import { readFileSync } from "node:fs";
import { join } from "node:path";
import { neon } from "@neondatabase/serverless";

const migrationPath = join(process.cwd(), "migrations", "0001_create_enquiries.sql");

let ensured: Promise<void> | null = null;

/**
 * Create the enquiries table and index if they are missing.
 * Runs the CREATE TABLE / CREATE INDEX statements from
 * migrations/0001_create_enquiries.sql once per server instance.
 */
export function ensureEnquiriesTable(): Promise<void> {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) return Promise.resolve();
  if (!ensured) {
    ensured = applyEnquiriesMigration(databaseUrl).catch((error: unknown) => {
      ensured = null;
      throw error;
    });
  }
  return ensured;
}

function migrationStatements(): string[] {
  const source = readFileSync(migrationPath, "utf8");
  return source
    .split(/\r?\n/)
    .filter((line) => !line.trim().startsWith("--"))
    .join("\n")
    .split(";")
    .map((statement) => statement.trim())
    .filter((statement) => statement.length > 0);
}

async function applyEnquiriesMigration(databaseUrl: string): Promise<void> {
  const sql = neon(databaseUrl);
  for (const statement of migrationStatements()) {
    await sql.query(statement);
  }
}
