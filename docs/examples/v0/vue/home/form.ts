import "@form/v0/vueGrid.css";
import "@form/v0/vueDesignSystem.css";

import { createGridTemplates } from "@form/v0/vueGrid";
import { templateFormAddButton, templateFormRemoveButton, templateFormResetButton, templateFormNextButton, templateFormPreviousButton, templateFormSelect } from "@form/v0/vueDesignSystem";
import { createForm } from "@form/v0/vue";

export { useNumberInput, useTextInput } from "@form/v0/vueDesignSystem";


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
