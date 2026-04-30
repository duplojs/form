import { type MayBeGetter, type AnyFunction, type SimplifyTopLevel, type Unwrap, type IsEqual } from "@duplojs/utils";
import type * as DP from "@duplojs/utils/dataParser";
import * as EE from "@duplojs/utils/either";
import { type FormFieldInstance, type FormField } from "./formField";
import { type VueComponent } from "./types";
import { type Templates } from "./template";
export interface InputTemplateProperties {
    props: {
        getLabel?(): string;
        getCurrentValue(): unknown;
        getErrorMessage?(): string | null;
        fieldKey: string;
    };
    slots: {
        input(): any;
    };
}
declare module "./template" {
    interface AllowedTemplateComponents {
        input: VueComponent<InputTemplateProperties>;
    }
}
export interface ExposeInputProperties {
    check?: FormFieldInstance["check"];
    reset?: FormFieldInstance["reset"];
    dispose?: FormFieldInstance["dispose"];
}
export type VueInputComponent = VueComponent<{
    props: {
        modelValue?: unknown;
    };
    emits: {
        "update:modelValue"(value: any): any;
    };
    expose: ExposeInputProperties;
}>;
export type GetVueInputComponentValue<GenericInputComponentInstance extends InstanceType<VueInputComponent>> = Exclude<GenericInputComponentInstance["$props"]["modelValue"], undefined>;
export type GetVueInputComponentProps<GenericInputComponentInstance extends InstanceType<VueInputComponent>> = SimplifyTopLevel<Omit<GenericInputComponentInstance["$props"], "modelValue" | "onUpdate:modelValue" | "id" | "ref" | "key">>;
export type GetVueInputComponentCheckedValue<GenericInputComponentInstance extends InstanceType<VueInputComponent>> = GenericInputComponentInstance["check"] extends AnyFunction ? Unwrap<Extract<ReturnType<GenericInputComponentInstance["check"]>, EE.Success>> : GetVueInputComponentValue<GenericInputComponentInstance>;
export type CreateInputParams<GenericInputComponentInstance extends InstanceType<VueInputComponent> = InstanceType<VueInputComponent>> = SimplifyTopLevel<{
    defaultValue: (Exclude<GetVueInputComponentValue<GenericInputComponentInstance>, object | AnyFunction> | (() => GetVueInputComponentValue<GenericInputComponentInstance>));
    template?: Templates["input"];
} & (GetVueInputComponentProps<GenericInputComponentInstance> extends infer InferredProps ? {} extends InferredProps ? {
    props?: InferredProps;
} : {
    props: InferredProps;
} : never)>;
export interface UseInputParams<GenericInputComponentInstance extends InstanceType<VueInputComponent> = InstanceType<VueInputComponent>, GenericDataParser extends DP.DataParser = DP.DataParser> {
    label?: MayBeGetter<string>;
    defaultValue?: (Exclude<GetVueInputComponentValue<GenericInputComponentInstance>, object | AnyFunction> | (() => GetVueInputComponentValue<GenericInputComponentInstance>));
    props?: MayBeGetter<GetVueInputComponentProps<GenericInputComponentInstance>>;
    dataParser?: GenericDataParser;
    class?: string;
    template?: Templates["input"];
}
export type UseInput<GenericInputComponentInstance extends InstanceType<VueInputComponent> = InstanceType<VueInputComponent>> = <GenericDataParser extends DP.DataParser = never>(params?: UseInputParams<GenericInputComponentInstance, GenericDataParser>) => FormField<GetVueInputComponentValue<GenericInputComponentInstance>, IsEqual<GenericDataParser, never> extends true ? GetVueInputComponentCheckedValue<GenericInputComponentInstance> : DP.Output<GenericDataParser>, {}>;
export declare function createInput<GenericInputComponent extends VueInputComponent, GenericInputComponentInstance extends InstanceType<GenericInputComponent>>(inputComponent: GenericInputComponent, defaultParams: CreateInputParams<GenericInputComponentInstance>): UseInput<GenericInputComponentInstance>;
