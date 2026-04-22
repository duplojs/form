import { type FunctionSelectInputComponent } from "@V/templates/grid/components/types";
import { h } from "vue";

import SelectInput from "./SelectInput.vue";

export * from "./icons";
export * from "./button";
export * from "./checkbox";
export * from "./range";
export * from "./date";
export * from "./time";
export { default as SelectInput } from "./SelectInput.vue";
export { default as NumberInput } from "./NumberInput.vue";
export { default as RadioGroup } from "./RadioGroup.vue";
export { default as TextInput } from "./TextInput.vue";
export { default as TextareaInput } from "./TextareaInput.vue";
export { default as FileInput } from "./FileInput.vue";

export const templateSelect: FunctionSelectInputComponent = (
	props,
	context,
) => h(
	SelectInput,
	{
		...props,
		"onUpdate:modelValue": (value) => void context.emit("update:modelValue", value),
	},
);
