import { useMultiLayout, useStepLayout } from "@duplojs/form/vue";
import { useTextInput } from "@duplojs/form/vueDesignSystem";

export const onboarding = useStepLayout(
	[
		useMultiLayout({
			fullName: useTextInput({ label: "Full name" }),
		}),
		useMultiLayout({
			email: useTextInput({ label: "Email" }),
		}),
	],
	{
		errorMessageNotAtLastStep: "Complete all steps before submitting.",
	},
);
