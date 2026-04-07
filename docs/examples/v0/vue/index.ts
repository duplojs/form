import { createForm } from "@duplojs/form/vue";
import { defaultGridTemplates } from "@duplojs/form/vue/grid";
import "@duplojs/form/vue/grid.css";

const useForm = createForm(defaultGridTemplates);

function useMyCustomForm(formField: Parameters<typeof useForm>[0]) {
	const {
		component,
		check,
		currentValue,
		reset,
	} = useForm(formField);

	return {
		TheForm: component,
		CheckForm: check,
		currentFormValue: currentValue,
		resetForm: reset,
	};
}
