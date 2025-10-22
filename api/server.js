// api/server.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors"); // <-- added

const app = express();
app.use(bodyParser.json());

// Allow CORS for development / Codespaces previews.
// In production you should restrict `origin` to your trusted domain(s).
app.use(
  cors({
    origin: "*", // <- permissive for Codespaces/dev. Replace with explicit origin(s) in prod.
    methods: ["GET", "POST", "OPTIONS", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "Accept"],
    credentials: false,
  })
);

// include webhook routes (existing)
const webhookRoutes = require("./routes/webhooks");
app.use("/api/webhooks", webhookRoutes);

// ✅ Health check route
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

// Default route (optional)
app.get("/", (req, res) => {
  res.send("Dunning API root. Use /api/health");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ API listening on ${PORT}`));
