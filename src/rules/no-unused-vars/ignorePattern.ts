import util = require("../../util");
import dirs = require("../../data-directories");

/**
 * Generates a JavaScript module code that exports a pattern of variable names
 * that should pass the `no-unused-vars` rule.
 */
export const generate = async (): Promise<string> => {
  const dataPath = `${dirs.paths.srcData.path}/unused-var-ignore.yaml`;
  const patternList = await util.readStringSet(dataPath);

  const pattern = `\\\\b(?:${patternList.join("|")})\\\\b`;

  return `module.exports = \"${pattern}\";\n`;
};
