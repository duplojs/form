import { type RepeatTemplateProperties } from "../../layouts";
import { type GridTemplateLayoutContainerProps } from "./types";
import { type VNode } from "vue";
import { type VueComponent } from "../../types";
export type Props = (RepeatTemplateProperties["props"] & GridTemplateLayoutContainerProps & {
    repeatElementColumn?: number;
    repeatElementMaxColumn?: number;
    removeButton?: VueComponent | (() => VNode);
    addButton?: VueComponent | (() => VNode);
    resetButton?: VueComponent | (() => VNode);
});
type __VLS_Slots = RepeatTemplateProperties["slots"];
declare const __VLS_base: import("vue").DefineComponent<Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    addElement: () => any;
    removeElement: (index: number) => any;
    resetElement: (index: number) => any;
}, string, import("vue").PublicProps, Readonly<Props> & Readonly<{
    onAddElement?: (() => any) | undefined;
    onRemoveElement?: ((index: number) => any) | undefined;
    onResetElement?: ((index: number) => any) | undefined;
}>, {
    removeButton: VueComponent | (() => VNode);
    addButton: VueComponent | (() => VNode);
    resetButton: VueComponent | (() => VNode);
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const __VLS_export: __VLS_WithSlots<typeof __VLS_base, __VLS_Slots>;
declare const _default: typeof __VLS_export;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
