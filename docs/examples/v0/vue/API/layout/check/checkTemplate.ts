import { createTemplate } from "@form/v0/vue";
import MyCheckTemplate from "./checkTemplate.vue";

export const useMyCheckTemplate = createTemplate(
	"check",
	MyCheckTemplate,
);
