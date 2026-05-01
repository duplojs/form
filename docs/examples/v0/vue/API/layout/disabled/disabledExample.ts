import { ref } from "vue";
import { useDisabledLayout } from "@form/v0/vue";
import { useTextInput } from "@form/v0/vueDesignSystem";

const hasCompany = ref(false);

export const company = useDisabledLayout(
	useTextInput({ label: "Company" }),
	{
		isDisabled: () => !hasCompany.value,
	},
);
