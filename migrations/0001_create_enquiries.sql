-- Canonical DDL for the enquiries table.
-- lib/ensure-enquiries.ts reads this file and runs the statements below
-- (CREATE TABLE IF NOT EXISTS + CREATE INDEX IF NOT EXISTS) once per server instance.
-- No manual psql step is required. The statements stay idempotent if re-run.
CREATE TABLE IF NOT EXISTS enquiries (
  id serial PRIMARY KEY,
  name text NOT NULL,
  phone text NOT NULL,
  email text,
  message text,
  tent_type text,
  check_in text,
  check_out text,
  guests integer,
  status text NOT NULL DEFAULT 'new',
  email_sent boolean NOT NULL DEFAULT false,
  created_at timestamp NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS enquiries_created_at_idx ON enquiries (created_at DESC);
