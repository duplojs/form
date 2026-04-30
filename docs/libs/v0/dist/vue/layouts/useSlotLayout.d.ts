import { type GetFormFieldSlots, type FormField, type GetFormFieldCheckedValue, type GetFormFieldValue, type FormFieldSlotParams } from "../formField";
import { type AnyFunction, type SimplifyTopLevel } from "@duplojs/utils";
export type SlotPrimitiveDefaultValue = null | string | undefined | boolean | bigint | number;
export type SlotDefaultValue = SlotPrimitiveDefaultValue | (() => object | SlotPrimitiveDefaultValue);
export interface UseSlotLayoutParams<GenericDefaultValue extends SlotDefaultValue = SlotDefaultValue> {
    defaultValue: GenericDefaultValue;
}
type ComputeSlotValue<GenericDefaultValue extends SlotDefaultValue = SlotDefaultValue> = GenericDefaultValue extends AnyFunction ? ReturnType<GenericDefaultValue> : GenericDefaultValue;
export declare function useSlotLayout<GenericName extends string, GenericFormField extends FormField>(name: GenericName, formField: GenericFormField): FormField<GetFormFieldValue<GenericFormField>, GetFormFieldCheckedValue<GenericFormField> | undefined, SimplifyTopLevel<GetFormFieldSlots<GenericFormField> & {
    [Prop in GenericName]: SimplifyTopLevel<Omit<FormFieldSlotParams<GetFormFieldValue<GenericFormField>>, "formField"> & {
        formField(): any;
    }>;
}>>;
export declare function useSlotLayout<GenericName extends string, GenericDefaultValue extends SlotDefaultValue>(name: GenericName, params: UseSlotLayoutParams<GenericDefaultValue>): FormField<ComputeSlotValue<GenericDefaultValue>, ComputeSlotValue<GenericDefaultValue>, SimplifyTopLevel<{
    [Prop in GenericName]: SimplifyTopLevel<Omit<FormFieldSlotParams<ComputeSlotValue<GenericDefaultValue>>, "formField">>;
}>>;
export {};
