const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', async (req, res) => {
  const result = await db.query('SELECT * FROM invoices ORDER BY created_at DESC LIMIT 200');
  res.json({ invoices: result.rows });
});

router.post('/', async (req, res) => {
  const { stripe_invoice_id, stripe_customer_id, amount_due, status, due_date, metadata } = req.body;
  // find or create customer
  let customerResult = await db.query('SELECT id FROM customers WHERE stripe_customer_id = $1', [stripe_customer_id]);
  let customerId;
  if (customerResult.rows.length === 0) {
    const r = await db.query('INSERT INTO customers (stripe_customer_id, email, name, metadata) VALUES ($1,$2,$3,$4) RETURNING id', [stripe_customer_id, null, null, {}]);
    customerId = r.rows[0].id;
  } else {
    customerId = customerResult.rows[0].id;
  }
  const result = await db.query(
    `INSERT INTO invoices (stripe_invoice_id, customer_id, amount_due, status, due_date, metadata)
     VALUES ($1,$2,$3,$4,$5,$6) ON CONFLICT (stripe_invoice_id) DO UPDATE SET status=EXCLUDED.status RETURNING *`,
    [stripe_invoice_id, customerId, amount_due, status, due_date || null, metadata || {}]
  );
  res.json({ invoice: result.rows[0] });
});

module.exports = router;