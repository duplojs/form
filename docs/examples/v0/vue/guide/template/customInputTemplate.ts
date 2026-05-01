import { createTemplate } from "@duplojs/form/vue";
import HeroInputTemplate from "./HeroInputTemplate.vue";

export const useHeroInputTemplate = createTemplate(
	"input",
	HeroInputTemplate,
	{
		props: {
			tone: "default",
		},
	},
);
