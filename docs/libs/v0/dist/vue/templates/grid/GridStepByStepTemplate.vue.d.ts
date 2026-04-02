import { type StepTemplateProperties } from "../../layouts";
import { type VueComponent } from "../../types";
import { type VNode } from "vue";
export type Props = (StepTemplateProperties["props"] & {
    nextButton?: VueComponent | (() => VNode)[];
    previousButton?: VueComponent | (() => VNode)[];
    resetButton?: VueComponent | (() => VNode)[];
});
type __VLS_Slots = StepTemplateProperties["slots"];
declare const __VLS_base: import("vue").DefineComponent<Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    nextStep: () => any;
    previousStep: () => any;
    resetStep: () => any;
}, string, import("vue").PublicProps, Readonly<Props> & Readonly<{
    onNextStep?: (() => any) | undefined;
    onPreviousStep?: (() => any) | undefined;
    onResetStep?: (() => any) | undefined;
}>, {
    resetButton: VueComponent | (() => VNode)[];
    nextButton: VueComponent | (() => VNode)[];
    previousButton: VueComponent | (() => VNode)[];
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const __VLS_export: __VLS_WithSlots<typeof __VLS_base, __VLS_Slots>;
declare const _default: typeof __VLS_export;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
