/* eslint-disable @typescript-eslint/prefer-for-of */
import { type GetFormFieldCheckedValue, type GetFormFieldValue, type FormField, createFormField } from "@V/formField";
import { computed, type VNode } from "vue";
import * as EE from "@duplojs/utils/either";
import { unwrap } from "@duplojs/utils";
import { type VueComponent } from "@V/types";
import { type Templates } from "@V/template";

export interface MultiFieldTemplateProperties {
	props: {
		fieldKey: string;
		getCurrentValue(): unknown;
		formFields?: (VNode | null | boolean)[];
	};
	slots: {
		formField(): any;
	};
}
declare module "@V/template" {
	interface AllowedTemplateComponents {
		multiField: VueComponent<MultiFieldTemplateProperties>;
	}
}

export type FormFieldWrapper = Record<
	string,
	FormField
>;

export type FormFieldEntry = [
	string,
	FormField,
];

export interface UseMultiFieldLayoutParams {
	template?: Templates["multiField"];
}

export function useMultiFieldLayout<
	GenericFormFieldWrapper extends FormFieldWrapper,
>(
	formFieldWrapper: GenericFormFieldWrapper,
	params?: UseMultiFieldLayoutParams,
): FormField<
	{
		[Prop in keyof GenericFormFieldWrapper]: GetFormFieldValue<GenericFormFieldWrapper[Prop]>
	},
	{
		[Prop in keyof GenericFormFieldWrapper]: GetFormFieldCheckedValue<GenericFormFieldWrapper[Prop]>
	}
>;

export function useMultiFieldLayout<
	GenericFormFieldEntry extends FormFieldEntry,
>(
	formFieldEntries: GenericFormFieldEntry[],
	params?: UseMultiFieldLayoutParams,
): FormField<
	{
		[Entry in GenericFormFieldEntry as string]: GetFormFieldValue<Entry[1]>
	},
	{
		[Entry in GenericFormFieldEntry as string]: GetFormFieldCheckedValue<Entry[1]>
	}
>;

export function useMultiFieldLayout(
	formFields: FormFieldWrapper | FormFieldEntry[],
	params?: UseMultiFieldLayoutParams,
): FormField<
		Record<string, unknown>,
		Record<string, unknown>
	> {
	const formFieldEntries = formFields instanceof Array
		? formFields
		: Object.entries(formFields);

	return createFormField(
		(modelValue, key, templates) => {
			const template = params?.template ?? templates.multiField;

			const formFieldInstanceEntries = formFieldEntries
				.map(
					([subKey, formField]) => [
						subKey,
						formField.new(
							computed({
								get: () => modelValue.value[subKey],
								set: (value) => {
									modelValue.value[subKey] = value;
								},
							}),
							`${key}.${subKey}`,
							templates,
						),
					] as const,
				);

			const check = () => {
				const result: Record<string, unknown> = {};

				for (let index = 0; index < formFieldInstanceEntries.length; index++) {
					const [key, formFieldInstance] = formFieldInstanceEntries[index]!;

					const checkResult = formFieldInstance.check();

					if (EE.isLeft(checkResult)) {
						return checkResult;
					}

					result[key] = unwrap(checkResult);
				}

				return EE.success(result);
			};

			const reset = () => {
				formFieldInstanceEntries.forEach(
					([, formFieldInstance]) => void formFieldInstance.reset(),
				);
			};

			const getCurrentValue = () => modelValue.value;

			const getVNode = () => {
				const formFields = formFieldInstanceEntries.map(
					(entry) => entry[1].getVNode(),
				);

				return template.getVNode(
					{
						fieldKey: key,
						formFields,
						getCurrentValue,
					},
					{
						formField: () => formFields,
					},
				);
			};

			return {
				check,
				reset,
				getVNode,
			};
		},
		formFieldEntries.reduce<Record<string, unknown>>(
			(accumulator, entry) => {
				accumulator[entry[0]] = entry[1].defaultValue;

				return accumulator;
			},
			{},
		),
	);
}
