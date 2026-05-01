import { useMultiLayout, type GetCheckedValue } from "@form/v0/vue";
import { useNumberInput, useTextInput } from "@form/v0/vueDesignSystem";
import * as DP from "@duplojs/utils/dataParser";
import { useForm } from "./init";

export function useProfileForm() {
	const { component, check, reset, currentValue, dispose } = useForm(
		useMultiLayout({
			firstName: useTextInput({
				label: "first name",
				defaultValue: "Math",
			}),
			age: useNumberInput({
				label: "Age",
				defaultValue: 16,
				dataParser: DP.number()
					.addChecker(
						DP.checkerNumberMin(
							18,
							{ errorMessage: "You must be at least 18." },
						),
					),
			}),
		}),
	);

	return {
		ProfileForm: component,
		checkProfileForm: check,
		currentProfileValue: currentValue,
		resetProfileForm: reset,
		disposeProfileForm: dispose,
	};
}

export type ProfileFormSubmitValue = GetCheckedValue<
	ReturnType<typeof useProfileForm>["checkProfileForm"]
>;
