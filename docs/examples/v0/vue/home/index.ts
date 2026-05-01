import { useMultiLayout, useRepeatLayout } from "@duplojs/form/vue";
import * as DP from "@duplojs/utils/dataParser";

import { templatesGrid, useForm, useNumberInput, useTextInput } from "./form";

export function useMyCustomForm() {
	const { component, check, currentValue, reset } = useForm(
		useRepeatLayout(
			useMultiLayout({
				name: useTextInput({
					label: "Name",
					defaultValue: "Math",
					template: templatesGrid
						.useInputTemplate({ columns: 6 }),
				}),
				age: useNumberInput({
					label: "Age",
					defaultValue: 16,
					dataParser: DP.number()
						.addChecker(
							DP.checkerNumberMin(18, { errorMessage: "Too young !" }),
						),
					template: templatesGrid
						.useInputTemplate({ columns: 6 }),
				}),
			}),
			{
				min: 2,
				max: 10,
			},
		),
	);

	return {
		TheForm: component,
		checkForm: check,
		currentFormValue: currentValue,
		resetForm: reset,
	};
}
