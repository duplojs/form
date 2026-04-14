import { type SimplifyTopLevel, type Kind, type AnyFunction } from "@duplojs/utils";
import { createVueFormKind } from "./kind";
import { type VueComponent } from "./types";
import { h, normalizeClass, type VNode } from "vue";
import type * as OO from "@duplojs/utils/object";

export const templateKind = createVueFormKind("template");

type AllowedTemplateComponentInstances = InstanceType<
	AllowedTemplateComponents[keyof AllowedTemplateComponents]
>;

export type CreateTemplateParams<
	GenericInputComponentInstance extends AllowedTemplateComponentInstances = AllowedTemplateComponentInstances,
	GenericTemplateSystemProps extends object = object,
> = SimplifyTopLevel<
	& (
		SimplifyTopLevel<
			Omit<
				GenericInputComponentInstance["$props"],
				keyof GenericTemplateSystemProps
			>
		> extends infer InferredProps
			? {} extends InferredProps
				? { props?: InferredProps }
				: { props: InferredProps }
			: never
	)
>;

export interface Template<
	GenericComponentInstance extends AllowedTemplateComponentInstances = AllowedTemplateComponentInstances,
> extends Kind<typeof templateKind.definition> {
	getVNode(
		props: SimplifyTopLevel<
			& GenericComponentInstance["$props"]
			& { fieldKey: string }
			& { [key: string]: unknown }
		>,
		slots: GenericComponentInstance["$slots"]
	): VNode;
}

export type UseTemplate<
	GenericComponentInstance extends AllowedTemplateComponentInstances = AllowedTemplateComponentInstances,
	GenericTemplateSystemProps extends object = object,
> = (
	params?: Partial<
		CreateTemplateParams<
			GenericComponentInstance,
			GenericTemplateSystemProps
		>["props"]
	>
) => Template<GenericComponentInstance>;

export type GetTemplateComponentSystemProp<
	GenericComponent extends AllowedTemplateComponents[keyof AllowedTemplateComponents],
> = OO.UnionObjectToIntersection<{
	[Prop in keyof AllowedTemplateComponents]: GenericComponent extends AllowedTemplateComponents[Prop]
		? InstanceType<AllowedTemplateComponents[Prop]>["$props"]
		: never
}[keyof AllowedTemplateComponents]>;

export function createTemplate<
	GenericTemplate extends keyof AllowedTemplateComponents,
	GenericComponent extends AllowedTemplateComponents[GenericTemplate],
	GenericComponentInstance extends InstanceType<GenericComponent>,
>(
	template: GenericTemplate,
	templateComponent: GenericComponent,
	...args: CreateTemplateParams<
		GenericComponentInstance,
		GetTemplateComponentSystemProp<GenericComponent>
	> extends infer InferredParams
		? {} extends InferredParams
			? [params?: InferredParams]
			: [params: InferredParams]
		: never
): UseTemplate<
	GenericComponentInstance,
	GetTemplateComponentSystemProp<GenericComponent>
>;

export function createTemplate(
	template: string,
	templateComponent: VueComponent,
	params?: CreateTemplateParams<any, any>,
): UseTemplate {
	return (localParams) => templateKind.setTo(
		{
			getVNode: (
				props: (
					& object
					& { fieldKey: string }
				),
				slots: Record<string, AnyFunction>,
			) => h(
				templateComponent,
				{
					...params?.props,
					...localParams,
					...props,
					class: normalizeClass([
						(params?.props as any)?.class,
						(localParams as any)?.class,
						`DFV-template_${template} DFV-deep_${props.fieldKey}`,
					]),
				},
				slots,
			),
		},
	);
}

export type Templates = {
	[Prop in keyof AllowedTemplateComponents]: Template<InstanceType<AllowedTemplateComponents[Prop]>>
};
