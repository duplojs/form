import { useMultiLayout, type GetCheckedValue } from "@duplojs/form/vue";
import * as DP from "@duplojs/utils/dataParser";
import { useForm } from "./init";
import { useBasicTextInput } from "./basicTextInput";
import { usePolicyCheckbox } from "./policyCheckbox";

export function useContactForm() {
	const { component, check, reset, currentValue, dispose } = useForm(
		useMultiLayout({
			email: useBasicTextInput({
				label: "Email",
				props: {
					placeholder: "math@duplojs.dev",
				},
				dataParser: DP.string()
					.addChecker(
						DP.checkerStringMin(
							5,
							{ errorMessage: "Email is too short." },
						),
					),
			}),
			terms: usePolicyCheckbox({
				props: {
					label: "I accept the terms of use",
					required: true,
				},
			}),
		}),
	);

	return {
		ContactForm: component,
		checkContactForm: check,
		currentContactValue: currentValue,
		resetContactForm: reset,
		disposeContactForm: dispose,
	};
}

export type ContactFormSubmitValue = GetCheckedValue<
	ReturnType<typeof useContactForm>["checkContactForm"]
>;
