import { createTemplate, Templates } from "@V/template";

import "./styles.scss";
import GridFormTemplate from "./GridFormTemplate.vue";
import GridInputTemplate from "./GridInputTemplate.vue";
import GridMultiTemplate from "./GridMultiTemplate.vue";
import GridCheckTemplate from "./GridCheckTemplate.vue";
import GridRepeatTemplate from "./GridRepeatTemplate.vue";
import GridUnionTemplate from "./GridUnionTemplate.vue";
import GridStepByStepTemplate from "./GridStepByStepTemplate.vue";

export * from "./types";
export { default as GridFormTemplate } from "./GridFormTemplate.vue";
export { default as GridInputTemplate } from "./GridInputTemplate.vue";
export { default as GridMultiTemplate } from "./GridMultiTemplate.vue";
export { default as GridCheckTemplate } from "./GridCheckTemplate.vue";
export { default as GridRepeatTemplate } from "./GridRepeatTemplate.vue";
export { default as GridUnionTemplate } from "./GridUnionTemplate.vue";
export { default as GridStepByStepTemplate } from "./GridStepByStepTemplate.vue";

export const useGridFormTemplate = createTemplate(
	GridFormTemplate,
);

export const useGridInputTemplate = createTemplate(
	GridInputTemplate,
);

export const useGridMultiTemplate = createTemplate(
	GridMultiTemplate,
);

export const useGridCheckTemplate = createTemplate(
	GridCheckTemplate,
);

export const useGridRepeatTemplate = createTemplate(
	GridRepeatTemplate,
);

export const useGridUnionTemplate = createTemplate(
	GridUnionTemplate,
);

export const useGridStepByStepTemplate = createTemplate(
	GridStepByStepTemplate,
);
