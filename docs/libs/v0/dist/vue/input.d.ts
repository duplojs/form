import { type MayBeGetter, type AnyFunction, type SimplifyTopLevel, type Unwrap } from "@duplojs/utils";
import * as EE from "@duplojs/utils/either";
import { type FormFieldInstance, type FormField } from "./formField";
import { type VueComponent } from "./types";
import { type Templates } from "./template";
export interface InputTemplateProperties {
    props: {
        getCurrentValue(): unknown;
    };
    slots: {
        input(): any;
    };
    expose: {
        check?: FormFieldInstance["check"];
        reset?: FormFieldInstance["reset"];
        dispose?: FormFieldInstance["dispose"];
    };
}
declare module "./template" {
    interface AllowedTemplateComponents {
        input: VueComponent<InputTemplateProperties>;
    }
}
export type VueInputComponent = VueComponent<{
    props: {
        modelValue?: unknown;
    };
    emits: {
        "update:modelValue"(value: any): any;
    };
    expose: InputTemplateProperties["expose"];
}>;
export type GetVueInputComponentValue<GenericInputComponentInstance extends InstanceType<VueInputComponent>> = Exclude<GenericInputComponentInstance["$props"]["modelValue"], undefined>;
export type GetVueInputComponentProps<GenericInputComponentInstance extends InstanceType<VueInputComponent>> = Omit<GenericInputComponentInstance["$props"], "modelValue" | "onUpdate:modelValue">;
export type GetVueInputComponentCheckedValue<GenericInputComponentInstance extends InstanceType<VueInputComponent>> = GenericInputComponentInstance["check"] extends AnyFunction ? Unwrap<Extract<ReturnType<GenericInputComponentInstance["check"]>, EE.Success>> : GetVueInputComponentValue<GenericInputComponentInstance>;
export type CreateInputParams<GenericInputComponentInstance extends InstanceType<VueInputComponent> = InstanceType<VueInputComponent>> = SimplifyTopLevel<{
    defaultValue: (Exclude<GetVueInputComponentValue<GenericInputComponentInstance>, object | AnyFunction> | (() => GetVueInputComponentValue<GenericInputComponentInstance>));
    template?: Templates["input"];
} & (GetVueInputComponentProps<GenericInputComponentInstance> extends infer InferredProps ? {} extends InferredProps ? {
    props?: InferredProps;
} : {
    props: InferredProps;
} : never)>;
export interface UseInputParams<GenericInputComponentInstance extends InstanceType<VueInputComponent> = InstanceType<VueInputComponent>> {
    defaultValue?: (Exclude<GetVueInputComponentValue<GenericInputComponentInstance>, object | AnyFunction> | (() => GetVueInputComponentValue<GenericInputComponentInstance>));
    props?: MayBeGetter<GetVueInputComponentProps<GenericInputComponentInstance>>;
    template?: Templates["input"];
}
export type UseInput<GenericInputComponentInstance extends InstanceType<VueInputComponent> = InstanceType<VueInputComponent>> = (params?: UseInputParams<GenericInputComponentInstance>) => FormField<GetVueInputComponentValue<GenericInputComponentInstance>, GetVueInputComponentCheckedValue<GenericInputComponentInstance>>;
export declare function createInput<GenericInputComponent extends VueInputComponent, GenericInputComponentInstance extends InstanceType<GenericInputComponent>>(inputComponent: GenericInputComponent, defaultParams: CreateInputParams<GenericInputComponentInstance>): UseInput<GenericInputComponentInstance>;
