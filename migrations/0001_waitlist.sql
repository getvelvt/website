CREATE TABLE IF NOT EXISTS waitlist (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT NOT NULL COLLATE NOCASE,
  name TEXT NOT NULL,
  plan TEXT NOT NULL,
  role TEXT,
  company TEXT,
  referral TEXT,
  notes TEXT,
  ip_hash TEXT,
  user_agent TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE UNIQUE INDEX IF NOT EXISTS waitlist_email_unique ON waitlist (email);
CREATE INDEX IF NOT EXISTS waitlist_created_at ON waitlist (created_at);
CREATE INDEX IF NOT EXISTS waitlist_ip_hash_created ON waitlist (ip_hash, created_at);
