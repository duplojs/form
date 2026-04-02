import { type Templates } from "../../template";
import "./styles.scss";
export * from "./types";
export { default as GridFormTemplate } from "./GridFormTemplate.vue";
export { default as GridInputTemplate } from "./GridInputTemplate.vue";
export { default as GridMultiTemplate } from "./GridMultiTemplate.vue";
export { default as GridCheckTemplate } from "./GridCheckTemplate.vue";
export { default as GridRepeatTemplate } from "./GridRepeatTemplate.vue";
export { default as GridUnionTemplate } from "./GridUnionTemplate.vue";
export { default as GridStepByStepTemplate } from "./GridStepByStepTemplate.vue";
export declare const useGridFormTemplate: import("../../template").UseTemplate<{
    $: import("vue").ComponentInternalInstance;
    $data: {};
    $props: {
        readonly fieldKey: string;
        readonly getCurrentValue: () => unknown;
        readonly maxColumns?: number | undefined;
        readonly gap?: number | undefined;
        readonly onSubmit?: (() => any) | undefined;
    } & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps;
    $attrs: import("vue").Attrs;
    $refs: {
        [x: string]: unknown;
    };
    $slots: Readonly<{
        [name: string]: import("vue").Slot<any> | undefined;
    }>;
    $root: import("vue").ComponentPublicInstance | null;
    $parent: import("vue").ComponentPublicInstance | null;
    $host: Element | null;
    $emit: (event: "submit") => void;
    $el: any;
    $options: import("vue").ComponentOptionsBase<Readonly<import("./GridFormTemplate.vue").Props> & Readonly<{
        onSubmit?: (() => any) | undefined;
    }>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
        submit: () => any;
    }, string, {}, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & {
        beforeCreate?: (() => void) | (() => void)[];
        created?: (() => void) | (() => void)[];
        beforeMount?: (() => void) | (() => void)[];
        mounted?: (() => void) | (() => void)[];
        beforeUpdate?: (() => void) | (() => void)[];
        updated?: (() => void) | (() => void)[];
        activated?: (() => void) | (() => void)[];
        deactivated?: (() => void) | (() => void)[];
        beforeDestroy?: (() => void) | (() => void)[];
        beforeUnmount?: (() => void) | (() => void)[];
        destroyed?: (() => void) | (() => void)[];
        unmounted?: (() => void) | (() => void)[];
        renderTracked?: ((e: import("vue").DebuggerEvent) => void) | ((e: import("vue").DebuggerEvent) => void)[];
        renderTriggered?: ((e: import("vue").DebuggerEvent) => void) | ((e: import("vue").DebuggerEvent) => void)[];
        errorCaptured?: ((err: unknown, instance: import("vue").ComponentPublicInstance | null, info: string) => boolean | void) | ((err: unknown, instance: import("vue").ComponentPublicInstance | null, info: string) => boolean | void)[];
    };
    $forceUpdate: () => void;
    $nextTick: typeof import("vue").nextTick;
    $watch<T extends string | ((...args: any) => any)>(source: T, cb: T extends (...args: any) => infer R ? (...args: [R, R, import("@vue/reactivity").OnCleanup]) => any : (...args: [any, any, import("@vue/reactivity").OnCleanup]) => any, options?: import("vue").WatchOptions): import("vue").WatchStopHandle;
} & Readonly<{}> & Omit<Readonly<import("./GridFormTemplate.vue").Props> & Readonly<{
    onSubmit?: (() => any) | undefined;
}>, never> & import("vue").ShallowUnwrapRef<{}> & {} & import("vue").ComponentCustomProperties & {} & {
    $slots: {
        formField(): any;
        submitter(): any;
    };
}, {
    fieldKey: string;
    getCurrentValue(): unknown;
} & {
    onSubmit?: (() => any) | undefined;
}>;
export declare const useGridInputTemplate: import("../../template").UseTemplate<{
    $: import("vue").ComponentInternalInstance;
    $data: {};
    $props: {
        readonly getCurrentValue: () => unknown;
        readonly columns?: number | undefined;
    } & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps;
    $attrs: import("vue").Attrs;
    $refs: {
        [x: string]: unknown;
    };
    $slots: Readonly<{
        [name: string]: import("vue").Slot<any> | undefined;
    }>;
    $root: import("vue").ComponentPublicInstance | null;
    $parent: import("vue").ComponentPublicInstance | null;
    $host: Element | null;
    $emit: (event: string, ...args: any[]) => void;
    $el: any;
    $options: import("vue").ComponentOptionsBase<Readonly<{
        getCurrentValue(): unknown;
    } & import("./types").GridTemplateLayoutProps> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, {}, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & {
        beforeCreate?: (() => void) | (() => void)[];
        created?: (() => void) | (() => void)[];
        beforeMount?: (() => void) | (() => void)[];
        mounted?: (() => void) | (() => void)[];
        beforeUpdate?: (() => void) | (() => void)[];
        updated?: (() => void) | (() => void)[];
        activated?: (() => void) | (() => void)[];
        deactivated?: (() => void) | (() => void)[];
        beforeDestroy?: (() => void) | (() => void)[];
        beforeUnmount?: (() => void) | (() => void)[];
        destroyed?: (() => void) | (() => void)[];
        unmounted?: (() => void) | (() => void)[];
        renderTracked?: ((e: import("vue").DebuggerEvent) => void) | ((e: import("vue").DebuggerEvent) => void)[];
        renderTriggered?: ((e: import("vue").DebuggerEvent) => void) | ((e: import("vue").DebuggerEvent) => void)[];
        errorCaptured?: ((err: unknown, instance: import("vue").ComponentPublicInstance | null, info: string) => boolean | void) | ((err: unknown, instance: import("vue").ComponentPublicInstance | null, info: string) => boolean | void)[];
    };
    $forceUpdate: () => void;
    $nextTick: typeof import("vue").nextTick;
    $watch<T extends string | ((...args: any) => any)>(source: T, cb: T extends (...args: any) => infer R ? (...args: [R, R, import("@vue/reactivity").OnCleanup]) => any : (...args: [any, any, import("@vue/reactivity").OnCleanup]) => any, options?: import("vue").WatchOptions): import("vue").WatchStopHandle;
} & Readonly<{}> & Omit<Readonly<{
    getCurrentValue(): unknown;
} & import("./types").GridTemplateLayoutProps> & Readonly<{}>, never> & import("vue").ShallowUnwrapRef<{}> & {} & import("vue").ComponentCustomProperties & {} & {
    $slots: {
        input(): any;
    };
}, {
    getCurrentValue(): unknown;
}>;
export declare const useGridMultiTemplate: import("../../template").UseTemplate<{
    $: import("vue").ComponentInternalInstance;
    $data: {};
    $props: {
        readonly fieldKey: string;
        readonly getCurrentValue: () => unknown;
        readonly getFormFields: () => import("vue").VNode[];
        readonly maxColumns?: number | undefined;
        readonly gap?: number | undefined;
        readonly columns?: number | undefined;
    } & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps;
    $attrs: import("vue").Attrs;
    $refs: {
        [x: string]: unknown;
    };
    $slots: Readonly<{
        [name: string]: import("vue").Slot<any> | undefined;
    }>;
    $root: import("vue").ComponentPublicInstance | null;
    $parent: import("vue").ComponentPublicInstance | null;
    $host: Element | null;
    $emit: (event: string, ...args: any[]) => void;
    $el: any;
    $options: import("vue").ComponentOptionsBase<Readonly<import("./GridMultiTemplate.vue").Props> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, {}, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & {
        beforeCreate?: (() => void) | (() => void)[];
        created?: (() => void) | (() => void)[];
        beforeMount?: (() => void) | (() => void)[];
        mounted?: (() => void) | (() => void)[];
        beforeUpdate?: (() => void) | (() => void)[];
        updated?: (() => void) | (() => void)[];
        activated?: (() => void) | (() => void)[];
        deactivated?: (() => void) | (() => void)[];
        beforeDestroy?: (() => void) | (() => void)[];
        beforeUnmount?: (() => void) | (() => void)[];
        destroyed?: (() => void) | (() => void)[];
        unmounted?: (() => void) | (() => void)[];
        renderTracked?: ((e: import("vue").DebuggerEvent) => void) | ((e: import("vue").DebuggerEvent) => void)[];
        renderTriggered?: ((e: import("vue").DebuggerEvent) => void) | ((e: import("vue").DebuggerEvent) => void)[];
        errorCaptured?: ((err: unknown, instance: import("vue").ComponentPublicInstance | null, info: string) => boolean | void) | ((err: unknown, instance: import("vue").ComponentPublicInstance | null, info: string) => boolean | void)[];
    };
    $forceUpdate: () => void;
    $nextTick: typeof import("vue").nextTick;
    $watch<T extends string | ((...args: any) => any)>(source: T, cb: T extends (...args: any) => infer R ? (...args: [R, R, import("@vue/reactivity").OnCleanup]) => any : (...args: [any, any, import("@vue/reactivity").OnCleanup]) => any, options?: import("vue").WatchOptions): import("vue").WatchStopHandle;
} & Readonly<{}> & Omit<Readonly<import("./GridMultiTemplate.vue").Props> & Readonly<{}>, never> & import("vue").ShallowUnwrapRef<{}> & {} & import("vue").ComponentCustomProperties & {} & {
    $slots: {
        formField(): any;
    };
}, {
    fieldKey: string;
    getCurrentValue(): unknown;
    getFormFields(): import("vue").VNode[];
}>;
export declare const useGridCheckTemplate: import("../../template").UseTemplate<{
    $: import("vue").ComponentInternalInstance;
    $data: {};
    $props: {
        readonly fieldKey: string;
        readonly getCurrentValue: () => unknown;
        readonly getErrorMessage: () => string | null;
        readonly maxColumns?: number | undefined;
        readonly gap?: number | undefined;
        readonly columns?: number | undefined;
        readonly label?: string | undefined;
        readonly hideEmptyMessageError?: boolean | undefined;
    } & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps;
    $attrs: import("vue").Attrs;
    $refs: {
        [x: string]: unknown;
    };
    $slots: Readonly<{
        [name: string]: import("vue").Slot<any> | undefined;
    }>;
    $root: import("vue").ComponentPublicInstance | null;
    $parent: import("vue").ComponentPublicInstance | null;
    $host: Element | null;
    $emit: (event: string, ...args: any[]) => void;
    $el: any;
    $options: import("vue").ComponentOptionsBase<Readonly<import("./GridCheckTemplate.vue").Props> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, {}, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & {
        beforeCreate?: (() => void) | (() => void)[];
        created?: (() => void) | (() => void)[];
        beforeMount?: (() => void) | (() => void)[];
        mounted?: (() => void) | (() => void)[];
        beforeUpdate?: (() => void) | (() => void)[];
        updated?: (() => void) | (() => void)[];
        activated?: (() => void) | (() => void)[];
        deactivated?: (() => void) | (() => void)[];
        beforeDestroy?: (() => void) | (() => void)[];
        beforeUnmount?: (() => void) | (() => void)[];
        destroyed?: (() => void) | (() => void)[];
        unmounted?: (() => void) | (() => void)[];
        renderTracked?: ((e: import("vue").DebuggerEvent) => void) | ((e: import("vue").DebuggerEvent) => void)[];
        renderTriggered?: ((e: import("vue").DebuggerEvent) => void) | ((e: import("vue").DebuggerEvent) => void)[];
        errorCaptured?: ((err: unknown, instance: import("vue").ComponentPublicInstance | null, info: string) => boolean | void) | ((err: unknown, instance: import("vue").ComponentPublicInstance | null, info: string) => boolean | void)[];
    };
    $forceUpdate: () => void;
    $nextTick: typeof import("vue").nextTick;
    $watch<T extends string | ((...args: any) => any)>(source: T, cb: T extends (...args: any) => infer R ? (...args: [R, R, import("@vue/reactivity").OnCleanup]) => any : (...args: [any, any, import("@vue/reactivity").OnCleanup]) => any, options?: import("vue").WatchOptions): import("vue").WatchStopHandle;
} & Readonly<{}> & Omit<Readonly<import("./GridCheckTemplate.vue").Props> & Readonly<{}>, never> & import("vue").ShallowUnwrapRef<{}> & {} & import("vue").ComponentCustomProperties & {} & {
    $slots: {
        formField(): any;
    };
}, {
    fieldKey: string;
    getCurrentValue(): unknown;
    getErrorMessage(): string | null;
}>;
export declare const useGridRepeatTemplate: import("../../template").UseTemplate<{
    $: import("vue").ComponentInternalInstance;
    $data: {};
    $props: {
        readonly fieldKey: string;
        readonly max: number;
        readonly min: number;
        readonly getCurrentValue: () => unknown;
        readonly getFormFields: () => import("vue").VNode[];
        readonly maxColumns?: number | undefined;
        readonly gap?: number | undefined;
        readonly columns?: number | undefined;
        readonly repeatElementColumn?: number | undefined;
        readonly repeatElementMaxColumn?: number | undefined;
        readonly removeButton?: (import("../..").VueComponent | (() => import("vue").VNode)) | undefined;
        readonly addButton?: (import("../..").VueComponent | (() => import("vue").VNode)) | undefined;
        readonly resetButton?: (import("../..").VueComponent | (() => import("vue").VNode)) | undefined;
        readonly onAddElement?: (() => any) | undefined;
        readonly onRemoveElement?: ((index: number) => any) | undefined;
        readonly onResetElement?: ((index: number) => any) | undefined;
    } & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps;
    $attrs: import("vue").Attrs;
    $refs: {
        [x: string]: unknown;
    };
    $slots: Readonly<{
        [name: string]: import("vue").Slot<any> | undefined;
    }>;
    $root: import("vue").ComponentPublicInstance | null;
    $parent: import("vue").ComponentPublicInstance | null;
    $host: Element | null;
    $emit: ((event: "addElement") => void) & ((event: "removeElement", index: number) => void) & ((event: "resetElement", index: number) => void);
    $el: any;
    $options: import("vue").ComponentOptionsBase<Readonly<import("./GridRepeatTemplate.vue").Props> & Readonly<{
        onAddElement?: (() => any) | undefined;
        onRemoveElement?: ((index: number) => any) | undefined;
        onResetElement?: ((index: number) => any) | undefined;
    }>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
        addElement: () => any;
        removeElement: (index: number) => any;
        resetElement: (index: number) => any;
    }, string, {
        removeButton: import("../..").VueComponent | (() => import("vue").VNode);
        addButton: import("../..").VueComponent | (() => import("vue").VNode);
        resetButton: import("../..").VueComponent | (() => import("vue").VNode);
    }, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & {
        beforeCreate?: (() => void) | (() => void)[];
        created?: (() => void) | (() => void)[];
        beforeMount?: (() => void) | (() => void)[];
        mounted?: (() => void) | (() => void)[];
        beforeUpdate?: (() => void) | (() => void)[];
        updated?: (() => void) | (() => void)[];
        activated?: (() => void) | (() => void)[];
        deactivated?: (() => void) | (() => void)[];
        beforeDestroy?: (() => void) | (() => void)[];
        beforeUnmount?: (() => void) | (() => void)[];
        destroyed?: (() => void) | (() => void)[];
        unmounted?: (() => void) | (() => void)[];
        renderTracked?: ((e: import("vue").DebuggerEvent) => void) | ((e: import("vue").DebuggerEvent) => void)[];
        renderTriggered?: ((e: import("vue").DebuggerEvent) => void) | ((e: import("vue").DebuggerEvent) => void)[];
        errorCaptured?: ((err: unknown, instance: import("vue").ComponentPublicInstance | null, info: string) => boolean | void) | ((err: unknown, instance: import("vue").ComponentPublicInstance | null, info: string) => boolean | void)[];
    };
    $forceUpdate: () => void;
    $nextTick: typeof import("vue").nextTick;
    $watch<T extends string | ((...args: any) => any)>(source: T, cb: T extends (...args: any) => infer R ? (...args: [R, R, import("@vue/reactivity").OnCleanup]) => any : (...args: [any, any, import("@vue/reactivity").OnCleanup]) => any, options?: import("vue").WatchOptions): import("vue").WatchStopHandle;
} & Readonly<{
    removeButton: import("../..").VueComponent | (() => import("vue").VNode);
    addButton: import("../..").VueComponent | (() => import("vue").VNode);
    resetButton: import("../..").VueComponent | (() => import("vue").VNode);
}> & Omit<Readonly<import("./GridRepeatTemplate.vue").Props> & Readonly<{
    onAddElement?: (() => any) | undefined;
    onRemoveElement?: ((index: number) => any) | undefined;
    onResetElement?: ((index: number) => any) | undefined;
}>, "removeButton" | "addButton" | "resetButton"> & import("vue").ShallowUnwrapRef<{}> & {} & import("vue").ComponentCustomProperties & {} & {
    $slots: {
        formField(): any;
    };
}, {
    fieldKey: string;
    max: number;
    min: number;
    getCurrentValue(): unknown;
    getFormFields(): import("vue").VNode[];
} & {
    onAddElement?: (() => any) | undefined;
    onRemoveElement?: ((index: number) => any) | undefined;
    onResetElement?: ((index: number) => any) | undefined;
}>;
export declare const useGridUnionTemplate: import("../../template").UseTemplate<{
    $: import("vue").ComponentInternalInstance;
    $data: {};
    $props: {
        readonly fieldKey: string;
        readonly kinds: string[];
        readonly getCurrentValue: () => unknown;
        readonly getCurrentKind: () => string;
        readonly maxColumns?: number | undefined;
        readonly gap?: number | undefined;
        readonly columns?: number | undefined;
        readonly labels?: Record<string, string> | undefined;
        readonly selectKind?: import("../..").VueComponent<{
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
        }> | undefined;
        readonly onChangeKind?: ((kind: string) => any) | undefined;
    } & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps;
    $attrs: import("vue").Attrs;
    $refs: {
        [x: string]: unknown;
    };
    $slots: Readonly<{
        [name: string]: import("vue").Slot<any> | undefined;
    }>;
    $root: import("vue").ComponentPublicInstance | null;
    $parent: import("vue").ComponentPublicInstance | null;
    $host: Element | null;
    $emit: (event: "changeKind", kind: string) => void;
    $el: any;
    $options: import("vue").ComponentOptionsBase<Readonly<import("./GridUnionTemplate.vue").Props> & Readonly<{
        onChangeKind?: ((kind: string) => any) | undefined;
    }>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
        changeKind: (kind: string) => any;
    }, string, {
        selectKind: import("../..").VueComponent<{
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
    }, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & {
        beforeCreate?: (() => void) | (() => void)[];
        created?: (() => void) | (() => void)[];
        beforeMount?: (() => void) | (() => void)[];
        mounted?: (() => void) | (() => void)[];
        beforeUpdate?: (() => void) | (() => void)[];
        updated?: (() => void) | (() => void)[];
        activated?: (() => void) | (() => void)[];
        deactivated?: (() => void) | (() => void)[];
        beforeDestroy?: (() => void) | (() => void)[];
        beforeUnmount?: (() => void) | (() => void)[];
        destroyed?: (() => void) | (() => void)[];
        unmounted?: (() => void) | (() => void)[];
        renderTracked?: ((e: import("vue").DebuggerEvent) => void) | ((e: import("vue").DebuggerEvent) => void)[];
        renderTriggered?: ((e: import("vue").DebuggerEvent) => void) | ((e: import("vue").DebuggerEvent) => void)[];
        errorCaptured?: ((err: unknown, instance: import("vue").ComponentPublicInstance | null, info: string) => boolean | void) | ((err: unknown, instance: import("vue").ComponentPublicInstance | null, info: string) => boolean | void)[];
    };
    $forceUpdate: () => void;
    $nextTick: typeof import("vue").nextTick;
    $watch<T extends string | ((...args: any) => any)>(source: T, cb: T extends (...args: any) => infer R ? (...args: [R, R, import("@vue/reactivity").OnCleanup]) => any : (...args: [any, any, import("@vue/reactivity").OnCleanup]) => any, options?: import("vue").WatchOptions): import("vue").WatchStopHandle;
} & Readonly<{
    selectKind: import("../..").VueComponent<{
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
}> & Omit<Readonly<import("./GridUnionTemplate.vue").Props> & Readonly<{
    onChangeKind?: ((kind: string) => any) | undefined;
}>, "selectKind"> & import("vue").ShallowUnwrapRef<{}> & {} & import("vue").ComponentCustomProperties & {} & {
    $slots: {
        formField(): any;
    };
}, {
    fieldKey: string;
    kinds: string[];
    getCurrentValue(): unknown;
    getCurrentKind(): string;
} & {
    onChangeKind?: ((kind: string) => any) | undefined;
}>;
export declare const useGridStepByStepTemplate: import("../../template").UseTemplate<{
    $: import("vue").ComponentInternalInstance;
    $data: {};
    $props: {
        readonly fieldKey: string;
        readonly stepQuantity: number;
        readonly isLastStep: () => boolean;
        readonly getFormFields: () => (() => import("vue").VNode)[];
        readonly getCurrentValue: () => unknown;
        readonly getCurrentStep: () => number;
        readonly getErrorMessageNotAtLastStep: () => null | string;
        readonly nextButton?: (import("../..").VueComponent | (() => import("vue").VNode)[]) | undefined;
        readonly previousButton?: (import("../..").VueComponent | (() => import("vue").VNode)[]) | undefined;
        readonly resetButton?: (import("../..").VueComponent | (() => import("vue").VNode)[]) | undefined;
        readonly onNextStep?: (() => any) | undefined;
        readonly onPreviousStep?: (() => any) | undefined;
        readonly onResetStep?: (() => any) | undefined;
    } & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps;
    $attrs: import("vue").Attrs;
    $refs: {
        [x: string]: unknown;
    };
    $slots: Readonly<{
        [name: string]: import("vue").Slot<any> | undefined;
    }>;
    $root: import("vue").ComponentPublicInstance | null;
    $parent: import("vue").ComponentPublicInstance | null;
    $host: Element | null;
    $emit: ((event: "nextStep") => void) & ((event: "previousStep") => void) & ((event: "resetStep") => void);
    $el: any;
    $options: import("vue").ComponentOptionsBase<Readonly<import("./GridStepByStepTemplate.vue").Props> & Readonly<{
        onNextStep?: (() => any) | undefined;
        onPreviousStep?: (() => any) | undefined;
        onResetStep?: (() => any) | undefined;
    }>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
        nextStep: () => any;
        previousStep: () => any;
        resetStep: () => any;
    }, string, {
        resetButton: import("../..").VueComponent | (() => import("vue").VNode)[];
        nextButton: import("../..").VueComponent | (() => import("vue").VNode)[];
        previousButton: import("../..").VueComponent | (() => import("vue").VNode)[];
    }, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & {
        beforeCreate?: (() => void) | (() => void)[];
        created?: (() => void) | (() => void)[];
        beforeMount?: (() => void) | (() => void)[];
        mounted?: (() => void) | (() => void)[];
        beforeUpdate?: (() => void) | (() => void)[];
        updated?: (() => void) | (() => void)[];
        activated?: (() => void) | (() => void)[];
        deactivated?: (() => void) | (() => void)[];
        beforeDestroy?: (() => void) | (() => void)[];
        beforeUnmount?: (() => void) | (() => void)[];
        destroyed?: (() => void) | (() => void)[];
        unmounted?: (() => void) | (() => void)[];
        renderTracked?: ((e: import("vue").DebuggerEvent) => void) | ((e: import("vue").DebuggerEvent) => void)[];
        renderTriggered?: ((e: import("vue").DebuggerEvent) => void) | ((e: import("vue").DebuggerEvent) => void)[];
        errorCaptured?: ((err: unknown, instance: import("vue").ComponentPublicInstance | null, info: string) => boolean | void) | ((err: unknown, instance: import("vue").ComponentPublicInstance | null, info: string) => boolean | void)[];
    };
    $forceUpdate: () => void;
    $nextTick: typeof import("vue").nextTick;
    $watch<T extends string | ((...args: any) => any)>(source: T, cb: T extends (...args: any) => infer R ? (...args: [R, R, import("@vue/reactivity").OnCleanup]) => any : (...args: [any, any, import("@vue/reactivity").OnCleanup]) => any, options?: import("vue").WatchOptions): import("vue").WatchStopHandle;
} & Readonly<{
    resetButton: import("../..").VueComponent | (() => import("vue").VNode)[];
    nextButton: import("../..").VueComponent | (() => import("vue").VNode)[];
    previousButton: import("../..").VueComponent | (() => import("vue").VNode)[];
}> & Omit<Readonly<import("./GridStepByStepTemplate.vue").Props> & Readonly<{
    onNextStep?: (() => any) | undefined;
    onPreviousStep?: (() => any) | undefined;
    onResetStep?: (() => any) | undefined;
}>, "resetButton" | "nextButton" | "previousButton"> & import("vue").ShallowUnwrapRef<{}> & {} & import("vue").ComponentCustomProperties & {} & {
    $slots: {
        formField(): any;
    };
}, {
    fieldKey: string;
    stepQuantity: number;
    isLastStep(): boolean;
    getFormFields(): (() => import("vue").VNode)[];
    getCurrentValue(): unknown;
    getCurrentStep(): number;
    getErrorMessageNotAtLastStep(): null | string;
} & {
    onNextStep?: (() => any) | undefined;
    onPreviousStep?: (() => any) | undefined;
    onResetStep?: (() => any) | undefined;
}>;
export declare const defaultGridTemplates: Templates;
