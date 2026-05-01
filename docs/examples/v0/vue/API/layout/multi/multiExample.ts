import { useMultiLayout } from "@form/v0/vue";
import { useTextInput } from "@form/v0/vueDesignSystem";
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
