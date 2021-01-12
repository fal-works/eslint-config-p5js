const logPrefix = "[eslint-config-p5js-typescript] ";

type Message = Parameters<typeof console.log>[0];
type ErrorMessage = Parameters<typeof console.error>[0];

/** Prints log message. */
export const emit = (message: Message): void => {
  process.stdout.write(logPrefix);
  console.log(message);
};

/** Prints error message. */
export const emitError = (message: ErrorMessage): void => {
  process.stderr.write(logPrefix);
  console.error(message);
};
