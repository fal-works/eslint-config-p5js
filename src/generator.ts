import globals = require("./globals");
import rules = require("./rules");
import configFile = require("./config-file");

/**
 * Generates basic config for TypeScript and saves it as `index.js`.
 */
const generateIndex = async () =>
  configFile.write("index.js", {
    globals: await globals.generate(),
    rules: rules.generate("ts"),
  });

/**
 * Generates basic config for JavaScript and saves it as `js.js`.
 */
const generateJs = async () =>
  configFile.write("js.js", {
    globals: await globals.generate(),
    rules: rules.generate("js"),
  });

/**
 * Generates `p5.Sound` config and saves it as `sound.js`.
 */
const generateP5Sound = async () =>
  configFile.write("sound.js", {
    globals: globals.generateP5Sound(),
  });

/**
 * Generates all config files.
 */
export const generateAll = async (): Promise<void> => {
  const promises: Promise<void>[] = [];

  promises.push(generateIndex());
  promises.push(generateJs());
  promises.push(generateP5Sound());

  await Promise.all(promises);
};
