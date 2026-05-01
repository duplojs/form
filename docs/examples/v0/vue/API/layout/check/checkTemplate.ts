import { createTemplate } from "@duplojs/form/vue";
import MyCheckTemplate from "./checkTemplate.vue";

export const useMyCheckTemplate = createTemplate(
	"check",
	MyCheckTemplate,
);
