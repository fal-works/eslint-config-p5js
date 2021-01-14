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

  await generateParallel([
    {
      filepath: `${dirs.rules}/index.js`,
      generator: rules.generateIndex,
    },
    {
      filepath: `${dirs.noUnusedVars}/ignore-pattern.js`,
      generator: rules.noUnusedVars.generateIgnorePattern,
    },
    {
      filepath: `${dirs.globals}/index.js`,
      generator: globals.generate,
    },
    {
      filepath: `${dirs.globalsP5Sound}/index.js`,
      generator: globals.generateP5Sound,
    },
  ]);
};
