import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReactConfig from "eslint-plugin-react/configs/recommended.js";
import { fixupConfigRules } from "@eslint/compat";

export default [
	{ languageOptions: { globals: globals.browser } },
	pluginJs.configs.recommended,
	...tseslint.configs.recommended,
	{
		files: ["**/*.jsx", "**/*.tsx"],
		languageOptions: { parserOptions: { ecmaFeatures: { jsx: true } } },
	},
	...fixupConfigRules(pluginReactConfig),
	{
		rules: {
			"no-unused-vars": "off", // Disable no-unused-vars for JavaScript
			"@typescript-eslint/no-unused-vars": "off", // Disable no-unused-vars for TypeScript
			"no-undef": "off", // Disable no-undef rule
		},
	},
];
