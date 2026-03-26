import { createFormField, type FormField, type GetFormFieldValue } from "@V/formField";
import * as EE from "@duplojs/utils/either";
import type * as DP from "@duplojs/utils/dataParser";
import { unwrap } from "@duplojs/utils";
import { ref, watch } from "vue";
import { type VueComponent } from "@V/types";
import { type Templates } from "@V/template";

export interface CheckTemplateProperties {
	props: {
		fieldKey: string;
		errorMessage: string | null;
		getCurrentValue(): unknown;
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
> {
	dataParser: GenericDataParser;
	template?: Templates["check"];
}

export function useCheckLayout<
	GenericFormField extends FormField,
	GenericDataParser extends DP.DataParser,
>(
	formField: GenericFormField,
	params: UseCheckLayoutParams<GenericDataParser>
): FormField<
	GetFormFieldValue<GenericFormField>,
	DP.Output<GenericDataParser>
>;

export function useCheckLayout(
	formField: FormField,
	params: UseCheckLayoutParams,
): FormField {
	return createFormField(
		(modelValue, key, templates) => {
			const template = params?.template ?? templates.check;

			const formFieldInstance = formField.new(
				modelValue,
				key,
				templates,
			);
			const errorMessage = ref<null | string>(null);

			const check = () => {
				const fieldValue = formFieldInstance.check();

				if (EE.isLeft(fieldValue)) {
					return fieldValue;
				}

				const result = params.dataParser.parse(
					unwrap(fieldValue),
				);

				if (EE.isLeft(result)) {
					const dataParserError = unwrap(result);
					errorMessage.value = dataParserError.issues[0]?.source.definition.errorMessage ?? "Error";

					return EE.error({
						key,
						dataParserError,
					});
				}

				errorMessage.value = null;
				return result;
			};

			watch(
				modelValue,
				() => {
					if (errorMessage.value !== null) {
						check();
					}
				},
				{ flush: "post" },
			);

			const reset = () => {
				formFieldInstance.reset();
				errorMessage.value = null;
			};

			const getCurrentValue = () => modelValue.value;

			const getVNode = () => {
				const vNode = formFieldInstance.getVNode();

				return template.getVNode(
					{
						fieldKey: key,
						errorMessage: errorMessage.value,
						getCurrentValue,
					},
					{ formField: () => vNode },
				);
			};

			return {
				check,
				reset,
				getVNode,
			};
		},
		formField.defaultValue,
	);
}
