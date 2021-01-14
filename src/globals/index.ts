import stringSet = require("../string-set");
import dirs = require("../data-directories");
import util = require("./util");
import p5Instance = require("./p5-instance");

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
 * Generates a JavaScript module code that exports a `Globals` object
 * to be applied when using p5.js.
 */
export const generate = async (): Promise<string> => {
  const variableNames = util.getMaybePublicKeys(await p5Instance.create());
  variableNames.sort();

  const globals = createGlobals(variableNames, "readonly");
  return createExporterCode(globals);
};

/**
 * Generates a JavaScript module code that exports a `Globals` object
 * to be applied when using p5.Sound.
 */
export const generateP5Sound = async (): Promise<string> => {
  const variableNames = await stringSet.read(
    `${dirs.paths.srcData.path}/sound-globals.yaml`
  );

  const globals = createGlobals(variableNames, "readonly");
  return createExporterCode(globals);
};
