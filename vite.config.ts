import { defineConfig } from "vite";
import react from "@vitejs/plugin-react"; // Plugin standard maintenant
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  base: "/",
});
