import { createFormField, type FormField, type GetFormFieldCheckedValue, type GetFormFieldValue } from "@V/formField";
import * as EE from "@duplojs/utils/either";
import { h } from "vue";

export interface UseDisabledLayoutParams {
	isDisabled(): boolean;
}

export function useDisabledLayout<
	GenericFormField extends FormField,
>(
	formField: GenericFormField,
	params: UseDisabledLayoutParams
): FormField<
	GetFormFieldValue<GenericFormField>,
	GetFormFieldCheckedValue<GenericFormField> | undefined
>;

export function useDisabledLayout(
	formField: FormField,
	params: UseDisabledLayoutParams,
): FormField {
	return createFormField(
		(modelValue, parentKey, templates) => {
			const key = `${parentKey}_DIS`;

			const formFieldInstance = formField.new(
				modelValue,
				key,
				templates,
			);

			const check = () => {
				if (params.isDisabled()) {
					return EE.success(undefined);
				}

				return formFieldInstance.check();
			};

			const reset = () => {
				formFieldInstance.reset();
			};

			const dispose = () => {
				formFieldInstance.dispose();
			};

			const formFieldVNode = formFieldInstance.getVNode();

			const getVNode = () => h(
				() => params.isDisabled()
					? null
					: formFieldVNode,
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
