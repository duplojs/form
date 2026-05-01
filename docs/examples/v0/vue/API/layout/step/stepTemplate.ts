import { createTemplate } from "@form/v0/vue";
import MyStepTemplate from "./stepTemplate.vue";

export const useMyStepTemplate = createTemplate(
	"step",
	MyStepTemplate,
	{
		props: {
			nextLabel: "Next",
			previousLabel: "Back",
		},
	},
);
