-- DB schema for dunning/payment recovery
CREATE TABLE IF NOT EXISTS webhook_events (
  id TEXT PRIMARY KEY,
  provider TEXT,
  raw_payload JSONB,
  received_at TIMESTAMP DEFAULT now(),
  verified BOOLEAN DEFAULT false,
  processed BOOLEAN DEFAULT false
);

CREATE TABLE IF NOT EXISTS dunning_attempts (
  id SERIAL PRIMARY KEY,
  invoice_id TEXT NOT NULL,
  customer_id TEXT,
  retry_count INT DEFAULT 0,
  last_error_code TEXT,
  last_retry_at TIMESTAMP,
  next_retry_at TIMESTAMP,
  amount_due BIGINT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT now()
);

CREATE TABLE IF NOT EXISTS payment_audit_log (
  id SERIAL PRIMARY KEY,
  dunning_id INT REFERENCES dunning_attempts(id),
  event TEXT,
  details JSONB,
  actor TEXT,
  created_at TIMESTAMP DEFAULT now()
);
