import { type FormField, type GetFormFieldCheckedValue, type GetFormFieldValue } from "../formField";
import { type Templates } from "../template";
import { type VueComponent } from "../types";
import { type AnyTuple } from "@duplojs/utils";
export interface UnionTemplateProperties {
    props: {
        fieldKey: string;
        kinds: string[];
        getCurrentValue(): unknown;
        getCurrentKind(): string;
    };
    emits: {
        changeKind: [kind: string];
    };
    slots: {
        formField(): any;
    };
}
declare module "../template" {
    interface AllowedTemplateComponents {
        union: VueComponent<UnionTemplateProperties>;
    }
}
export interface UseUnionLayoutParams<GenericKind extends string = string> {
    template?: Templates["union"];
    defaultKind: GenericKind;
}
export type FormFieldUnionElement = [string, FormField];
export declare function useUnionLayout<const GenericFormFieldElements extends FormFieldUnionElement>(formFieldUnionElements: AnyTuple<GenericFormFieldElements>, params: UseUnionLayoutParams<GenericFormFieldElements[0]>): FormField<Extract<GenericFormFieldElements, any> extends infer InferredFormFieldElements extends FormFieldUnionElement ? GenericFormFieldElements extends FormFieldUnionElement ? {
    readonly kind: GenericFormFieldElements[0];
    value: GetFormFieldValue<GenericFormFieldElements[1]>;
    updateKind(kind: InferredFormFieldElements[0]): void;
    updateKind<GenericKind extends InferredFormFieldElements[0]>(kind: GenericKind, value: GetFormFieldValue<Extract<InferredFormFieldElements, [
        GenericKind,
        any
    ]>[1]>): void;
} : never : never, GenericFormFieldElements extends FormFieldUnionElement ? {
    kind: GenericFormFieldElements[0];
    value: GetFormFieldCheckedValue<GenericFormFieldElements[1]>;
} : never>;
