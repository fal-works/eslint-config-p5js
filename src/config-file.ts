import fs = require("fs");

import type { Config } from "./eslint-types";

/** Creates and writes a JavaScript file that exports `config`. */
export const write = async (
  filepath: string,
  config: Config
): Promise<void> => {
  const configString = JSON.stringify(config, undefined, "  ");
  const fileContent = `module.exports = ${configString};\n`;

  return fs.promises.writeFile(filepath, fileContent);
};
