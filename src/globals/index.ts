import util = require("./util");
import p5Instance = require("./p5-instance");
import p5Sound = require("./p5-sound");

import type { Globals } from "../eslint-types";

/**
 * The read/write permission for any global variable.
 */
type Permission = Globals[keyof Globals];

/**
 * Generates `Globals` object from a list of read-only variable names.
 */
const generateFromNames = (
  variableNames: string[],
  permission: Permission
): Globals => {
  const names = variableNames.slice();
  const globals: Globals = {};
  for (const name of names) globals[name] = permission;

  return globals;
};

/**
 * Generates `Globals` object to be applied when using p5.js.
 */
export const generate = async (): Promise<Globals> => {
  const variableNames = util.getMaybePublicKeys(await p5Instance.create());
  variableNames.sort();

  return generateFromNames(variableNames, "readonly");
};

/**
 * Generates `Globals` object to be applied when using `p5.Sound`.
 */
export const generateP5Sound = (): Globals =>
  generateFromNames(p5Sound.variableNames, "readonly");
