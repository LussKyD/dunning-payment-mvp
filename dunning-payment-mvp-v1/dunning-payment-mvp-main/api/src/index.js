const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');
const customers = require('./routes/customers');
const invoices = require('./routes/invoices');
const { dunningQueue, createDunningWorker } = require('./queues/dunning');

const app = express();
app.use(bodyParser.json());

app.get('/api/health', (req, res) => res.json({ ok: true }));

app.use('/api/customers', customers);
app.use('/api/invoices', invoices);

// Simple webhook receiver that stores events
app.post('/api/webhook', async (req, res) => {
  try {
    const { id, type } = req.body;
    await db.query('INSERT INTO webhook_events (stripe_id, type, payload) VALUES ($1,$2,$3)', [id || null, type || null, req.body]);
    // enqueue dunning job for invoice.payment_failed
    if (type === 'invoice.payment_failed' && req.body.data && req.body.data.object) {
      const invoice = req.body.data.object;
      await dunningQueue.add('retry-invoice', { invoice });
    }
    res.json({ received: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'failed to store webhook' });
  }
});

// simple route to trigger a retry job manually
app.post('/api/retry', async (req, res) => {
  const { invoice_id } = req.body;
  await dunningQueue.add('manual-retry', { invoice_id });
  res.json({ enqueued: true });
});

const PORT = process.env.PORT || 4000;

async function start() {
  try {
    await db.init();
    // start worker with a simple process function
    createDunningWorker(async (data) => {
      console.log('Dunning process for', data);
      // Here: call mailer, update invoice status, or reattempt payment via Stripe (placeholder)
      // If job fails, throw to let bullmq handle retries
      return true;
    });
    app.listen(PORT, () => console.log(`API listening ${PORT}`));
  } catch (err) {
    console.error('Failed to start', err);
    process.exit(1);
  }
}

start();