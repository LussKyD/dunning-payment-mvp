// Minimal Express server for webhooks and health check
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json({limit: '1mb'}));

app.post('/webhooks/payments/stripe', (req, res) => {
  console.log('Received stripe webhook', req.body && req.body.id, req.body && req.body.type);
  res.status(200).send('ok');
});

app.post('/webhooks/payments/whop', (req, res) => {
  console.log('Received whop webhook', req.body && req.body.id, req.body && req.body.type);
  res.status(200).send('ok');
});

app.get('/health', (req, res) => res.json({ok:true, now: new Date().toISOString()}));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log('API listening on', port));
