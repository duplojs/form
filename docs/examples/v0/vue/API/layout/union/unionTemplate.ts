import { createTemplate } from "@duplojs/form/vue";
import MyUnionTemplate from "./unionTemplate.vue";

export const useMyUnionTemplate = createTemplate(
	"union",
	MyUnionTemplate,
);
