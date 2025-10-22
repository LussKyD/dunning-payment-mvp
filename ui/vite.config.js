// ui/vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

/**
 * This Vite config uses process.env.VITE_API_URL (set by your .env / Codespaces)
 * to point the dev server proxy at the right backend target.
 *
 * Note: Vite loads its own env vars; when you edit .env in the repo on GitHub,
 * Codespaces should pick that up on restart/refresh.
 */
const API_URL = process.env.VITE_API_URL || "http://localhost:3000";

export default defineConfig({
  plugins: [react()],
  base: "/",
  server: {
    port: 5173,
    proxy: {
      "/api": {
        target: API_URL,
        changeOrigin: true,
        secure: false, // allow https target without strict certificate validation in previews
      },
    },
  },
  preview: {
    port: 4173,
  },
});
