// ui/src/App.jsx
import React, { useEffect, useState } from "react";
import api, { API_BASE } from "./api";

export default function App() {
  const [status, setStatus] = useState("Checking...");
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Log the resolved import.meta.env and API_BASE for debugging in Codespaces
    // (this will appear in the browser console)
    try {
      // eslint-disable-next-line no-console
      console.log("VITE_API_URL (import.meta.env):", import.meta.env.VITE_API_URL);
      // eslint-disable-next-line no-console
      console.log("API_BASE (used by api.js):", API_BASE);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.warn("Could not read import.meta.env in this environment", e);
    }

    async function checkHealth() {
      setStatus("Checking...");
      try {
        const res = await api.get("/api/health"); // correct path
        setData(res.data);
        setStatus("✅ API Connected");
        setError(null);
      } catch (err) {
        // axios throws a generic 'Network Error' for CORS/preflight or network issues
        let msg = "Network Error";
        if (err && err.response && err.response.data) {
          try {
            msg = JSON.stringify(err.response.data);
          } catch (e) {
            msg = String(err.response.data);
          }
        } else if (err && err.message) {
          msg = err.message;
        }
        setError(msg);
        setStatus("❌ API Offline");
        setData(null);
      }
    }

    checkHealth();
  }, []);

  return (
    <div style={{ padding: 20, fontFamily: "system-ui, sans-serif" }}>
      <h1>Dunning Admin</h1>
      <div>
        <strong>Status:</strong> {status}
      </div>

      <div style={{ marginTop: 12 }}>
        <div>
          <strong>Using API_BASE:</strong> {API_BASE}
        </div>
      </div>

      {data && (
        <pre
          style={{
            marginTop: 12,
            padding: 12,
            background: "#f6f8fa",
            borderRadius: 6,
            whiteSpace: "pre-wrap",
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
