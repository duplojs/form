import { useMultiLayout } from "@duplojs/form/vue";
import {
	useTextInput,
	useTextareaInput,
} from "@duplojs/form/vueDesignSystem";
import { useHeroInputTemplate } from "./customInputTemplate";
import { templatesGrid, useForm } from "./init";

export function useFormWithCustomTemplate() {
	const { component, check, currentValue, reset, dispose } = useForm(
		useMultiLayout({
			title: useTextInput({
				label: "Title",
			}),
			subtitle: useTextInput({
				label: "Subtitle",
				template: useHeroInputTemplate({ tone: "default" }),
			}),
			summary: useTextareaInput({
				label: "Summary",
				template: templatesGrid.useInputTemplate({
					columns: 12,
				}),
			}),
		}),
	);

	return {
		FormWithCustomTemplate: component,
		checkFormWithCustomTemplate: check,
		currentFormWithCustomTemplateValue: currentValue,
		resetFormWithCustomTemplate: reset,
		disposeFormWithCustomTemplate: dispose,
	};
}
