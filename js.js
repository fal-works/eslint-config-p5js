const noUnusedVarsIgnore = require("./data/rules/no-unused-vars/ignore-pattern");
const globals = require("./data/globals");

module.exports = {
  rules: {
    "no-unused-vars": [
      "error",
      {
        varsIgnorePattern: noUnusedVarsIgnore,
      },
    ],
  },
  globals,
};
