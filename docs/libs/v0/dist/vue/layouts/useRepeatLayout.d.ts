import { type FormField, type GetFormFieldCheckedValue, type GetFormFieldValue } from "../formField";
import { type Templates } from "../template";
import { type VueComponent } from "../types";
import * as AA from "@duplojs/utils/array";
import { type VNode } from "vue";
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
declare module "../template" {
    interface AllowedTemplateComponents {
        repeat: VueComponent<RepeatTemplateProperties>;
    }
}
export interface UseRepeatLayoutParams<GenericMin extends number = number> {
    max: number;
    min?: GenericMin;
    template?: Templates["repeat"];
}
export declare function useRepeatLayout<GenericFormField extends FormField, GenericMin extends number = 0>(formField: GenericFormField, params: UseRepeatLayoutParams<GenericMin>): FormField<[
    ...AA.CreateTuple<GetFormFieldValue<GenericFormField>, GenericMin>,
    ...GetFormFieldValue<GenericFormField>[]
], [
    ...AA.CreateTuple<GetFormFieldCheckedValue<GenericFormField>, GenericMin>,
    ...GetFormFieldCheckedValue<GenericFormField>[]
]>;
