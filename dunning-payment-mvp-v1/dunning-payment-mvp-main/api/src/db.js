const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:5432/dunning_dev',
});

async function init() {
  // create tables if not exist
  await pool.query(`
    CREATE TABLE IF NOT EXISTS webhook_events (
      id SERIAL PRIMARY KEY,
      stripe_id TEXT,
      type TEXT,
      payload JSONB,
      received_at TIMESTAMP DEFAULT NOW()
    );
  `);
  await pool.query(`
    CREATE TABLE IF NOT EXISTS customers (
      id SERIAL PRIMARY KEY,
      stripe_customer_id TEXT UNIQUE,
      email TEXT,
      name TEXT,
      metadata JSONB,
      created_at TIMESTAMP DEFAULT NOW()
    );
  `);
  await pool.query(`
    CREATE TABLE IF NOT EXISTS invoices (
      id SERIAL PRIMARY KEY,
      stripe_invoice_id TEXT UNIQUE,
      customer_id INTEGER REFERENCES customers(id),
      amount_due INTEGER,
      status TEXT,
      due_date TIMESTAMP,
      metadata JSONB,
      created_at TIMESTAMP DEFAULT NOW()
    );
  `);
  console.log('DB initialized');
}

module.exports = {
  query: (text, params) => pool.query(text, params),
  pool,
  init
};