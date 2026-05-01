import type * as DD from "@duplojs/utils/date";
export interface Props {
    min?: DD.TheTime | DD.SerializedTheTime;
    max?: DD.TheTime | DD.SerializedTheTime;
}
type __VLS_Props = Props;
export interface Model {
    to: DD.TheTime | DD.SerializedTheTime | null;
    from: DD.TheTime | DD.SerializedTheTime | null;
}
type __VLS_ModelProps = {
    modelValue?: Model;
};
type __VLS_PublicProps = __VLS_Props & __VLS_ModelProps;
declare const __VLS_export: import("vue").DefineComponent<__VLS_PublicProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:modelValue": (value: Model) => any;
}, string, import("vue").PublicProps, Readonly<__VLS_PublicProps> & Readonly<{
    "onUpdate:modelValue"?: ((value: Model) => any) | undefined;
}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: typeof __VLS_export;
export default _default;
