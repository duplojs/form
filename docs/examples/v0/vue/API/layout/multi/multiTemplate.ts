import { createTemplate } from "@duplojs/form/vue";
import MyMultiTemplate from "./multiTemplate.vue";

export const useMyMultiTemplate = createTemplate(
	"multi",
	MyMultiTemplate,
);
