import { type FunctionalComponent, h, type HTMLAttributes, normalizeClass, type Ref, ref } from "vue";
import { type GetFormFieldCheckedValue, type GetFormFieldValue, type FormField, type FormFieldInstance, type GetFormFieldSlots, type FormFieldSlots } from "./formField";
import type * as EE from "@duplojs/utils/either";
import { type AnyFunction, simpleClone, type SimplifyTopLevel, type Unwrap } from "@duplojs/utils";
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
		SimplifyTopLevel<
			& { default?(): any }
			& (
				GetFormFieldSlots<GenericFormField> extends infer InferredSlots extends FormFieldSlots
					? {
						[Prop in keyof InferredSlots]: (params: InferredSlots[Prop]) => any
					}
					: {}
			)
		>
	>;
}

export interface UseFormParams {
	class?: string;
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
		const key = "FRM";
		const templateForm = params.template ?? templates.form;

		const currentValue = ref(simpleClone(formField.defaultValue));
		const formSlots = ref<Record<string, AnyFunction<[any]>> | null>(null);

		const formFieldInstance = formField.new(
			currentValue,
			key,
			templates,
			(name, params) => formSlots.value?.[name]?.(params) ?? null,
		);

		const check = () => formFieldInstance.check();

		const reset = () => {
			formFieldInstance.reset();
			currentValue.value = simpleClone(formField.defaultValue);
		};

		const dispose = () => void formFieldInstance.dispose();

		const getCurrentValue = () => currentValue.value;

		const component: FormProperties["component"] = (props, { slots }) => {
			formSlots.value = slots;

			return templateForm.getVNode(
				{
					...props,
					class: normalizeClass([props.class, params.class]),
					fieldKey: key,
					onSubmit: () => {},
					getCurrentValue,
				},
				{
					submitter: slots.default ?? (() => null),
					formField: () => formFieldInstance.getVNode(),
				},
			);
		};

		return {
			currentValue,
			component,
			reset,
			dispose,
			check,
		};
	};
}

export type GetCheckedValue<
	GenericCheck extends FormProperties["check"],
> = Unwrap<
	Extract<
		ReturnType<GenericCheck>,
		EE.Right
	>
>;
