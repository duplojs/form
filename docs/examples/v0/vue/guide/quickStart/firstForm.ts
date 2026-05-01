import * as DP from "@duplojs/utils/dataParser";
import { useMultiLayout } from "@form/v0/vue";
import { useForm } from "./init";
import { useMyTextInput } from "./firstInput";
import { useNumberInput } from "@form/v0/vueDesignSystem";

export function useFirstForm() {
	const { component, check, reset, currentValue } = useForm(
		useMultiLayout({
			name: useMyTextInput({
				label: "superLabel",
			}),
			age: useNumberInput({
				label: "Age",
				dataParser: DP.number()
					.addChecker(
						DP.checkerNumberMin(
							18,
							{ errorMessage: "Too young !" },
						),
					),
			}),
		}),
	);

	return {
		TheForm: component,
		checkForm: check,
		currentFormValue: currentValue,
		resetForm: reset,
	};
}
