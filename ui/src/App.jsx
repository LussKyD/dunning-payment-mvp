// ui/src/App.jsx
import React, { useEffect, useState } from "react";
import api, { API_BASE } from "./api";

export default function App() {
  const [status, setStatus] = useState("Checking...");
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function checkHealth() {
      try {
        const res = await api.get("/api/health"); // ✅ Correct path
        setData(res.data);
        setStatus("✅ API Connected");
        setError(null);
      } catch (err) {
        console.error("Health check failed:", err);
        setStatus("❌ API Offline");
        setError(err.message || String(err));
      }
    }

    checkHealth();
  }, []);

  return (
    <div
      style={{
        maxWidth: 900,
        margin: "40px auto",
        padding: 24,
        background: "#fff",
        borderRadius: 12,
      }}
    >
      <h1>Dunning Admin</h1>
      <p>
        <strong>Status:</strong> {status}
      </p>
      <p>
        <small>
          Using API_BASE: <code>{API_BASE}</code>
        </small>
      </p>
      {data && (
        <pre
          style={{
            background: "#f6f8fa",
            padding: 12,
            borderRadius: 6,
          }}
        >
          {JSON.stringify(data, null, 2)}
        </pre>
      )}
      {error && (
        <div style={{ color: "crimson", marginTop: 12 }}>
          <strong>Error:</strong> {error}
        </div>
      )}
    </div>
  );
}
