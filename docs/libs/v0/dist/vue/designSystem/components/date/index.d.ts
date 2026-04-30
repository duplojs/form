import * as DD from "@duplojs/utils/date";
export { default as DateInput } from "./DateInput.vue";
export { default as RangeDateInput } from "./RangeDateInput.vue";
export declare const useDateInput: import("../../../input").UseInput<import("vue").CreateComponentPublicInstanceWithMixins<Readonly<import("./DateInput.vue").Props & {
    modelValue?: DD.TheDate | DD.SerializedTheDate | null;
}> & Readonly<{
    "onUpdate:modelValue"?: ((value: DD.TheDate | `date${number}-` | `date${number}+` | null | undefined) => any) | undefined;
}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:modelValue": (value: DD.TheDate | `date${number}-` | `date${number}+` | null | undefined) => any;
}, import("vue").PublicProps, {}, false, {}, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, {}, any, import("vue").ComponentProvideOptions, {
    P: {};
    B: {};
    D: {};
    C: {};
    M: {};
    Defaults: {};
}, Readonly<import("./DateInput.vue").Props & {
    modelValue?: DD.TheDate | DD.SerializedTheDate | null;
}> & Readonly<{
    "onUpdate:modelValue"?: ((value: DD.TheDate | `date${number}-` | `date${number}+` | null | undefined) => any) | undefined;
}>, {}, {}, {}, {}, {}>>;
export declare const useRangeDateInput: import("../../../input").UseInput<import("vue").CreateComponentPublicInstanceWithMixins<Readonly<import("./RangeDateInput.vue").Props & {
    modelValue?: import("./RangeDateInput.vue").Model;
}> & Readonly<{
    "onUpdate:modelValue"?: ((value: import("./RangeDateInput.vue").Model) => any) | undefined;
}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:modelValue": (value: import("./RangeDateInput.vue").Model) => any;
}, import("vue").PublicProps, {}, false, {}, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, {}, any, import("vue").ComponentProvideOptions, {
    P: {};
    B: {};
    D: {};
    C: {};
    M: {};
    Defaults: {};
}, Readonly<import("./RangeDateInput.vue").Props & {
    modelValue?: import("./RangeDateInput.vue").Model;
}> & Readonly<{
    "onUpdate:modelValue"?: ((value: import("./RangeDateInput.vue").Model) => any) | undefined;
}>, {}, {}, {}, {}, {}>>;
