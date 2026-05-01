import "@form/v0/vueGrid.css";
import "@form/v0/vueDesignSystem.css";

import { createForm } from "@form/v0/vue";
import {
	templateFormAddButton,
	templateFormNextButton,
	templateFormPreviousButton,
	templateFormRemoveButton,
	templateFormResetButton,
	templateFormSelect,
} from "@form/v0/vueDesignSystem";
import { createGridTemplates } from "@form/v0/vueGrid";
import { useHeroInputTemplate } from "./customInputTemplate";

export const templatesGrid = createGridTemplates({
	repeat: {
		addLabel: "Add item",
		removeLabel: "Remove item",
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

export const useForm = createForm({
	...templatesGrid.useTemplates(),
	input: useHeroInputTemplate({ tone: "accent" }),
});
