import { createInput } from "@duplojs/form/vue";
import FirstInput from "./FirstInput.vue";

export const useMyTextInput = createInput(
	FirstInput,
	{ defaultValue: "" },
);
