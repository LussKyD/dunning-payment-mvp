import React, { useEffect, useState } from "react";

export default function App() {
  const [status, setStatus] = useState("Checking...");
  const [data, setData] = useState(null);

  // Base URL — use Codespaces .env or fallback to local dev
  const API_BASE = "";


  useEffect(() => {
    fetch(`${API_BASE}/api/health`)
      .then((r) => r.json())
      .then((j) => {
        setData(j);
        setStatus("✅ API Connected");
      })
      .catch((err) => {
        console.error("Health check failed:", err);
        setStatus("❌ API Offline");
      });
  }, [API_BASE]);

  return (
    <div
      style={{
        maxWidth: 700,
        margin: "40px auto",
        padding: 24,
        background: "#fff",
        borderRadius: 12,
      }}
    >
      <h1>Dunning Admin</h1>
      <p>{status}</p>
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
}
