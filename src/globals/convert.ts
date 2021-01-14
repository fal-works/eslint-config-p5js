import type { Globals } from "../eslint-types";

/**
 * The read/write permission for any global variable.
 */
type Permission = Globals[keyof Globals];

/**
 * Generates `Globals` object from a list of read-only variable names.
 */
const createGlobals = (
  variableNames: string[],
  permission: Permission
): Globals => {
  const names = variableNames.slice();
  const globals: Globals = {};
  for (const name of names) globals[name] = permission;

  return globals;
};

/** Creates a JavaScript module code that exports `globals`. */
const createExporterCode = (globals: Globals): string => {
  const stringified = JSON.stringify(globals);
  const replaced = stringified.replaceAll('"readonly"', "ro");
  const code = `const ro = "readonly";\n\nmodule.exports=${replaced}`;
  return code;
};

/**
 * Converts a list of variable names to a JavaScript code
 * that exports a `Global` object.
 */
export const from = (names: string[]): string => {
  const globals = createGlobals(names, "readonly");
  return createExporterCode(globals);
};
