import { createTemplate } from "@duplojs/form/vue";
import MyRepeatTemplate from "./repeatTemplate.vue";

export const useMyRepeatTemplate = createTemplate(
	"repeat",
	MyRepeatTemplate,
	{
		props: {
			addLabel: "Add",
			removeLabel: "Remove",
			resetLabel: "Reset",
		},
	},
);
