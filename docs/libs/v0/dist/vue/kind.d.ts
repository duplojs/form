declare module "@duplojs/utils" {
    interface ReservedKindNamespace {
        DuplojsVueForm: true;
    }
}
export declare const createVueFormKind: <GenericName extends string, GenericKindValue extends unknown = unknown>(name: GenericName & import("@duplojs/utils/string").ForbiddenString<GenericName, "@" | "/">) => import("@duplojs/utils").KindHandler<import("@duplojs/utils").KindDefinition<`@DuplojsVueForm/${GenericName}`, GenericKindValue>>;
