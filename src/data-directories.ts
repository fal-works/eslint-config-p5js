import fs = require("fs");

// paths of data
export const data = "data";
export const globals = `${data}/globals`;
export const rules = `${data}/rules`;
export const noUnusedVars = `${rules}/no-unused-vars`;

// paths of data for p5.Sound
export const dataP5Sound = "data-sound";
export const globalsP5Sound = `${dataP5Sound}/globals`;

// paths of source data
export const srcData = "src-data";

/** Runs `rm()` with `recursive` and `force`. */
const rmdir = (path: string) =>
  fs.promises.rm(path, { recursive: true, force: true });

/** Runs `mkdir()` with `recursive`. */
const mkdir = (path: string) => fs.promises.mkdir(path, { recursive: true });

const cleanData = async (remakeSubDirs = true) => {
  await rmdir(data);

  if (!remakeSubDirs) return;

  await mkdir(globals);
  await mkdir(noUnusedVars);
};

const cleanDataP5Sound = async (remakeSubDirs = true) => {
  await rmdir(dataP5Sound);

  if (!remakeSubDirs) return;

  await mkdir(globalsP5Sound);
};

/** Clean up all distribution data. */
export const cleanUp = async (): Promise<void> => {
  await Promise.all([cleanData(), cleanDataP5Sound()]);
};
