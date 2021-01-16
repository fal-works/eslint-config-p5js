import logger = require("@fal-works/tiny-logger");

const prefix = "[eslint-config-p5js-typescript] ";

/** Prints log message. */
export const log = logger.createSimple(prefix, process.stdout);

/** Prints warn message */
export const warn = logger.create(
  prefix + "warn:  ",
  process.stderr,
  console.warn
);

/** Prints error message. */
export const error = logger.create(
  prefix + "ERROR: ",
  process.stderr,
  console.error
);
