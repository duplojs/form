import { createInput } from "@form/v0/vue";
import PolicyCheckbox from "./PolicyCheckbox.vue";

export const usePolicyCheckbox = createInput(
	PolicyCheckbox,
	{
		defaultValue: false,
		props: {
			label: "Accept terms",
		},
	},
);
