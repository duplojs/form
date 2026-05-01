import { type GetFormFieldCheckedValue, type FormField, type GetFormFieldValue, type MergeFormFieldSlots } from "../formField";
import { type AnyTuple } from "@duplojs/utils";
import { type VNode } from "vue";
import { type VueComponent } from "../types";
import { type Templates } from "../template";
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
declare module "../template" {
    interface AllowedTemplateComponents {
        step: VueComponent<StepTemplateProperties>;
    }
}
export interface UseStepLayoutParams {
    errorMessageNotAtLastStep: string;
    class?: string;
    template?: Templates["step"];
}
export declare function useStepLayout<const GenericFormFields extends AnyTuple<FormField>>(formFields: GenericFormFields, params: UseStepLayoutParams): FormField<{
    currentStep: Exclude<keyof GenericFormFields, keyof any[]> extends `${infer InferredStep extends number}` ? InferredStep : never;
    steps: {
        -readonly [Prop in keyof GenericFormFields]: GetFormFieldValue<Extract<GenericFormFields[Prop], FormField>>;
    };
}, {
    [Prop in keyof GenericFormFields]: GetFormFieldCheckedValue<GenericFormFields[Prop]>;
}, MergeFormFieldSlots<GenericFormFields[number]>>;
