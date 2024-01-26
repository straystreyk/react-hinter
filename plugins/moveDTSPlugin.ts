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
      let imports = "";
      let exports = "";
      let innerContents = "";
      const files = await readdir(typesPath);

      for (const file of files) {
        const content = await readFile(typesPath + "/" + file, "utf8");
        const importMatches = content.match(
          /import[\s\S]*?from\s+["'][^"']*["'];/g,
        );
        const exportMatches = content.match(/export\s*\{[\s\S]*?\};/g);
        const innerContent = content.replace(
          /(\bimport\b[^;]*;|\bexport\b[^;]*;)/g,
          "",
        );

        if (importMatches) {
          imports += importMatches.join("\n") + "\n";
        }
        innerContents += innerContent.trim() + "\n\n";
        if (exportMatches) {
          exports += exportMatches.join("\n") + "\n";
        }
      }

      const finalContent =
        imports.trim() +
        "\n\n" +
        innerContents.trim() +
        "\n\n" +
        exports.trim();

      await writeFileAsync(rootDir + "/dist/main.d.ts", finalContent);
    },
  };
};
