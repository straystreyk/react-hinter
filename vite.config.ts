import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import { resolve } from "path";
import { libInjectCss } from "vite-plugin-lib-inject-css";

export default defineConfig({
  plugins: [react(), dts({ include: ["lib"] }), libInjectCss()],
  build: {
    copyPublicDir: false,
    ssr: true,
    minify: "esbuild",
    lib: {
      name: "react-hinter",
      entry: resolve(__dirname, "lib/main.ts"),
      formats: ["umd", "es"],
    },
    rollupOptions: {
      external: ["react", "react-dom", "react/jsx-runtime"],

      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
  },
});
