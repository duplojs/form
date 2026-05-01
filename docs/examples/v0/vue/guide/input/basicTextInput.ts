import { createInput } from "@form/v0/vue";
import BasicTextInput from "./BasicTextInput.vue";

export const useBasicTextInput = createInput(
	BasicTextInput,
	{
		defaultValue: "",
	},
);
