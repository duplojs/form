import * as DD from "@duplojs/utils/date";
export interface Props {
    min?: DD.TheDate | DD.SerializedTheDate;
    max?: DD.TheDate | DD.SerializedTheDate;
}
type __VLS_Props = Props;
type __VLS_ModelProps = {
    modelValue?: DD.TheDate | DD.SerializedTheDate | null;
};
type __VLS_PublicProps = __VLS_Props & __VLS_ModelProps;
declare const __VLS_export: import("vue").DefineComponent<__VLS_PublicProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:modelValue": (value: DD.TheDate | `date${number}-` | `date${number}+` | null | undefined) => any;
}, string, import("vue").PublicProps, Readonly<__VLS_PublicProps> & Readonly<{
    "onUpdate:modelValue"?: ((value: DD.TheDate | `date${number}-` | `date${number}+` | null | undefined) => any) | undefined;
}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: typeof __VLS_export;
export default _default;
