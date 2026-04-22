import { type SetupContext, type VNode } from "vue";

export type FunctionSelectInputComponent = (
	props: {
		fieldKey: string;
		options: {
			value: string;
			label: string;
		}[];
		modelValue: string;
	},
	context: SetupContext<{
		"update:modelValue"(value: string): any;
	}>
) => VNode;
