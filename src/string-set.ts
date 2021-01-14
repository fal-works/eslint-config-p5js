import fs = require("fs");
import jsYaml = require("js-yaml");

const validateStringArray = (data: any) => {
  if (!Array.isArray(data)) throw new Error(`Not an array: ${data}`);
  for (const element of data) {
    if (typeof element !== "string")
      throw new Error(`Not a string: ${element}`);
  }
  return data as string[];
};

const validateUnique = <T>(array: T[]) => {
  const deduplicated = [...new Set(array)];
  if (array.length !== deduplicated.length)
    throw new Error(`Found duplicated elements: ${array}`);
};

export const read = async (filepath: fs.PathLike): Promise<string[]> => {
  const fileContent = await fs.promises.readFile(filepath);
  const rawData = jsYaml.load(fileContent.toString());
  const list = validateStringArray(rawData);
  validateUnique(list);

  return list;
};
