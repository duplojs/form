import { type SimplifyTopLevel, type AnyFunction, type IsEqual, type IsExtends, type Or } from "@duplojs/utils";
import { type EmitsToProps, type EmitFn } from "vue";

export interface VueComponentParams {
	props?: Record<string, unknown>;
	emits?: Record<string, AnyFunction | any[]>;
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
		$props: (
			& (
				Or<[
					IsEqual<GenericParams["props"], unknown>,
					IsExtends<GenericParams["props"], undefined>,
				]> extends true
					? {}
					: GenericParams["props"]
			)
			& (
				GenericParams["emits"] extends Record<string, unknown[]>
					? EmitsToProps<{
						[Prop in keyof GenericParams["emits"]]: (...args: GenericParams["emits"][Prop]) => void
					}>
					: GenericParams["emits"] extends object
						? EmitsToProps<
							GenericParams["emits"]
						>
						: {}
			)
		);
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
