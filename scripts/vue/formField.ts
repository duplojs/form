import { type UnionToIntersection, type AnyTuple, type Kind } from "@duplojs/utils";
import type * as DP from "@duplojs/utils/dataParser";
import type * as EE from "@duplojs/utils/either";
import { createVueFormKind } from "./kind";
import { type Ref, type VNode } from "vue";
import { type Templates } from "./template";

export interface FormFieldSlotParams<
	GenericValue extends unknown = unknown,
> {
	fieldKey: string;
	value: GenericValue;
	update(value: GenericValue): void;
	formField?(): VNode;
}

export type FormFieldSlots = Record<
	string,
	FormFieldSlotParams
>;

export type FormFieldInstanceParams<
	GenericValue extends unknown = unknown,
> = [
	modelValue: Ref<GenericValue>,
	parentKey: string,
	templates: Templates,
	getSlot: (
		name: string,
		params: FormFieldSlotParams
	) => VNode | null,
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
	GenericSlots extends FormFieldSlots = FormFieldSlots,
> {
	value: GenericValue;
	checkedValue: GenericCheckedValue;
	slots: GenericSlots;
}

export const formFieldKind = createVueFormKind<
	"form-field",
	FormFieldProperties
>("form-field");

export interface FormField<
	GenericValue extends unknown = unknown,
	GenericCheckedValue extends unknown = unknown,
	GenericSlots extends FormFieldSlots = FormFieldSlots,
> extends Kind<
		typeof formFieldKind.definition,
		FormFieldProperties<
			GenericValue,
			GenericCheckedValue,
			GenericSlots
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
	GenericSlots extends FormFieldSlots,
>(
	theFunction: (
		...args: FormFieldInstanceParams<GenericValue>
	) => FormFieldInstance<
		GenericCheckedValue
	>,
	defaultValue: NoInfer<GenericValue>,
): FormField<
		GenericValue,
		GenericCheckedValue,
		GenericSlots
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

export type GetFormFieldSlots<
	GenericFormField extends FormField,
> = GenericFormField extends FormField<any, any, infer InferredSlots>
	? InferredSlots
	: never;

export type MergeFormFieldSlots<
	GenericFormField extends FormField,
> = Extract<
	keyof UnionToIntersection<GetFormFieldSlots<GenericFormField>> extends infer InferredKeyof extends string
		? {
			[Prop in InferredKeyof]: Extract<
				GetFormFieldSlots<GenericFormField>,
				Record<Prop, unknown>
			>[Prop]
		}
		: never,
	FormFieldSlots
>;
