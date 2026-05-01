import { createInput } from "@form/v0/vue";
import FirstInput from "./FirstInput.vue";

export const useMyTextInput = createInput(
	FirstInput,
	{ defaultValue: "" },
);
