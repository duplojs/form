import { environmentVariableOrThrow } from "@duplojs/server-utils";
import { DPE } from "@duplojs/utils";

export const envs = await environmentVariableOrThrow({
	CI: DPE.coerce.boolean().optional().default(false),
	RETRIES: DPE.coerce.number().optional().default(0),
	WORKERS: DPE.coerce.number().optional().default(1),
	BASE_URL: DPE.url().optional().default("http://localhost:1301"),
});
