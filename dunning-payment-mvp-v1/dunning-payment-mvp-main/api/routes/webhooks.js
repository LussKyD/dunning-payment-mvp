const express = require("express");
const router = express.Router();

// Stripe webhook simulation endpoint
router.post("/stripe", (req, res) => {
  console.log("🌀 Stripe webhook received:", req.body);
  res.status(200).json({ received: true });
});

module.exports = router;
