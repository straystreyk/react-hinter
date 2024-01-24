import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import { libInjectCss } from "vite-plugin-lib-inject-css";
import { resolve } from "path";

export default defineConfig({
  plugins: [react(), dts({ include: ["lib"] }), libInjectCss()],
  build: {
    copyPublicDir: false,
    lib: {
      name: "react-hinter",
      entry: resolve(__dirname, "lib/main.ts"),
    },
    rollupOptions: {
      external: ["react", "react-dom"],
      output: {
        inlineDynamicImports: false,
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
  },
});
