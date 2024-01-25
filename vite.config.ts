import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { moveDTSPlugin } from "./plugins/moveDTSPlugin";
import { generateAssetsBuildPaths } from "./plugins/generateAssets";

export default defineConfig({
  plugins: [react(), moveDTSPlugin()],
  build: {
    copyPublicDir: false,
    ssr: true,
    minify: "esbuild",
    lib: {
      name: "react-hinter",
      entry: resolve(__dirname, "lib/main.ts"),
      formats: ["cjs", "es"],
    },
    rollupOptions: {
      external: ["react", "react-dom"],
      output: {
        extend: true,
        inlineDynamicImports: false,
        assetFileNames: generateAssetsBuildPaths,
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
  },
});
