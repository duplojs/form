import { useRepeatLayout } from "@form/v0/vue";
import { useTextInput } from "@form/v0/vueDesignSystem";

export const contacts = useRepeatLayout(
	useTextInput({ label: "Email" }),
	{
		min: 1,
		max: 3,
	},
);
