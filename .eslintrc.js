"use strict";

module.exports = {
  root: true,
  extends: [
    "eslint:recommended",
    "plugin:eslint-plugin/recommended",
    "plugin:node/recommended",
    "prettier",
  ],
  env: {
    node: true,
  },
  plugins: ["prettier"],
  rules: {
    "prettier/prettier": ["error"],
  },
  overrides: [
    {
      files: ["tests/**/*.js"],
      env: { mocha: true },
    },
  ],
};
