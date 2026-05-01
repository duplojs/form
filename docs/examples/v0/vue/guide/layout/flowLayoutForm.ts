import * as EE from "@duplojs/utils/either";
import { ref } from "vue";
import {
	useCheckLayout,
	useDisabledLayout,
	useMultiLayout,
	useStepLayout,
} from "@form/v0/vue";
import {
	useTextInput,
	useTextareaInput,
} from "@form/v0/vueDesignSystem";
import { useForm } from "./init";

export function useFlowLayoutForm() {
	const hasCompany = ref(false);

	const { component, check, currentValue } = useForm(
		useStepLayout(
			[
				useMultiLayout({
					fullName: useTextInput({ label: "Full name" }),
					email: useCheckLayout(
						useTextInput({ label: "Email" }),
						{
							refine: (value) => value.includes("@")
								? EE.ok()
								: EE.error("Email must contain @."),
						},
					),
				}),
				useMultiLayout({
					company: useDisabledLayout(
						useTextInput({ label: "Company" }),
						{
							isDisabled: () => !hasCompany.value,
						},
					),
					notes: useTextareaInput({ label: "Notes" }),
				}),
			],
			{
				errorMessageNotAtLastStep: "Complete all steps before submitting.",
			},
		),
	);

	return {
		FlowForm: component,
		checkFlowForm: check,
		currentFlowValue: currentValue,
		hasCompany,
	};
}
