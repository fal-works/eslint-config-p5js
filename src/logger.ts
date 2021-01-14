import logger = require("@fal-works/tiny-logger");

const prefix = "[eslint-config-p5js-typescript] ";

/** Prints log message. */
export const log = logger.createSimple(prefix, process.stdout);

/** Prints warn message */
export const warn = logger.createSimple(prefix + "warn:  ", process.stderr);

/** Prints error message. */
export const error = logger.createSimple(prefix + "ERROR: ", process.stderr);
