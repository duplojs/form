import { createGridTemplates } from "@duplojs/form/vueGrid";
import { templateFormAddButton, templateFormRemoveButton, templateFormResetButton, templateFormNextButton, templateFormPreviousButton, templateFormSelect } from "@duplojs/form/vueDesignSystem";
import { createForm } from "@duplojs/form/vue";

export const templatesGrid = createGridTemplates({
	repeat: {
		addLabel: "Add another item",
		removeLabel: "Remove this item",
		addButton: templateFormAddButton,
		removeButton: templateFormRemoveButton,
		resetButton: templateFormResetButton,
	},
	step: {
		nextLabel: "Continue",
		previousLabel: "Back",
		resetButton: templateFormResetButton,
		nextButton: templateFormNextButton,
		previousButton: templateFormPreviousButton,
	},
	union: { selectInputKind: templateFormSelect },
});

export const useForm = createForm(templatesGrid.useTemplates());
