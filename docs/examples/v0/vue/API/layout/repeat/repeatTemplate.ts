import { createTemplate } from "@form/v0/vue";
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
