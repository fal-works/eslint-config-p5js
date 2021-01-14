import util = require("../../util");
import dirs = require("../../data-directories");

/**
 * Generates a JavaScript module code that exports a pattern of variable names
 * that should pass the `no-unused-vars` rule.
 */
export const generate = async (): Promise<string> => {
  const dataPath = `${dirs.paths.srcData.path}/unused-var-ignore.yaml`;
  const variableNames = await util.readStringSet(dataPath);

  const code: string[] = [];
  code.push(`const variablenames = ${JSON.stringify(variableNames)}`);
  code.push(`const pattern = variablenames.join("|");`);
  code.push(`module.exports = pattern;\n`);

  return code.join("\n\n");
};
