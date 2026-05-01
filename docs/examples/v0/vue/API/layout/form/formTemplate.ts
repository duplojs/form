import { createTemplate } from "@form/v0/vue";
import MyFormTemplate from "./formTemplate.vue";

export const useMyFormTemplate = createTemplate(
	"form",
	MyFormTemplate,
);
