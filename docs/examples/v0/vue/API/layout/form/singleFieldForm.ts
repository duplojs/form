import { useTextInput } from "@duplojs/form/vueDesignSystem";
import { useForm } from "./init";

export function useNewsletterForm() {
	const { component, check, currentValue, reset, dispose } = useForm(
		useTextInput({
			label: "Email",
			defaultValue: "",
		}),
	);

	return {
		NewsletterForm: component,
		checkNewsletterForm: check,
		currentNewsletterValue: currentValue,
		resetNewsletterForm: reset,
		disposeNewsletterForm: dispose,
	};
}
