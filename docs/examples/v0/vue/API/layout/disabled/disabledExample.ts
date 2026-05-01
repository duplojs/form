import { ref } from "vue";
import { useDisabledLayout } from "@duplojs/form/vue";
import { useTextInput } from "@duplojs/form/vueDesignSystem";

const hasCompany = ref(false);

export const company = useDisabledLayout(
	useTextInput({ label: "Company" }),
	{
		isDisabled: () => !hasCompany.value,
	},
);
