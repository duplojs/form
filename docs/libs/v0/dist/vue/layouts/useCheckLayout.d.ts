import { type GetFormFieldCheckedValue, type FormField, type GetFormFieldValue, type GetFormFieldSlots } from "../formField";
import * as EE from "@duplojs/utils/either";
import type * as DP from "@duplojs/utils/dataParser";
import { type IsEqual } from "@duplojs/utils";
import { type VueComponent } from "../types";
import { type Templates } from "../template";
export interface CheckTemplateProperties {
    props: {
        fieldKey: string;
        getCurrentValue(): unknown;
        getErrorMessage(): string | null;
    };
    slots: {
        formField(): any;
    };
}
declare module "../template" {
    interface AllowedTemplateComponents {
        check: VueComponent<CheckTemplateProperties>;
    }
}
export interface UseCheckLayoutParams<GenericDataParser extends DP.DataParser = DP.DataParser, GenericCheckedValue extends unknown = unknown> {
    dataParser?: GenericDataParser;
    refine?(value: GenericCheckedValue): EE.Ok | EE.Error<string>;
    class?: string;
    template?: Templates["check"];
}
export declare function useCheckLayout<GenericFormField extends FormField, GenericDataParser extends DP.DataParser = never>(formField: GenericFormField, params: UseCheckLayoutParams<GenericDataParser, GetFormFieldCheckedValue<GenericFormField>>): FormField<GetFormFieldValue<GenericFormField>, IsEqual<GenericDataParser, never> extends true ? GetFormFieldCheckedValue<GenericFormField> : DP.Output<GenericDataParser>, GetFormFieldSlots<GenericFormField>>;
