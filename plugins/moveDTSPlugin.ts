import { Plugin } from "vite";
import fs from "fs";
import { promisify } from "node:util";
import * as path from "node:path";

const readdir = promisify(fs.readdir);
const readFile = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);
const rootDir = path.resolve();

export const moveDTSPlugin: () => Plugin = () => {
  return {
    name: "move-dts",

    async closeBundle() {
      const typesPath = `${rootDir}/lib/@types`;
      let finalContent = "";
      const files = await readdir(typesPath);

      for (const file of files) {
        finalContent = await readFile(typesPath + "/" + file, "utf8");
      }

      await writeFileAsync(rootDir + "/dist/main.d.ts", finalContent);
    },
  };
};
