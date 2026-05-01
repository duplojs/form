import { useRepeatLayout } from "@duplojs/form/vue";
import { useTextInput } from "@duplojs/form/vueDesignSystem";

export const contacts = useRepeatLayout(
	useTextInput({ label: "Email" }),
	{
		min: 1,
		max: 3,
	},
);
