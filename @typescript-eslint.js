const noUnusedVarsIgnore = require("./data/rules/no-unused-vars/ignore-pattern");

module.exports = {
  rules: {
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": [
      "warn",
      {
        varsIgnorePattern: noUnusedVarsIgnore,
      },
    ],
  },
};
