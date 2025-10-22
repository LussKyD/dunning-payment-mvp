const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', async (req, res) => {
  const result = await db.query('SELECT * FROM customers ORDER BY created_at DESC LIMIT 100');
  res.json({ customers: result.rows });
});

router.post('/', async (req, res) => {
  const { stripe_customer_id, email, name, metadata } = req.body;
  const result = await db.query(
    `INSERT INTO customers (stripe_customer_id, email, name, metadata) 
     VALUES ($1,$2,$3,$4) ON CONFLICT (stripe_customer_id) DO UPDATE SET email=EXCLUDED.email RETURNING *`,
    [stripe_customer_id, email, name, metadata || {}]
  );
  res.json({ customer: result.rows[0] });
});

module.exports = router;