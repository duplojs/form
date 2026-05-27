import { useMultiLayout, useSlotLayout } from "@form/v0/vue";
import {
	useTextInput,
	useTextareaInput,
} from "@form/v0/vueDesignSystem";
import { useForm } from "./init";

export function useSlotForm() {
	const { component, check } = useForm(
		useMultiLayout({
			message: useSlotLayout(
				"customMessage",
				useTextareaInput({ label: "Message" }),
			),
			nickname: useSlotLayout(
				"customNickname",
				{ defaultValue: "" },
			),
			email: useTextInput({ label: "Email" }),
		}),
	);

	return {
		SlotForm: component,
		checkSlotForm: check,
	};
}
