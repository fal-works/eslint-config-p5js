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

const readonly: Permission = "readonly";

/** Creates a JavaScript module code that exports `globals`. */
const createExporterCode = (globals: Globals): string => {
  const stringified = JSON.stringify(globals);

  const replacer = new RegExp(`"${readonly}"`, "g");
  const replaced = stringified.replace(replacer, "ro");

  return `const ro = "${readonly}";\n\nmodule.exports=${replaced}`;
};

/**
 * Converts a list of variable names to a JavaScript code
 * that exports a `Global` object.
 */
export const from = (names: string[]): string =>
  createExporterCode(createGlobals(names, readonly));
