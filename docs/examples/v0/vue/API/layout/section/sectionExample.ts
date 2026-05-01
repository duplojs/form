import { useMultiLayout, useSectionLayout } from "@duplojs/form/vue";
import { useTextInput } from "@duplojs/form/vueDesignSystem";

export const identity = useSectionLayout(
	useMultiLayout({
		firstName: useTextInput({ label: "First name" }),
		lastName: useTextInput({ label: "Last name" }),
	}),
	{ title: "Identity" },
);
