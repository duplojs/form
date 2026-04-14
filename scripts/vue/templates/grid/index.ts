import { createTemplate, type Templates } from "@V/template";

import "./grid.scss";
import { GridCheckTemplate, GridFormTemplate, GridInputTemplate, GridMultiTemplate, GridRepeatTemplate, GridSectionTemplate, GridStepByStepTemplate, GridUnionTemplate } from "./components";

export * from "./types";
export * from "./components";

export const useGridFormTemplate = createTemplate(
	"form",
	GridFormTemplate,
);

export const useGridInputTemplate = createTemplate(
	"input",
	GridInputTemplate,
);

export const useGridMultiTemplate = createTemplate(
	"multi",
	GridMultiTemplate,
);

export const useGridCheckTemplate = createTemplate(
	"check",
	GridCheckTemplate,
);

export const useGridRepeatTemplate = createTemplate(
	"repeat",
	GridRepeatTemplate,
);

export const useGridUnionTemplate = createTemplate(
	"union",
	GridUnionTemplate,
);

export const useGridStepByStepTemplate = createTemplate(
	"step",
	GridStepByStepTemplate,
);

export const useGridSectionTemplate = createTemplate(
	"section",
	GridSectionTemplate,
);

export const defaultGridTemplates: Templates = {
	check: useGridCheckTemplate(),
	form: useGridFormTemplate(),
	input: useGridInputTemplate(),
	multi: useGridMultiTemplate(),
	repeat: useGridRepeatTemplate(),
	step: useGridStepByStepTemplate(),
	union: useGridUnionTemplate(),
	section: useGridSectionTemplate(),
};
