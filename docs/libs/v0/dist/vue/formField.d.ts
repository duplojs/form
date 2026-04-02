import { type AnyTuple, type Kind } from "@duplojs/utils";
import type * as DP from "@duplojs/utils/dataParser";
import type * as EE from "@duplojs/utils/either";
import { type Ref, type VNode } from "vue";
import { type Templates } from "./template";
export type FormFieldInstanceParams<GenericValue extends unknown = unknown> = [
    modelValue: Ref<GenericValue>,
    key: string,
    templates: Templates
];
export interface ErrorProperties {
    key: string;
    dataParserError?: DP.DataParserError;
}
export interface FormFieldInstance<GenericCheckedValue extends unknown = unknown> {
    check(): EE.Error<AnyTuple<ErrorProperties>> | EE.Success<GenericCheckedValue>;
    reset(): void;
    dispose(): void;
    getVNode(): VNode;
}
export interface FormFieldProperties<GenericValue extends unknown = unknown, GenericCheckedValue extends unknown = unknown> {
    value: GenericValue;
    checkedValue: GenericCheckedValue;
}
export declare const formFieldKind: import("@duplojs/utils").KindHandler<import("@duplojs/utils").KindDefinition<"@DuplojsVueForm/form-field", FormFieldProperties<unknown, unknown>>>;
export interface FormField<GenericValue extends unknown = unknown, GenericCheckedValue extends unknown = unknown> extends Kind<typeof formFieldKind.definition, FormFieldProperties<GenericValue, GenericCheckedValue>> {
    "new"(...args: FormFieldInstanceParams<GenericValue>): FormFieldInstance<GenericCheckedValue>;
    readonly defaultValue: GenericValue;
}
export declare function createFormField<GenericValue extends unknown, GenericCheckedValue extends unknown>(theFunction: (...args: FormFieldInstanceParams<GenericValue>) => FormFieldInstance<GenericCheckedValue>, defaultValue: NoInfer<GenericValue>): FormField<GenericValue, GenericCheckedValue>;
export type GetFormFieldValue<GenericFormField extends FormField> = GenericFormField extends FormField<infer InferredValue> ? InferredValue : never;
export type GetFormFieldCheckedValue<GenericFormField extends FormField> = GenericFormField extends FormField<any, infer InferredCheckedValue> ? InferredCheckedValue : never;
