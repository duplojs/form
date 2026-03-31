import { Path } from "@duplojs/utils";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
	resolve: {
		alias: {
			"@V": import.meta.dirname
		},
	},
	plugins: [
		vue(), 
		tsconfigPaths(),
	],
	build: {
		outDir: Path.resolveRelative([import.meta.dirname, "../../dist/vue"]),
		cssCodeSplit: true,
		lib: {
			entry: {
				index: Path.resolveRelative([import.meta.dirname, "index.ts"]),
				grid: Path.resolveRelative([import.meta.dirname, "templates/grid/index.ts"]),
				designSystem: Path.resolveRelative([import.meta.dirname, "designSystem/index.ts"]),
			},
			name: "form/vue",
			formats: ["es", "cjs"],
		},
		rollupOptions: {
			external: ["vue"],
			output: {
				globals: {
					vue: "Vue",
				},
			},
		}
	},
})