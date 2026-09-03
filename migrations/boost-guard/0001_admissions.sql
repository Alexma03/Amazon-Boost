-- No questions, responses, raw addresses or conversation identifiers are stored.
CREATE TABLE IF NOT EXISTS boost_admissions (
  id TEXT PRIMARY KEY,
  actor TEXT NOT NULL,
  created_at INTEGER NOT NULL,
  lease_until INTEGER NOT NULL,
  finished INTEGER NOT NULL DEFAULT 0 CHECK (finished IN (0, 1))
);
CREATE INDEX IF NOT EXISTS boost_admissions_time ON boost_admissions(created_at);
CREATE INDEX IF NOT EXISTS boost_admissions_actor ON boost_admissions(actor, created_at);
