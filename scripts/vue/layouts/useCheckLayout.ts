import { createFormField, type GetFormFieldCheckedValue, type FormField, type GetFormFieldValue, type GetFormFieldSlots } from "@V/formField";
import * as EE from "@duplojs/utils/either";
import type * as DP from "@duplojs/utils/dataParser";
import { type IsEqual, unwrap } from "@duplojs/utils";
import { effectScope, ref, watch } from "vue";
import { type VueComponent } from "@V/types";
import { type Templates } from "@V/template";

export interface CheckTemplateProperties {
	props: {
		fieldKey: string;
		getCurrentValue(): unknown;
		getErrorMessage(): string | null;
	};
	slots: {
		formField(): any;
	};
}
declare module "@V/template" {
	interface AllowedTemplateComponents {
		check: VueComponent<CheckTemplateProperties>;
	}
}

export interface UseCheckLayoutParams<
	GenericDataParser extends DP.DataParser = DP.DataParser,
	GenericCheckedValue extends unknown = unknown,
> {
	dataParser?: GenericDataParser;
	refine?(value: GenericCheckedValue): EE.Ok | EE.Error<string>;
	class?: string;
	template?: Templates["check"];
}

export function useCheckLayout<
	GenericFormField extends FormField,
	GenericDataParser extends DP.DataParser = never,
>(
	formField: GenericFormField,
	params: UseCheckLayoutParams<
		GenericDataParser,
		GetFormFieldCheckedValue<GenericFormField>
	>
): FormField<
	GetFormFieldValue<GenericFormField>,
	IsEqual<GenericDataParser, never> extends true
		? GetFormFieldCheckedValue<GenericFormField>
		: DP.Output<GenericDataParser>,
	GetFormFieldSlots<GenericFormField>
>;

export function useCheckLayout(
	formField: FormField,
	params: UseCheckLayoutParams,
): FormField {
	return createFormField(
		(modelValue, parentKey, templates, getSlot) => {
			const key = `${parentKey}_CHK`;
			const template = params?.template ?? templates.check;

			const formFieldInstance = formField.new(
				modelValue,
				key,
				templates,
				getSlot,
			);

			const scope = effectScope();
			const { errorMessage } = scope.run(() => {
				const errorMessage = ref<null | string>(null);

				watch(
					modelValue,
					() => {
						if (errorMessage.value !== null) {
							check();
						}
					},
					{ flush: "post" },
				);

				return {
					errorMessage,
				};
			})!;

			const check = () => {
				const fieldResult = formFieldInstance.check();

				if (EE.isLeft(fieldResult)) {
					return fieldResult;
				}

				const fieldValue = unwrap(fieldResult);
				const refineResult = params.refine?.(fieldValue);
				if (EE.isLeft(refineResult)) {
					errorMessage.value = unwrap(refineResult);

					return EE.error(
						[{ key }] as const,
					);
				}

				const result = params.dataParser?.parse(
					fieldValue,
				) ?? EE.success(fieldValue);

				if (EE.isLeft(result)) {
					const dataParserError = unwrap(result);
					errorMessage.value = dataParserError.issues[0]?.message ?? "Error";

					return EE.error(
						[
							{
								key,
								dataParserError,
							},
						] as const,
					);
				}

				errorMessage.value = null;
				return result;
			};

			const reset = () => {
				formFieldInstance.reset();
				errorMessage.value = null;
			};

			const dispose = () => {
				scope.stop();
				formFieldInstance.dispose();
			};

			const getCurrentValue = () => modelValue.value;

			const getFormFieldVNode = () => formFieldInstance.getVNode();

			const getErrorMessage = () => errorMessage.value;

			const getVNode = () => template.getVNode(
				{
					fieldKey: key,
					getErrorMessage,
					getCurrentValue,
					class: params.class,
				},
				{ formField: getFormFieldVNode },
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
