import * as DP from "@duplojs/utils/dataParser";
import { useMultiLayout } from "@duplojs/form/vue";
import { useForm } from "./init";
import { useMyTextInput } from "./firstInput";
import { useNumberInput } from "@duplojs/form/vueDesignSystem";

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
