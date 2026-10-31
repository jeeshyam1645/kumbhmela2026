import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@shared": path.resolve(__dirname, "../shared"),
      "@app/shared": path.resolve(__dirname, "../shared/types.ts"),
    },
  },
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },server: {
    fs: {
      allow: [".."], // 👈 VERY IMPORTANT
    },
  },
});
