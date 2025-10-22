// stripe listener example (simple)
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.raw({type:'application/json'}));
app.post('/webhooks/payments/stripe', (req,res)=>{
  console.log('Received stripe raw length', req.body.length);
  res.status(200).send('ok');
});
app.listen(3000, ()=>console.log('stripe listener 3000'));