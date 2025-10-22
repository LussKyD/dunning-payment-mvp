// ui/src/api.js
import axios from "axios";

/**
 * API_BASE is read from Vite env (VITE_API_URL).
 * In Codespaces this should be something like:
 *   https://<your-codespace>-3000.app.github.dev
 *
 * If undefined, fallback to http://localhost:3000
 */
export const API_BASE =
  import.meta.env.VITE_API_URL || "http://localhost:3000";

const api = axios.create({
  baseURL: API_BASE,
  withCredentials: false, // explicit: we are not sending cookies by default
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
