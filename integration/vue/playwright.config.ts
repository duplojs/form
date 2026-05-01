import { defineConfig, devices } from "playwright/test";
import { envs } from "./envs";
import { stringToMillisecond } from "@duplojs/utils";

export default defineConfig({
	testDir: "./pages",
	fullyParallel: true,
	forbidOnly: envs.CI,
	retries: envs.RETRIES,
	workers: envs.WORKERS,
	timeout: stringToMillisecond("5s"),
	webServer: {
		command: "npx vite --config vite.config.js --port 1301",
		url: envs.BASE_URL,
	},
	reporter: [
		[
			"html",
			{
				open: "never",
				outputFolder: "playwright-report",
			},
		],
		["list"],
	],
	use: {
		headless: true,
		trace: "retain-on-failure",
		screenshot: "only-on-failure",
		baseURL: envs.BASE_URL,
	},
	projects: [
		{
			name: "chromium",
			use: { ...devices["Desktop Chrome"] },
		},
	],
});
