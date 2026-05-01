import { createTemplate } from "@duplojs/form/vue";
import MyFormTemplate from "./formTemplate.vue";

export const useMyFormTemplate = createTemplate(
	"form",
	MyFormTemplate,
);
