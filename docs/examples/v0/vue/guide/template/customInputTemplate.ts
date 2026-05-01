import { createTemplate } from "@form/v0/vue";
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
