import { useMultiLayout, useStepLayout } from "@form/v0/vue";
import { useTextInput } from "@form/v0/vueDesignSystem";

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
