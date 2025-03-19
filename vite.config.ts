import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "http://exchange-v2-env.eba-ccvmvqqg.us-west-1.elasticbeanstalk.com",
        changeOrigin: true,
        secure: true, // Ensures HTTPS requests
        rewrite: (path) => path.replace(/^\/api/, ""), // Removes "/api" prefix before forwarding
      },
    },
  },
});
