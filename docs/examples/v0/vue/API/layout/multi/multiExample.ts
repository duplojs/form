import { useMultiLayout } from "@duplojs/form/vue";
import { useTextInput } from "@duplojs/form/vueDesignSystem";
import { useForm } from "./init";

export function useProfileForm() {
	const { component, check } = useForm(
		useMultiLayout({
			firstName: useTextInput({ label: "First name" }),
			lastName: useTextInput({ label: "Last name" }),
		}),
	);

	return {
		ProfileForm: component,
		checkProfileForm: check,
	};
}
