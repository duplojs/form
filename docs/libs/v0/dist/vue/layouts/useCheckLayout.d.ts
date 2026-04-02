import { type FormField, type GetFormFieldValue } from "../formField";
import type * as DP from "@duplojs/utils/dataParser";
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
export interface UseCheckLayoutParams<GenericDataParser extends DP.DataParser = DP.DataParser> {
    dataParser: GenericDataParser;
    template?: Templates["check"];
}
export declare function useCheckLayout<GenericFormField extends FormField, GenericDataParser extends DP.DataParser>(formField: GenericFormField, params: UseCheckLayoutParams<GenericDataParser>): FormField<GetFormFieldValue<GenericFormField>, DP.Output<GenericDataParser>>;
