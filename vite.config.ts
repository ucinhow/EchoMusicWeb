import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import { resolve } from "path";
// https://vitejs.dev/config/

export default defineConfig({
  server: { host: "0.0.0.0", port: 4173 },
  plugins: [react(), svgr()],
  resolve: {
    alias: {
      "@src": resolve(__dirname, "src"),
    },
  },
});
