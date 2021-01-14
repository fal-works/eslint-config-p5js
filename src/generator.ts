import fs = require("fs");
import rules = require("./rules");
import globals = require("./globals");
import dirs = require("./data-directories");
import { error, log } from "./logger";

type GenerateTask = {
  filepath: string;
  generator: () => Promise<string>;
};

/** Runs `task` and prints the result. */
const generate = async (task: GenerateTask) => {
  const { filepath, generator } = task;

  const code = await generator();

  try {
    await fs.promises.writeFile(filepath, code);
    log(`generated: ${filepath}`);
  } catch (err) {
    error(`failed to generate: ${filepath}`);
    throw err;
  }
};

/** Runs `tasks` in parallel. */
const generateParallel = async (tasks: GenerateTask[]) => {
  const promises = tasks.map(generate);
  await Promise.all(promises);
};

/**
 * Generates all config files.
 */
export const generateAll = async (): Promise<void> => {
  await dirs.cleanUp();

  const { data, dataP5Sound } = dirs.paths;

  await generateParallel([
    {
      filepath: `${data.rules.noUnusedVars.path}/ignore-pattern.js`,
      generator: rules.noUnusedVars.generate,
    },
    {
      filepath: `${data.globals.path}/index.js`,
      generator: globals.generate,
    },
    {
      filepath: `${dataP5Sound.globals.path}/index.js`,
      generator: globals.generateP5Sound,
    },
  ]);
};
