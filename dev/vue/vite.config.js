import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { Path } from "@duplojs/utils";

export default defineConfig({
	resolve: {
		alias: {
			"@V": Path.resolveRelative([import.meta.dirname, "../../scripts/vue"])
		},
	},
	plugins: [
		vue(),
	],
	server: {
		port: 1506,
	}
});