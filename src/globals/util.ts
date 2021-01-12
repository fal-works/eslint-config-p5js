/**
 * @returns Keys of `obj` that do not start with underscore `_`.
 */
export const getMaybePublicKeys = <T>(obj: T): (keyof T)[] => {
  const keys: (keyof T)[] = [];
  for (const key in obj) if (key[0] !== "_") keys.push(key);

  return keys;
};
