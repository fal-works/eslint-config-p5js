import dirs = require("../data-directories");
import util = require("../util");
import p5Instance = require("./p5-instance");
import convert = require("./convert");

/**
 * Generates a JavaScript module code that exports a `Globals` object
 * to be applied when using p5.js.
 */
export const generate = async (): Promise<string> => {
  const p5FieldNames = util.getMaybePublicKeys(await p5Instance.create());
  const otherGlobalNames = ["p5"];
  const variableNames = otherGlobalNames.concat(p5FieldNames);
  variableNames.sort();

  return convert.from(variableNames);
};

/**
 * Generates a JavaScript module code that exports a `Globals` object
 * to be applied when using p5.sound.
 */
export const generateP5Sound = async (): Promise<string> => {
  const variableNames = await util.readStringSet(
    `${dirs.paths.srcData.path}/sound-globals.yaml`
  );

  return convert.from(variableNames);
};
