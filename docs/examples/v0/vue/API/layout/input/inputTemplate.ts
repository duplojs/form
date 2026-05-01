import { createTemplate } from "@form/v0/vue";
import MyInputTemplate from "./inputTemplate.vue";

export const useMyInputTemplate = createTemplate(
	"input",
	MyInputTemplate,
);
