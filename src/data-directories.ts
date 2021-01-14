import fs = require("fs");

/** Object that represents a directory. Might contain sub-directories. */
type Directory = { path: string };

/** OMG what's that */
export const paths = (() => {
  const data = "data";
  const data_globals = `${data}/globals`;
  const data_rules = `${data}/rules`;
  const data_rules_noUnusedVars = `${data_rules}/no-unused-vars`;

  const dataP5Sound = "data-sound";
  const dataP5Sound_globals = `${dataP5Sound}/globals`;

  const srcData = "src-data";

  return {
    data: {
      path: data,
      globals: { path: data_globals },
      rules: {
        path: data_rules,
        noUnusedVars: { path: data_rules_noUnusedVars },
      },
    },
    dataP5Sound: {
      path: dataP5Sound,
      globals: { path: dataP5Sound_globals },
    },
    srcData: { path: srcData },
  };
})();

/** Runs `rm()` with `recursive` and `force`. */
const rmdir = (directory: Directory) =>
  fs.promises.rm(directory.path, { recursive: true, force: true });

/** Runs `mkdir()` with `recursive`. */
const mkdir = (directory: Directory) =>
  fs.promises.mkdir(directory.path, { recursive: true });

const cleanData = async (remakeSubDirs = true) => {
  await rmdir(paths.data);

  if (!remakeSubDirs) return;

  await mkdir(paths.data.globals);
  await mkdir(paths.data.rules.noUnusedVars);
};

const cleanDataP5Sound = async (remakeSubDirs = true) => {
  await rmdir(paths.dataP5Sound);

  if (!remakeSubDirs) return;

  await mkdir(paths.dataP5Sound.globals);
};

/** Clean up all distribution data. */
export const cleanUp = async (): Promise<void> => {
  await Promise.all([cleanData(), cleanDataP5Sound()]);
};
