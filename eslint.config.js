import {duplojsEslintOpen, duplojsEslintTest} from "@duplojs/eslint";
import tseslint from "typescript-eslint";
import vueParser from "vue-eslint-parser";
import pluginVue from "eslint-plugin-vue";
import { A, pipe } from "@duplojs/utils";

export default [
	{
		...duplojsEslintTest,
		languageOptions: {
			...duplojsEslintTest.languageOptions,
			parserOptions: {
				...duplojsEslintTest.languageOptions.parserOptions,
				projectService: true,
			},
		},
		files: ["**/*.test.ts", "**/*.bench.ts", "test/**/*.ts"],
		ignores: ["**/*.d.ts"]
	},
	{
		...duplojsEslintOpen,
		languageOptions: {
			parser: vueParser,
			parserOptions: {
				parser: tseslint.parser,
				sourceType: "module",
				projectService: true,
				extraFileExtensions: [".vue"],
			},
		},
		plugins: {
			...duplojsEslintOpen.plugins,
			vue: pluginVue,
		},
		processor: "vue/vue",
		rules: {
			...duplojsEslintOpen.rules,
			...pipe(
				pluginVue.configs["flat/strongly-recommended"],
				A.reduce(
					A.reduceFrom({}),
					({element: {rules}, next, lastValue}) => next({
						...lastValue,
						...rules,
					})
				),
			),
			"vue/require-default-prop": "off",
			"vue/html-indent": ["error", "tab"],
			"no-undef": "off",
			"max-len": "off",
			"vue/padding-line-between-tags": [
				"error",
				[
					{
						blankLine: "always",
						prev: "*",
						next: "*",
					},
				],
			],
			"vue/block-order": [
				"error",
				{
					order: [["script", "template"], "style"],
				},
			],
			"vue/html-self-closing": ["error", {
				"html": {
					"void": "always",
					"normal": "always",
					"component": "always"
				},
				"svg": "always",
				"math": "always"
			}],
			"vue/prefer-import-from-vue": "off",
			"@stylistic/js/max-len": "off",
			"@typescript-eslint/no-unsafe-argument": "off",
			"@typescript-eslint/no-unsafe-call": "off",
			"@typescript-eslint/no-unsafe-declaration-merging": "off",
			"@typescript-eslint/no-unsafe-enum-comparison": "off",
			"@typescript-eslint/no-unsafe-function-type": "off",
			"@typescript-eslint/no-unsafe-member-access": "off",
			"@typescript-eslint/no-unsafe-unary-minus": "off",
			"@typescript-eslint/no-redundant-type-constituents": "off",
			"@typescript-eslint/no-use-before-define": "off",
			"@typescript-eslint/no-namespace": "off",
			"id-length": [
				"error",
				{
					min: 2,
					exceptions: ["t"],
				},
			],
		},
		files: ["**/*.vue", "**/*.ts"],
		ignores: ["**/*.test.ts", "**/*.bench.ts", "test/**/*.ts", "**/*.d.ts"],
	},
	{
		rules: {
			"@stylistic/js/no-multiple-empty-lines": "off",
			"@typescript-eslint/no-confusing-void-expression": "off",
			"no-nested-ternary": "off",
			"@stylistic/js/line-comment-position": "off",
			"@typescript-eslint/consistent-type-definitions": "off",
		},
		files: ["docs/examples/**/*.ts"],
	},
	{
		ignores: ["coverage", "dist", "docs/public/*", "docs/.vitepress/cache/*", "docs/.vitepress/dist/*"]
	}
];
