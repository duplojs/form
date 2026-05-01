import { useUnionLayout } from "@duplojs/form/vue";
import { useTextInput } from "@duplojs/form/vueDesignSystem";

export const preferredChannel = useUnionLayout(
	[
		["email", useTextInput({ label: "Email" })],
		["phone", useTextInput({ label: "Phone" })],
	],
	{ defaultKind: "email" },
);
