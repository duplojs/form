import { createTemplate } from "@V/template";

import GridFormTemplate from "./GridFormTemplate.vue";
import GridMultiFieldTemplate from "./GridMultiFieldTemplate.vue";
import GridCheckTemplate from "./GridCheckTemplate.vue";

export { default as GridFormTemplate } from "./GridFormTemplate.vue";
export { default as GridMultiFieldTemplate } from "./GridMultiFieldTemplate.vue";
export { default as GridCheckTemplate } from "./GridCheckTemplate.vue";

export const useGridFormTemplate = createTemplate(
	GridFormTemplate,
	{
		props: { test: "ok" },
	},
);

export const useGridMultiFieldTemplate = createTemplate(
	GridMultiFieldTemplate,
);

export const useGridCheckTemplate = createTemplate(
	GridCheckTemplate,
);
