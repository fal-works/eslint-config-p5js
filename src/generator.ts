import fs = require("fs");
import rules = require("./rules");
import globals = require("./globals");
import dirs = require("./data-directories");
import { error, log } from "./logger";

/**
 * Just an alias of `writeFile`.
 */
const writeCode = async (filepath: string, code: string) =>
  fs.promises.writeFile(filepath, code);

/**
 * Writes a JavaScript file that simply exports an object.
 */
const writeExporter = (
  filepath: string,
  objectToExport: Record<string, unknown>
) => {
  const code = `module.exports = ${JSON.stringify(objectToExport)};`;

  return writeCode(filepath, code);
};

/**
 * Generates a JavaScript file that exports a pattern of variable names
 * that should pass the `no-unused-vars` rules.
 */
const generateRules = async (filepath: string) =>
  writeCode(filepath, await rules.noUnusedVars.generateAllowedPatternCode());

/**
 * Generates a JavaScript file that exports basic `Globals`.
 */
const generateGlobals = async (filepath: string) =>
  writeExporter(filepath, await globals.generate());

/**
 * Generates a JavaScript file that exports `Globals` for `p5.Sound`.
 */
const generateGlobalsP5Sound = async (filepath: string) =>
  writeExporter(filepath, globals.generateP5Sound());

/**
 * Generates all config files.
 */
export const generateAll = async (): Promise<void> => {
  await dirs.cleanUp();

  const promises: Promise<void>[] = [];
  const add = (
    filepath: string,
    generator: (filepath: string) => Promise<void>
  ) => {
    promises.push(
      generator(filepath).then(
        (path) => log(`generated: ${path}`),
        (err) => {
          error(`failed to generate: ${filepath}`);
          return Promise.reject(err);
        }
      )
    );
  };

  add(`${dirs.noUnusedVars}/allowed-pattern.js`, generateRules);
  add(`${dirs.globals}/index.js`, generateGlobals);
  add(`${dirs.globalsP5Sound}/index.js`, generateGlobalsP5Sound);

  await Promise.all(promises);
};
