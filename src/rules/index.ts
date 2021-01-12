import unusedVarsAllowed = require("./unused-vars-allowed");

import type { Rules, RuleEntry } from "../eslint-types";

/**
 * Generates `Rules` object to be applied when using p5.js.
 */
export const generate = (language: "ts" | "js"): Rules => {
  const noUnusedVarsEntry: RuleEntry = [
    "error",
    { varsIgnorePattern: unusedVarsAllowed.variableNames.join("|") },
  ];

  switch (language) {
    case "ts":
      return {
        "no-unused-vars": "off",
        "@typescript-eslint/no-unused-vars": noUnusedVarsEntry,
      };
    case "js":
      return { "no-unused-vars": noUnusedVarsEntry };
  }
};
