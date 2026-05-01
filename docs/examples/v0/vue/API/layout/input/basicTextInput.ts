import { createInput } from "@duplojs/form/vue";
import BasicTextInput from "./BasicTextInput.vue";

export const useBasicTextInput = createInput(
	BasicTextInput,
	{
		defaultValue: "",
	},
);
