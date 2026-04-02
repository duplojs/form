import { defineConfig } from "vitest/config";
import vue from "@vitejs/plugin-vue";
import tsconfigPaths from 'vite-tsconfig-paths'
import { Path } from "@duplojs/utils";

export default defineConfig({
	resolve: {
		alias: {
			"@V": Path.resolveRelative([import.meta.dirname, "scripts/vue"]),
		},
	},
	test: {
		environment: 'jsdom',
		watch: false,
		globals: true,
		include: [
			"tests/**/*.test.ts",
			"integration/**/*.test.ts",
		],
		coverage: {
			provider: "istanbul",
			reporter: ["text", "json", "html", "json-summary"],
			reportsDirectory: "coverage",
			include: [
				"scripts/vue/form.ts",
				"scripts/vue/formField.ts",
				"scripts/vue/input.ts",
				"scripts/vue/kind.ts",
				"scripts/vue/template.ts",
				"scripts/vue/layouts/**/*.ts",
			],
			exclude: [
				"**/*.test.ts", 
				"bin", 
				"dist",
				"docs",
			],
			thresholds: {
				lines: 100,
				branches: 100,
				functions: 100,
				statements: 100
			}
		},
		benchmark: {
			include: [
				"tests/**/*.bench.ts",
				"integration/**/*.bench.ts",
			]
		}
	},
	plugins: [vue(), tsconfigPaths()],
});
