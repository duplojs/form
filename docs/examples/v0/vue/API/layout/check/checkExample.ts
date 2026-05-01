import * as EE from "@duplojs/utils/either";
import { useCheckLayout } from "@duplojs/form/vue";
import { useTextInput } from "@duplojs/form/vueDesignSystem";

export const email = useCheckLayout(
	useTextInput({ label: "Email" }),
	{
		refine: (value) => value.includes("@")
			? EE.ok()
			: EE.error("Email must contain @."),
	},
);
