/** Generates a JavaScript code that exports sub-modules. */
export const generateIndex = async (): Promise<string> => {
  const code: string[] = [];
  code.push('const noUnusedVars = require("./no-unused-vars");');
  code.push("module.exports = { noUnusedVars };");

  return code.join("\n");
};

export * as noUnusedVars from "./no-unused-vars";
