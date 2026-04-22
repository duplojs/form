import { createTemplate, type Templates } from "@V/template";

import "./grid.scss";
import { GridCheckTemplate, GridFormTemplate, GridInputTemplate, GridMultiTemplate, GridRepeatTemplate, GridSectionTemplate, GridStepByStepTemplate, GridUnionTemplate } from "./components";
import { type FunctionButtonComponent, type FunctionSelectInputComponent } from "./components/types";

export * from "./types";
export * from "./components";

export interface CreateGridTemplatesInput {
	repeat: {
		removeButton: FunctionButtonComponent;
		removeLabel?: string;
		addButton: FunctionButtonComponent;
		addLabel?: string;
		resetButton: FunctionButtonComponent;
		resetLabel?: string;
	};
	step: {
		nextButton: FunctionButtonComponent;
		nextLabel?: string;
		previousButton: FunctionButtonComponent;
		previousLabel?: string;
		resetButton: FunctionButtonComponent;
		restLabel?: string;
	};
	union: {
		selectInputKind: FunctionSelectInputComponent;
	};
}

export function createGridTemplates(
	input: CreateGridTemplatesInput,
) {
	const useFormTemplate = createTemplate(
		"form",
		GridFormTemplate,
	);
	const useInputTemplate = createTemplate(
		"input",
		GridInputTemplate,
	);
	const useMultiTemplate = createTemplate(
		"multi",
		GridMultiTemplate,
	);
	const useCheckTemplate = createTemplate(
		"check",
		GridCheckTemplate,
	);
	const useRepeatTemplate = createTemplate(
		"repeat",
		GridRepeatTemplate,
		{
			props: input.repeat,
		},
	);
	const useUnionTemplate = createTemplate(
		"union",
		GridUnionTemplate,
		{
			props: input.union,
		},
	);
	const useStepByStepTemplate = createTemplate(
		"step",
		GridStepByStepTemplate,
		{
			props: input.step,
		},
	);
	const useSectionTemplate = createTemplate(
		"section",
		GridSectionTemplate,
	);

	return {
		useFormTemplate,
		useInputTemplate,
		useMultiTemplate,
		useCheckTemplate,
		useRepeatTemplate,
		useUnionTemplate,
		useStepByStepTemplate,
		useSectionTemplate,

		useTemplates: (): Templates => ({
			check: useCheckTemplate(),
			form: useFormTemplate(),
			input: useInputTemplate(),
			multi: useMultiTemplate(),
			repeat: useRepeatTemplate(),
			section: useSectionTemplate(),
			step: useStepByStepTemplate(),
			union: useUnionTemplate(),
		}),
	};
}
