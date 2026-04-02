/* eslint-disable @typescript-eslint/prefer-for-of */
import { createFormField, type GetFormFieldCheckedValue, type FormField, type GetFormFieldValue, type FormFieldInstance, type ErrorProperties } from "@V/formField";
import { simpleClone, unwrap, type AnyTuple } from "@duplojs/utils";
import { computed, effectScope, h, ref, type VNode } from "vue";
import { type VueComponent } from "@V/types";
import { type Templates } from "@V/template";
import * as EE from "@duplojs/utils/either";
import * as AA from "@duplojs/utils/array";

export interface StepTemplateProperties {
	props: {
		fieldKey: string;
		stepQuantity: number;
		isLastStep(): boolean;
		getFormFields(): (() => VNode)[];
		getCurrentValue(): unknown;
		getCurrentStep(): number;
		getErrorMessageNotAtLastStep(): null | string;
	};
	emits: {
		nextStep: [];
		previousStep: [];
		resetStep: [];
	};
	slots: {
		formField(): any;
	};
}

declare module "@V/template" {
	interface AllowedTemplateComponents {
		step: VueComponent<StepTemplateProperties>;
	}
}

export interface UseStepLayoutParams {
	template?: Templates["step"];
	errorMessageNotAtLastStep: string;
}

export function useStepLayout<
	const GenericFormFields extends AnyTuple<FormField>,
>(
	formFields: GenericFormFields,
	params: UseStepLayoutParams
): FormField<
	{
		currentStep: Exclude<
			keyof GenericFormFields,
			keyof any[]
		> extends `${infer InferredStep extends number}`
			? InferredStep
			: never;
		steps: {
			-readonly [Prop in Exclude<keyof GenericFormFields, keyof any[]>]: GetFormFieldValue<
				Extract<GenericFormFields[Prop], FormField>
			>
		};
	},
	{
		[Prop in keyof GenericFormFields]: GetFormFieldCheckedValue<GenericFormFields[Prop]>
	}
>;

export function useStepLayout(
	formFields: AnyTuple<FormField>,
	params: UseStepLayoutParams,
): FormField<
		{
			currentStep: number;
			steps: Record<number, unknown>;
		},
		Record<number, unknown>
	> {
	return createFormField(
		(modelValue, key, templates) => {
			const template = params?.template ?? templates.step;

			const cacheFormFields: Record<number, FormFieldInstance> = {};
			const scope = effectScope();
			const {
				formFieldInstances,
				errorMessageNotAtLastStep,
			} = scope.run(() => {
				const errorMessageNotAtLastStep = ref<null | string>(null);
				const formFieldInstances = formFields.map(
					(formField, index) => (
						() => {
							if (cacheFormFields[index] === undefined) {
								cacheFormFields[index] = formField.new(
									computed({
										get: () => modelValue.value.steps[index],
										set: (value) => {
											modelValue.value.steps[index] = value;
										},
									}),
									`${key}-${index}`,
									templates,
								);
							}

							return cacheFormFields[index];
						}
					),
				);

				return {
					formFieldInstances,
					errorMessageNotAtLastStep,
				};
			})!;

			const check = () => {
				const result: unknown[] = [];
				const errors: ErrorProperties[] = [];

				if (isLastStep() !== true) {
					errorMessageNotAtLastStep.value = params.errorMessageNotAtLastStep;
					return EE.error([{ key }]);
				}

				for (let index = 0; index < formFieldInstances.length; index++) {
					const formFieldInstance = formFieldInstances[index]!();

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
				Object.values(cacheFormFields).forEach(
					(formFieldInstance) => void formFieldInstance.reset(),
				);
			};

			const dispose = () => {
				scope.stop();
				Object.values(cacheFormFields).forEach(
					(formFieldInstance) => void formFieldInstance.dispose(),
				);
			};

			const getCurrentValue = () => modelValue.value;

			const cacheFormFieldVNodes: Record<number, VNode> = {};
			const formFieldVNodes = formFieldInstances.map(
				(getFormFieldInstance, index) => () => {
					if (cacheFormFieldVNodes[index] === undefined) {
						cacheFormFieldVNodes[index] = getFormFieldInstance().getVNode();
					}

					return cacheFormFieldVNodes[index];
				},
			);

			const getFormFieldVNodes = () => formFieldVNodes;

			const getCurrentStep = () => modelValue.value.currentStep;

			const isLastStep = () => AA.isLastIndex(formFields, modelValue.value.currentStep);

			const getCurrentFormFieldStepVNodes = () => formFieldVNodes[modelValue.value.currentStep]!();

			const getErrorMessageNotAtLastStep = () => errorMessageNotAtLastStep.value;

			const onNextStep = () => {
				errorMessageNotAtLastStep.value = null;
				const result = formFieldInstances[modelValue.value.currentStep]!().check();

				if (EE.isLeft(result)) {
					return;
				}

				const newIndexStep = modelValue.value.currentStep + 1;

				if (modelValue.value.steps[newIndexStep] === undefined) {
					return;
				}

				modelValue.value.currentStep = newIndexStep;
			};

			const onPreviousStep = () => {
				errorMessageNotAtLastStep.value = null;
				const newIndexStep = modelValue.value.currentStep - 1;

				if (modelValue.value.steps[newIndexStep] === undefined) {
					return;
				}

				modelValue.value.currentStep = newIndexStep;
			};

			const onResetStep = () => {
				errorMessageNotAtLastStep.value = null;
				formFieldInstances[modelValue.value.currentStep]!().reset();

				modelValue.value.steps[modelValue.value.currentStep] = simpleClone(
					formFields[modelValue.value.currentStep]?.defaultValue,
				);
			};

			const getVNode = () => h(
				() => template.getVNode(
					{
						fieldKey: key,
						stepQuantity: formFields.length,
						getFormFields: getFormFieldVNodes,
						getCurrentValue,
						getCurrentStep,
						isLastStep,
						getErrorMessageNotAtLastStep,
						onNextStep,
						onPreviousStep,
						onResetStep,
					},
					{
						formField: getCurrentFormFieldStepVNodes,
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
		{
			currentStep: 0,
			steps: formFields.map(
				(formField) => formField.defaultValue,
			),
		},
	);
}
