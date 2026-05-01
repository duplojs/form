import "@duplojs/form/vueGrid.css";
import "@duplojs/form/vueDesignSystem.css";

import { createForm } from "@duplojs/form/vue";
import {
	templateFormAddButton,
	templateFormNextButton,
	templateFormPreviousButton,
	templateFormRemoveButton,
	templateFormResetButton,
	templateFormSelect,
} from "@duplojs/form/vueDesignSystem";
import { createGridTemplates } from "@duplojs/form/vueGrid";
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
