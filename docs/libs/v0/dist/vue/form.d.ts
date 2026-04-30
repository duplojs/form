import { type FunctionalComponent, type HTMLAttributes, type Ref } from "vue";
import { type GetFormFieldCheckedValue, type GetFormFieldValue, type FormField, type FormFieldInstance, type GetFormFieldSlots, type FormFieldSlots } from "./formField";
import type * as EE from "@duplojs/utils/either";
import { type SimplifyTopLevel, type Unwrap } from "@duplojs/utils";
import { type Templates } from "./template";
import { type VueComponent } from "./types";
export interface FormTemplateProperties {
    props: {
        fieldKey: string;
        getCurrentValue(): unknown;
    };
    emits: {
        submit: [];
    };
    slots: {
        formField(): any;
        submitter(): any;
    };
}
declare module "./template" {
    interface AllowedTemplateComponents {
        form: VueComponent<FormTemplateProperties>;
    }
}
export interface FormProperties<GenericFormField extends FormField = FormField> {
    check: FormFieldInstance<GetFormFieldCheckedValue<GenericFormField>>["check"];
    currentValue: Ref<GetFormFieldValue<GenericFormField>>;
    reset(): void;
    dispose(): void;
    component: FunctionalComponent<HTMLAttributes, {}, SimplifyTopLevel<{
        default?(): any;
    } & (GetFormFieldSlots<GenericFormField> extends infer InferredSlots extends FormFieldSlots ? {
        [Prop in keyof InferredSlots]: (params: InferredSlots[Prop]) => any;
    } : {})>>;
}
export interface UseFormParams {
    class?: string;
    template?: Templates["form"];
}
export type UseForm = <GenericFormField extends FormField>(formField: GenericFormField, params?: UseFormParams) => FormProperties<GenericFormField>;
export declare function createForm(templates: Templates): UseForm;
export type GetCheckedValue<GenericCheck extends FormProperties["check"]> = Unwrap<Extract<ReturnType<GenericCheck>, EE.Right>>;
