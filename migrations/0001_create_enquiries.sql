-- Apply manually against Neon (no drizzle-kit in this repo):
--   psql "$DATABASE_URL" -f migrations/0001_create_enquiries.sql
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
