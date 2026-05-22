import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  server: {
    proxy: {
      // during local dev, frontend at 5173 → backend at 5000
      "/api": "http://localhost:5000"
    }
  }
});