import type * as eslint from "eslint";

/** Object for ESLint config. */
export type Config = eslint.Linter.Config;

/** Object for `globals` field of the ESLint config. */
export type Globals = Exclude<Config["globals"], undefined>;

/** Object for `rules` field of the ESLint config. */
export type Rules = Exclude<Config["rules"], undefined>;

/** Entry value of `Rules`. */
export type RuleEntry = eslint.Linter.RuleEntry;
