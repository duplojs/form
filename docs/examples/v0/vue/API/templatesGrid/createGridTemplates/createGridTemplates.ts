import {
	templateFormAddButton,
	templateFormNextButton,
	templateFormPreviousButton,
	templateFormRemoveButton,
	templateFormResetButton,
	templateFormSelect,
} from "@duplojs/form/vueDesignSystem";
import { createGridTemplates } from "@duplojs/form/vueGrid";

export const templatesGrid = createGridTemplates({
	form: {
		maxColumns: 12,
		gap: 12,
	},
	input: {
		columns: 6,
	},
	multi: {
		columns: 12,
		maxColumns: 12,
		gap: 12,
	},
	check: {
		columns: 12,
		maxColumns: 12,
		gap: 12,
		hideEmptyMessageError: true,
	},
	section: {
		columns: 12,
		maxColumns: 12,
		gap: 12,
	},
	repeat: {
		addLabel: "Add item",
		removeLabel: "Remove item",
		resetLabel: "Reset item",
		addButton: templateFormAddButton,
		removeButton: templateFormRemoveButton,
		resetButton: templateFormResetButton,
	},
	step: {
		nextLabel: "Continue",
		previousLabel: "Back",
		resetLabel: "Reset step",
		nextButton: templateFormNextButton,
		previousButton: templateFormPreviousButton,
		resetButton: templateFormResetButton,
	},
	union: {
		selectInputKind: templateFormSelect,
		labels: {
			email: "Email",
			phone: "Phone",
		},
	},
});
