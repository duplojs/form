import { createTemplate } from "@duplojs/form/vue";
import MySectionTemplate from "./sectionTemplate.vue";

export const useMySectionTemplate = createTemplate(
	"section",
	MySectionTemplate,
);
