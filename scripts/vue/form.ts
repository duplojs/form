import { type FunctionalComponent, h, type HTMLAttributes, type Ref, ref } from "vue";
import { type GetFormFieldCheckedValue, type GetFormFieldValue, type FormField, type FormFieldInstance } from "./formField";
import { simpleClone } from "@duplojs/utils";
import { type Templates } from "./template";
import { type VueComponent } from "./types";

export interface FormTemplateProperties {
	props: {
		fieldKey: string;
		getCurrentValue(): unknown;
	};
	emits: {
		submit: [];
	};
	slots: {
		formField(): any;
		submitter(): any;
	};
}
declare module "./template" {
	interface AllowedTemplateComponents {
		form: VueComponent<FormTemplateProperties>;
	}
}

export interface FormProperties<
	GenericFormField extends FormField = FormField,
> {
	check: FormFieldInstance<GetFormFieldCheckedValue<GenericFormField>>["check"];
	currentValue: Ref<GetFormFieldValue<GenericFormField>>;
	reset(): void;
	dispose(): void;
	component: FunctionalComponent<
		HTMLAttributes,
		{},
		{ default?(): any }
	>;
}

export interface UseFormParams {
	template?: Templates["form"];
}

export type UseForm = <
	GenericFormField extends FormField,
>(
	formField: GenericFormField,
	params?: UseFormParams
) => FormProperties<GenericFormField>;

export function createForm(templates: Templates): UseForm;

export function createForm(templates: Templates) {
	return (formField: FormField, params: UseFormParams = {}): FormProperties => {
		const templateForm = params.template ?? templates.form;

		const currentValue = ref(simpleClone(formField.defaultValue));

		const formFieldInstance = formField.new(
			currentValue,
			"form.field",
			templates,
		);

		const check = () => formFieldInstance.check();

		const reset = () => {
			formFieldInstance.reset();
			currentValue.value = simpleClone(formField.defaultValue);
		};

		const dispose = () => void formFieldInstance.dispose();

		const getCurrentValue = () => currentValue.value;

		const formFieldVNode = formFieldInstance.getVNode();

		const component: FormProperties["component"] = (props, { slots }) => h(
			() => templateForm.getVNode(
				{
					...props,
					fieldKey: "form",
					onSubmit: () => {},
					getCurrentValue,
				},
				{
					submitter: slots.default ?? (() => null),
					formField: () => formFieldVNode,
				},
			),
		);

		return {
			currentValue,
			component,
			reset,
			dispose,
			check,
		};
	};
}
