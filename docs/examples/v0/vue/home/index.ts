import "@duplojs/form/vueGrid.css";
import "@duplojs/form/vueDesignSystem.css";
import { useNumberInput, useTextInput } from "@duplojs/form/vueDesignSystem";
import { useMultiLayout, useRepeatLayout } from "@duplojs/form/vue";
import { DP } from "@duplojs/utils";

import { templatesGrid, useForm } from "./form";

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
				min: 1,
				max: 10,
			},
		),
	);

	return {
		TheForm: component,
		CheckForm: check,
		currentFormValue: currentValue,
		resetForm: reset,
	};
}
