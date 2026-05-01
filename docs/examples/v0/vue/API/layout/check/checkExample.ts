import * as EE from "@duplojs/utils/either";
import { useCheckLayout } from "@form/v0/vue";
import { useTextInput } from "@form/v0/vueDesignSystem";

export const email = useCheckLayout(
	useTextInput({ label: "Email" }),
	{
		refine: (value) => value.includes("@")
			? EE.ok()
			: EE.error("Email must contain @."),
	},
);
