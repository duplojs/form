import { createFormField, type GetFormFieldSlots, type FormField, type GetFormFieldCheckedValue, type GetFormFieldValue, type FormFieldSlotParams, formFieldKind } from "@V/formField";
import { type AnyFunction, type SimplifyTopLevel } from "@duplojs/utils";
import * as EE from "@duplojs/utils/either";

export type SlotPrimitiveDefaultValue = null | string | undefined | boolean | bigint | number;
export type SlotDefaultValue = SlotPrimitiveDefaultValue | (() => object | SlotPrimitiveDefaultValue);

export interface UseSlotLayoutParams<
	GenericDefaultValue extends SlotDefaultValue = SlotDefaultValue,
> {
	defaultValue: GenericDefaultValue;
}

type ComputeSlotValue<
	GenericDefaultValue extends SlotDefaultValue = SlotDefaultValue,
> = GenericDefaultValue extends AnyFunction
	? ReturnType<GenericDefaultValue>
	: GenericDefaultValue;

export function useSlotLayout<
	GenericName extends string,
	GenericFormField extends FormField,
>(
	name: GenericName,
	formField: GenericFormField,
): FormField<
	GetFormFieldValue<GenericFormField>,
	GetFormFieldCheckedValue<GenericFormField> | undefined,
	SimplifyTopLevel<
		& GetFormFieldSlots<GenericFormField>
		& {
			[Prop in GenericName]: SimplifyTopLevel<
				& Omit<
					FormFieldSlotParams<GetFormFieldValue<GenericFormField>>,
					"formField"
				>
				& { formField(): any }
			>
		}
	>
>;

export function useSlotLayout<
	GenericName extends string,
	GenericDefaultValue extends SlotDefaultValue,
>(
	name: GenericName,
	params: UseSlotLayoutParams<GenericDefaultValue>,
): FormField<
	ComputeSlotValue<GenericDefaultValue>,
	ComputeSlotValue<GenericDefaultValue>,
	SimplifyTopLevel<
		{
			[Prop in GenericName]: SimplifyTopLevel<
				Omit<
					FormFieldSlotParams<ComputeSlotValue<GenericDefaultValue>>,
					"formField"
				>
			>
		}
	>
>;

export function useSlotLayout(
	name: string,
	params: UseSlotLayoutParams | FormField,
): FormField {
	if (formFieldKind.has(params)) {
		const formField = params;
		return createFormField(
			(modelValue, parentKey, templates, getSlot) => {
				const key = `${parentKey}_SLT`;

				const formFieldInstance = formField.new(
					modelValue,
					key,
					templates,
					getSlot,
				);
				const check = () => formFieldInstance.check();
				const reset = () => {
					formFieldInstance.reset();
				};

				const dispose = () => {
					formFieldInstance.dispose();
				};

				const getFormFieldVNode = () => formFieldInstance.getVNode();

				const updateValue = (value: unknown) => {
					modelValue.value = value;
				};

				const getVNode = () => getSlot(
					name,
					{
						fieldKey: key,
						get value() {
							return modelValue.value;
						},
						update: updateValue,
						formField: getFormFieldVNode,
					},
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

	return createFormField(
		(modelValue, parentKey, templates, getSlot) => {
			const key = `${parentKey}_SLT`;

			const check = () => EE.success(modelValue.value);
			const reset = () => {};
			const dispose = () => {};

			const updateValue = (value: unknown) => {
				modelValue.value = value;
			};

			const getVNode = () => getSlot(
				name,
				{
					fieldKey: key,
					value: modelValue.value,
					update: updateValue,
				},
			);

			return {
				check,
				reset,
				dispose,
				getVNode,
			};
		},
		typeof params.defaultValue === "function"
			? params.defaultValue()
			: params.defaultValue,
	);
}
