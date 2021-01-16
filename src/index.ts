import { generateAll } from "./generator";
import { log, error } from "./util/logger";

/**
 * Runs the entire generator script.
 */
const run = async () => {
  log("start generating...");

  try {
    await generateAll();
  } catch (err: unknown) {
    error(err);
    error("aborting due to failure.");
    process.exit(1);
  }

  log("completed.");
  process.exit(0);
};

run();
