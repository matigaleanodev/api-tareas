/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  env: {
    es2021: true,
    node: true,
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    // Comentá esto si no tenés problemas con la CLI y tsconfig
    // Si no, dejalo comentado para evitar errores en VSCode
    // project: ["tsconfig.json", "tsconfig.dev.json"],
  },
  plugins: ["@typescript-eslint", "import"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended-type-checked",
    "plugin:@typescript-eslint/stylistic",
  ],
  ignorePatterns: ["lib/**", "generated/**", "dist/**", "node_modules/**"],
  rules: {
    quotes: ["error", "double"],
    indent: ["error", 2],
    "linebreak-style": ["error", "unix"],
    "import/no-unresolved": "off",
    "@typescript-eslint/no-explicit-any": "off", // si estás usando `any` durante desarrollo
    "@typescript-eslint/explicit-module-boundary-types": "off", // evita que te pida tipos en cada función exportada
  },
};
