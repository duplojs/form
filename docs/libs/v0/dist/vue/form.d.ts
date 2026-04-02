import { type FunctionalComponent, type HTMLAttributes, type Ref } from "vue";
import { type GetFormFieldCheckedValue, type GetFormFieldValue, type FormField, type FormFieldInstance } from "./formField";
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
    component: FunctionalComponent<HTMLAttributes, {}, {
        default?(): any;
    }>;
}
export interface UseFormParams {
    template?: Templates["form"];
}
export type UseForm = <GenericFormField extends FormField>(formField: GenericFormField, params?: UseFormParams) => FormProperties<GenericFormField>;
export declare function createForm(templates: Templates): UseForm;
