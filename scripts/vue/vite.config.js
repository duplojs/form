import { Path } from "@duplojs/utils";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
	plugins: [
		vue(), 
		tsconfigPaths(),
	],
	build: {
		outDir: Path.resolveRelative([import.meta.dirname, "../../dist/vue"]),
		lib: {
			entry: Path.resolveRelative([import.meta.dirname, "index.ts"]),
			name: "form/vue",
			formats: ["es", "cjs"],
			fileName: "index",
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