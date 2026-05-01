import { useMultiLayout, useSectionLayout } from "@form/v0/vue";
import { useTextInput } from "@form/v0/vueDesignSystem";

export const identity = useSectionLayout(
	useMultiLayout({
		firstName: useTextInput({ label: "First name" }),
		lastName: useTextInput({ label: "Last name" }),
	}),
	{ title: "Identity" },
);
