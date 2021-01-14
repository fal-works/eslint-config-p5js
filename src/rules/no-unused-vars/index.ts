import stringSet = require("../../string-set");
import dirs = require("../../data-directories");

/**
 * Generates a JavaScript module code that exports a pattern of variable names
 * that should pass the `no-unused-vars` rule.
 */
export const generateAllowedPattern = async (): Promise<string> => {
  const dataPath = `${dirs.srcData}/unused-var-allowed.yaml`;
  const variableNames = await stringSet.read(dataPath);

  const code: string[] = [];
  code.push(`const variablenames = ${JSON.stringify(variableNames)}`);
  code.push(`const pattern = variablenames.join("|");`);
  code.push(`module.exports = pattern;\n`);

  return code.join("\n");
};
