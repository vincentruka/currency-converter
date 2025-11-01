import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Don't clean dist during build so SSR bundle is preserved
    emptyOutDir: false,
    rollupOptions: {
      input: {
        client: resolve(__dirname, "src/entry-client.tsx"),
      },
    },
  },
  ssr: {
    noExternal: ["@tanstack/react-query", "styled-components"],
  },
});
