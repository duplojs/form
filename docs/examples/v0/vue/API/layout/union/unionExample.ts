import { useUnionLayout } from "@form/v0/vue";
import { useTextInput } from "@form/v0/vueDesignSystem";

export const preferredChannel = useUnionLayout(
	[
		["email", useTextInput({ label: "Email" })],
		["phone", useTextInput({ label: "Phone" })],
	],
	{ defaultKind: "email" },
);
