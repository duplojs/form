/* eslint-disable @typescript-eslint/prefer-for-of */
import { createFormField, type FormFieldInstance, type ErrorProperties, type FormField, type GetFormFieldCheckedValue, type GetFormFieldValue } from "@V/formField";
import { type Templates } from "@V/template";
import { type VueComponent } from "@V/types";
import { simpleClone, unwrap } from "@duplojs/utils";
import * as EE from "@duplojs/utils/either";
import * as AA from "@duplojs/utils/array";
import { computed, effectScope, h, ref, watch, type VNode } from "vue";

export interface RepeatTemplateProperties {
	props: {
		fieldKey: string;
		max: number;
		min: number;
		getFormFieldsQuantity(): number;
		getCurrentValue(): unknown;
		getFormFields(): VNode[];
	};
	emits: {
		addElement: [];
		removeElement: [index: number];
		resetElement: [index: number];
	};
	slots: {
		formField(): any;
	};
}

declare module "@V/template" {
	interface AllowedTemplateComponents {
		repeat: VueComponent<RepeatTemplateProperties>;
	}
}

export interface UseRepeatLayoutParams<
	GenericMin extends number = number,
> {
	max: number;
	min?: GenericMin;
	template?: Templates["repeat"];
}

export function useRepeatLayout<
	GenericFormField extends FormField,
	GenericMin extends number = 0,
>(
	formField: GenericFormField,
	params: UseRepeatLayoutParams<GenericMin>
): FormField<
	[
		...AA.CreateTuple<GetFormFieldValue<GenericFormField>, GenericMin>,
		...GetFormFieldValue<GenericFormField>[],
	],
	[
		...AA.CreateTuple<GetFormFieldCheckedValue<GenericFormField>, GenericMin>,
		...GetFormFieldCheckedValue<GenericFormField>[],
	]
>;

export function useRepeatLayout(
	formField: FormField,
	params: UseRepeatLayoutParams,
): FormField<unknown[]> {
	const minElements = params.min ?? 0;
	const maxElements = params.max;

	return createFormField(
		(modelValue, key, templates) => {
			const template = params?.template ?? templates.repeat;

			const cacheFormFields: Record<number, FormFieldInstance> = {};
			const getFormFieldInstance = (index: number) => {
				if (cacheFormFields[index] === undefined) {
					cacheFormFields[index] = formField.new(
						computed({
							get: () => index in modelValue.value
								? modelValue.value[index]
								: formField.defaultValue,
							set: (value) => {
								if (index >= modelValue.value.length) {
									return;
								}

								modelValue.value[index] = value;
							},
						}),
						`${key}-${index}`,
						templates,
					);
				}

				return cacheFormFields[index];
			};
			const scope = effectScope();
			const {
				formFieldInstances,
			} = scope.run(() => {
				const formFieldInstances = ref<FormFieldInstance[]>([]);

				watch(
					() => modelValue.value.length,
					(length) => {
						formFieldInstances.value = Array.from({ length })
							.map(
								(__, index) => getFormFieldInstance(index),
							);
					},
					{ immediate: true },
				);

				return {
					formFieldInstances,
				};
			})!;

			const check = () => {
				const result: unknown[] = [];
				const errors: ErrorProperties[] = [];

				for (let index = 0; index < formFieldInstances.value.length; index++) {
					const formFieldInstance = formFieldInstances.value[index]!;

					const checkResult = formFieldInstance.check();

					if (EE.isLeft(checkResult)) {
						errors.push(...unwrap(checkResult));
					} else {
						result.push(unwrap(checkResult));
					}
				}

				if (AA.minElements(errors, 1)) {
					return EE.error(errors);
				}

				return EE.success(result);
			};

			const reset = () => {
				Object.entries(cacheFormFields).forEach(
					([, formFieldInstance]) => void formFieldInstance.reset(),
				);
			};

			const dispose = () => {
				scope.stop();
				Object.entries(cacheFormFields).forEach(
					([, formFieldInstance]) => void formFieldInstance.dispose(),
				);
			};

			const getCurrentValue = () => modelValue.value;

			const cacheFormFieldVNodes: Record<number, VNode> = {};
			const getFormFieldVNodes = () => formFieldInstances.value.map(
				(formFieldInstance, index) => {
					if (cacheFormFieldVNodes[index] === undefined) {
						cacheFormFieldVNodes[index] = formFieldInstance.getVNode();
					}

					return cacheFormFieldVNodes[index];
				},
			);

			const getFormFieldsQuantity = () => formFieldInstances.value.length;

			const onAddElement = () => {
				if (modelValue.value.length >= maxElements) {
					return;
				}

				modelValue.value.push(
					simpleClone(formField.defaultValue),
				);
			};

			const onRemoveElement = (index: number) => {
				if (modelValue.value.length <= minElements) {
					return;
				}

				modelValue.value.splice(index, 1);
			};

			const onResetElement = (index: number) => {
				if (index in modelValue.value) {
					formFieldInstances.value[index]?.reset();
					modelValue.value[index] = simpleClone(formField.defaultValue);
				}
			};

			const getVNode = () => h(
				() => template.getVNode(
					{
						fieldKey: key,
						getFormFields: getFormFieldVNodes,
						getFormFieldsQuantity,
						getCurrentValue,
						max: maxElements,
						min: minElements,
						onAddElement,
						onRemoveElement,
						onResetElement,
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
		Array
			.from({ length: minElements })
			.fill(formField.defaultValue),
	);
}
