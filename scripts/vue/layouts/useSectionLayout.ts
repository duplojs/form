import { createFormField, type FormField, type GetFormFieldCheckedValue, type GetFormFieldValue } from "@V/formField";
import { type Templates } from "@V/template";
import { type VueComponent } from "@V/types";
import { h } from "vue";

export interface SectionTemplateProperties {
	props: {
		fieldKey: string;
		title?: string;
	};
	slots: {
		formField(): any;
	};
}
declare module "@V/template" {
	interface AllowedTemplateComponents {
		section: VueComponent<SectionTemplateProperties>;
	}
}

export interface UseSectionLayoutParams {
	title?: string;
	template?: Templates["section"];
}

export function useSectionLayout<
	GenericFormField extends FormField,
>(
	formField: GenericFormField,
	params?: UseSectionLayoutParams
): FormField<
	GetFormFieldValue<GenericFormField>,
	GetFormFieldCheckedValue<GenericFormField>
>;

export function useSectionLayout(
	formField: FormField,
	params?: UseSectionLayoutParams,
): FormField {
	return createFormField(
		(modelValue, key, templates) => {
			const template = params?.template ?? templates.section;

			const formFieldInstance = formField.new(
				modelValue,
				key,
				templates,
			);

			const check = () => formFieldInstance.check();

			const reset = () => {
				formFieldInstance.reset();
			};

			const dispose = () => {
				formFieldInstance.dispose();
			};

			const formFieldVNode = formFieldInstance.getVNode();

			const getFormFieldVNode = () => formFieldVNode;

			const getVNode = () => h(
				() => template.getVNode(
					{
						fieldKey: key,
						title: params?.title,
					},
					{
						formField: getFormFieldVNode,
					},
				),
			);

			return {
				check,
				reset,
				dispose,
				getVNode,
			};
		},
		formField.defaultValue,
	);
}
