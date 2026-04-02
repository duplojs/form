/* eslint-disable @typescript-eslint/prefer-for-of */
import { type GetFormFieldCheckedValue, type GetFormFieldValue, type FormField, createFormField, type ErrorProperties } from "@V/formField";
import { computed, effectScope, h, type VNode } from "vue";
import * as EE from "@duplojs/utils/either";
import * as AA from "@duplojs/utils/array";
import { unwrap } from "@duplojs/utils";
import { type VueComponent } from "@V/types";
import { type Templates } from "@V/template";

export interface MultiTemplateProperties {
	props: {
		fieldKey: string;
		getCurrentValue(): unknown;
		getFormFields(): VNode[];
	};
	slots: {
		formField(): any;
	};
}
declare module "@V/template" {
	interface AllowedTemplateComponents {
		multi: VueComponent<MultiTemplateProperties>;
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
	template?: Templates["multi"];
}

export function useMultiLayout<
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

export function useMultiLayout<
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

export function useMultiLayout(
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
			const template = params?.template ?? templates.multi;

			const scope = effectScope();
			const { formFieldInstanceEntries } = scope.run(() => {
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
								`${key}-${subKey}`,
								templates,
							),
						] as const,
					);

				return {
					formFieldInstanceEntries,
				};
			})!;

			const check = () => {
				const result: Record<string, unknown> = {};
				const errors: ErrorProperties[] = [];

				for (let index = 0; index < formFieldInstanceEntries.length; index++) {
					const [key, formFieldInstance] = formFieldInstanceEntries[index]!;

					const checkResult = formFieldInstance.check();

					if (EE.isLeft(checkResult)) {
						errors.push(...unwrap(checkResult));
					} else {
						result[key] = unwrap(checkResult);
					}
				}

				if (AA.minElements(errors, 1)) {
					return EE.error(errors);
				}

				return EE.success(result);
			};

			const reset = () => {
				formFieldInstanceEntries.forEach(
					([, formFieldInstance]) => void formFieldInstance.reset(),
				);
			};

			const dispose = () => {
				scope.stop();
				formFieldInstanceEntries.forEach(
					([, formFieldInstance]) => void formFieldInstance.dispose(),
				);
			};

			const getCurrentValue = () => modelValue.value;

			const formFieldVNodes = formFieldInstanceEntries.map(
				(entry) => entry[1].getVNode(),
			);

			const getFormFieldVNodes = () => formFieldVNodes;

			const getVNode = () => h(
				() => template.getVNode(
					{
						fieldKey: key,
						getFormFields: getFormFieldVNodes,
						getCurrentValue,
					},
					{
						formField: getFormFieldVNodes,
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
		formFieldEntries.reduce<Record<string, unknown>>(
			(accumulator, entry) => {
				accumulator[entry[0]] = entry[1].defaultValue;

				return accumulator;
			},
			{},
		),
	);
}
