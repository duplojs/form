import {
	useMultiLayout,
	useRepeatLayout,
	useSectionLayout,
	useSlotLayout,
	useUnionLayout,
} from "@form/v0/vue";
import { useForm } from "./init";

import {
	useTextInput,
	useTextareaInput,
} from "@form/v0/vueDesignSystem";

export function useProfileLayoutForm() {
	const { component, check } = useForm(
		useSectionLayout(
			useMultiLayout({
				identity: useMultiLayout({
					firstName: useTextInput({ label: "First Name" }),
					lastName: useTextInput({ label: "Last Name" }),
				}),
				contacts: useRepeatLayout(
					useTextInput({ label: "Email" }),
					{
						min: 1,
						max: 3,
					},
				),
				preferredChannel: useUnionLayout(
					[
						["email", useTextInput({ label: "Email" })],
						["phone", useTextInput({ label: "Phone" })],
					],
					{ defaultKind: "email" },
				),
				message: useSlotLayout(
					"customMessage",
					useTextareaInput({ label: "Message" }),
				),
			}),
			{ title: "Profile" },
		),
	);

	return {
		TheForm: component,
		checkForm: check,
	};
}
