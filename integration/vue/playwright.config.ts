import { defineConfig, devices } from "playwright/test";
import { environmentVariableOrThrow } from "@duplojs/server-utils";
import { DPE, stringToMillisecond } from "@duplojs/utils";

const envs = await environmentVariableOrThrow({
	CI: DPE.coerce.boolean().optional().default(false),
	RETRIES: DPE.coerce.number().optional().default(0),
	WORKERS: DPE.coerce.number().optional().default(1),
});

const baseURL = "http://localhost:1301";

export default defineConfig({
	testDir: "./tests",
	fullyParallel: true,
	forbidOnly: envs.CI,
	retries: envs.RETRIES,
	workers: envs.WORKERS,
	webServer: {
		command: "npx vite --config vite.config.js --port 1301",
		url: baseURL,
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
		baseURL,
	},
	projects: [
		{
			name: "chromium",
			use: { ...devices["Desktop Chrome"] },
		},
	],
});
