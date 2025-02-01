import pluginJs from "@eslint/js";
const typeScriptEsLintPlugin = require('@typescript-eslint/eslint-plugin');
const { FlatCompat } = require('@eslint/eslintrc');

const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: typeScriptEsLintPlugin.configs['recommended'],
  });

export default [
    pluginJs.configs.recommended,

   {
    plugins: {
        "@typescript-eslint": typeScriptEsLintPlugin
    },
    files: [
        "**/*.ts",
        "**/*.cts",
        "**.*.mts"
    ],
       rules: {
    "@/semi": ["error"],
    "@typescript-eslint/explicit-function-return-type": 0,
    "@typescript-eslint/explicit-module-boundary-types": 0,
    "@typescript-eslint/no-unsafe-member-access": 0,
    "@typescript-eslint/no-unused-vars": [
        "error", { "argsIgnorePattern": "^_" }
    ],
    "@typescript-eslint/no-explicit-any": 1,
    "no-case-declarations": 0,
    "react/prop-types": 0
  }
}
];