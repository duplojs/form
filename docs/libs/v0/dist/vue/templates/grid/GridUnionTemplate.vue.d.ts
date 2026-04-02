import { type UnionTemplateProperties } from "../../layouts";
import { type GridTemplateLayoutContainerProps } from "./types";
import { type VueComponent } from "../../types";
export type Props = (UnionTemplateProperties["props"] & GridTemplateLayoutContainerProps & {
    labels?: Record<string, string>;
    selectKind?: VueComponent<{
        props: {
            fieldKey: string;
            options: {
                value: string;
                label: string;
            }[];
            modelValue: string;
        };
        emits: {
            "update:modelValue"(value: string): any;
        };
    }>;
});
type __VLS_Slots = UnionTemplateProperties["slots"];
declare const __VLS_base: import("vue").DefineComponent<Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    changeKind: (kind: string) => any;
}, string, import("vue").PublicProps, Readonly<Props> & Readonly<{
    onChangeKind?: ((kind: string) => any) | undefined;
}>, {
    selectKind: VueComponent<{
        props: {
            fieldKey: string;
            options: {
                value: string;
                label: string;
            }[];
            modelValue: string;
        };
        emits: {
            "update:modelValue"(value: string): any;
        };
    }>;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const __VLS_export: __VLS_WithSlots<typeof __VLS_base, __VLS_Slots>;
declare const _default: typeof __VLS_export;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
