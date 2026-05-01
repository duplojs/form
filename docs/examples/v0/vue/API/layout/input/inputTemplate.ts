import { createTemplate } from "@duplojs/form/vue";
import MyInputTemplate from "./inputTemplate.vue";

export const useMyInputTemplate = createTemplate(
	"input",
	MyInputTemplate,
);
