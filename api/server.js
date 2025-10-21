const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

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
