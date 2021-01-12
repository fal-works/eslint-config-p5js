import generator = require("./generator");
import log = require("./log");

/**
 * Runs the entire generator script.
 */
const run = async () => {
  log.emit("start generating...");

  try {
    await generator.generateAll();
  } catch (err: any) {
    log.emitError(err);
    log.emitError("aborting due to failure.");
    process.exit(1);
  }

  log.emit("completed.");
  process.exit(0);
};

run();
