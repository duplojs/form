import { type AnyTuple, type Kind } from "@duplojs/utils";
import type * as DP from "@duplojs/utils/dataParser";
import type * as EE from "@duplojs/utils/either";
import { createVueFormKind } from "./kind";
import { type Ref, type VNode } from "vue";
import { type Templates } from "./template";

export type FormFieldInstanceParams<
	GenericValue extends unknown = unknown,
> = [
	modelValue: Ref<GenericValue>,
	key: string,
	templates: Templates,
];

export interface ErrorProperties {
	key: string;
	dataParserError?: DP.DataParserError;
}

export interface FormFieldInstance<
	GenericCheckedValue extends unknown = unknown,
> {
	check(): EE.Error<AnyTuple<ErrorProperties>> | EE.Success<GenericCheckedValue>;
	reset(): void;
	dispose(): void;
	getVNode(): VNode;
}

export interface FormFieldProperties<
	GenericValue extends unknown = unknown,
	GenericCheckedValue extends unknown = unknown,
> {
	value: GenericValue;
	checkedValue: GenericCheckedValue;
}

export const formFieldKind = createVueFormKind<
	"form-field",
	FormFieldProperties
>("form-field");

export interface FormField<
	GenericValue extends unknown = unknown,
	GenericCheckedValue extends unknown = unknown,
> extends Kind<
		typeof formFieldKind.definition,
		FormFieldProperties<
			GenericValue,
			GenericCheckedValue
		>
	> {
	"new"(
		...args: FormFieldInstanceParams<GenericValue>
	): FormFieldInstance<GenericCheckedValue>;
	readonly defaultValue: GenericValue;
}

export function createFormField<
	GenericValue extends unknown,
	GenericCheckedValue extends unknown,
>(
	theFunction: (
		...args: FormFieldInstanceParams<GenericValue>
	) => FormFieldInstance<
		GenericCheckedValue
	>,
	defaultValue: NoInfer<GenericValue>,
): FormField<
		GenericValue,
		GenericCheckedValue
	> {
	return formFieldKind.setTo(
		{
			new: theFunction,
			defaultValue,
		},
		{} as any,
	);
}

export type GetFormFieldValue<
	GenericFormField extends FormField,
> = GenericFormField extends FormField<infer InferredValue>
	? InferredValue
	: never;

export type GetFormFieldCheckedValue<
	GenericFormField extends FormField,
> = GenericFormField extends FormField<any, infer InferredCheckedValue>
	? InferredCheckedValue
	: never;
