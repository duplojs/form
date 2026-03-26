import { type SimplifyTopLevel, type AnyFunction, type IsEqual, type IsExtends, type Or } from "@duplojs/utils";
import { type EmitFn } from "vue";

export interface VueComponentParams {
	props?: Record<string, unknown>;
	emits?: Record<string, AnyFunction<[string, any], any> | any[]>;
	expose?: Record<string, unknown>;
	slots?: Record<string, AnyFunction<[any]>>;
}

export type VueComponent<
	GenericParams extends VueComponentParams = {},
> = new (...args: any) => VueComponentInstance<GenericParams>;

export type VueComponentInstance<
	GenericParams extends VueComponentParams = {},
> = SimplifyTopLevel<
	& {
		$props: Or<[
			IsEqual<GenericParams["props"], unknown>,
			IsExtends<GenericParams["props"], undefined>,
		]> extends true
			? {}
			: GenericParams["props"];
		$emit: GenericParams["emits"] extends object
			? EmitFn<
				GenericParams["emits"]
			>
			: EmitFn<{}>;
		$slots: GenericParams["slots"] extends object
			? GenericParams["slots"]
			: {};
	}
	& (
		Or<[
			IsEqual<GenericParams["expose"], unknown>,
			IsExtends<GenericParams["expose"], undefined>,
		]> extends true
			? {}
			: GenericParams["expose"]
	)
>;
