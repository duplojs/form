/* eslint-disable @typescript-eslint/prefer-for-of */
import { createFormField, type ErrorProperties, type FormField, type GetFormFieldCheckedValue, type GetFormFieldValue } from "@V/formField";
import { type Templates } from "@V/template";
import { type VueComponent } from "@V/types";
import { simpleClone, unwrap } from "@duplojs/utils";
import * as EE from "@duplojs/utils/either";
import * as AA from "@duplojs/utils/array";
import { computed, effectScope, h, shallowRef, watch, type VNode } from "vue";

export interface RepeatTemplateProperties {
	props: {
		fieldKey: string;
		max: number;
		min: number;
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

export interface UseRepeatLayoutParams {
	max: number;
	min: number;
	template?: Templates["repeat"];
}

export function useRepeatLayout<
	GenericFormField extends FormField,
>(
	formField: GenericFormField,
	params: UseRepeatLayoutParams
): FormField<
	GetFormFieldValue<GenericFormField>[],
	GetFormFieldCheckedValue<GenericFormField>[]
>;

export function useRepeatLayout(
	formField: FormField,
	params: UseRepeatLayoutParams,
): FormField<unknown[]> {
	return createFormField(
		(modelValue, key, templates) => {
			const template = params?.template ?? templates.repeat;

			const scope = effectScope();
			const {
				formFieldInstances,
				formFieldVNodes,
			} = scope.run(() => {
				const sizeModelValue = shallowRef(
					Array.from({ length: modelValue.value.length }),
				);

				watch(
					() => modelValue.value.length,
					(length) => {
						sizeModelValue.value = Array.from({ length });
					},
				);

				const formFieldInstances = computed(
					() => sizeModelValue.value.map(
						(__, index) => formField.new(
							computed({
								get: () => modelValue.value[index] ?? formField.defaultValue,
								set: (value) => {
									if (index >= modelValue.value.length) {
										return;
									}
									modelValue.value[index] = value;
								},
							}),
							`${key}.${index}`,
							templates,
						),
					),
				);

				watch(
					formFieldInstances,
					(newValue, oldValue) => void oldValue.forEach(
						(formFieldInstance) => void formFieldInstance.dispose(),
					),
				);

				const formFieldVNodes = computed(
					() => formFieldInstances.value
						.map(
							(formFieldInstance) => formFieldInstance.getVNode(),
						),
				);

				return {
					formFieldInstances,
					formFieldVNodes,
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
				formFieldInstances.value.forEach(
					(formFieldInstance) => void formFieldInstance.reset(),
				);
			};

			const dispose = () => {
				scope.stop();
				formFieldInstances.value.forEach(
					(formFieldInstance) => void formFieldInstance.dispose(),
				);
			};

			const getCurrentValue = () => modelValue.value;

			const getFormFieldVNodes = () => formFieldVNodes.value;

			const onAddElement = () => {
				if (modelValue.value.length >= params.max) {
					return;
				}

				modelValue.value.push(
					simpleClone(formField.defaultValue),
				);
			};

			const onRemoveElement = (index: number) => {
				if (modelValue.value.length <= params.min) {
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
						getCurrentValue,
						max: params.max,
						min: params.min,
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
			.from({ length: params.min })
			.fill(formField.defaultValue),
	);
}
