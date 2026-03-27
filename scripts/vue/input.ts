import { type MayBeGetter, type AnyFunction, type SimplifyTopLevel, type Unwrap, justReturn } from "@duplojs/utils";
import * as EE from "@duplojs/utils/either";
import { createFormField, type FormFieldInstance, type FormField } from "./formField";
import { type VueComponent } from "./types";
import { h, ref } from "vue";

export type VueInputComponent = VueComponent<{
	props: {
		modelValue?: unknown;
	};
	emits: {
		"update:modelValue"(value: any): any;
	};
	expose: {
		check?: FormFieldInstance["check"];
		reset?: FormFieldInstance["reset"];
		dispose?: FormFieldInstance["dispose"];
	};
}>;

export type GetVueInputComponentValue<
	GenericInputComponentInstance extends InstanceType<VueInputComponent>,
> = Exclude<
	GenericInputComponentInstance["$props"]["modelValue"],
	undefined
>;

export type GetVueInputComponentProps<
	GenericInputComponentInstance extends InstanceType<VueInputComponent>,
> = Omit<
	GenericInputComponentInstance["$props"],
	"modelValue" | "onUpdate:modelValue"
>;

export type GetVueInputComponentCheckedValue<
	GenericInputComponentInstance extends InstanceType<VueInputComponent>,
> = GenericInputComponentInstance["check"] extends AnyFunction
	? Unwrap<
		Extract<
			ReturnType<
				GenericInputComponentInstance["check"]
			>,
			EE.Success
		>
	>
	: GetVueInputComponentValue<GenericInputComponentInstance>;

export type CreateInputParams<
	GenericInputComponentInstance extends InstanceType<VueInputComponent> = InstanceType<VueInputComponent>,
> = SimplifyTopLevel<
	& {
		defaultValue: (
			| Exclude<
				GetVueInputComponentValue<GenericInputComponentInstance>,
				object | AnyFunction
			>
			| (() => GetVueInputComponentValue<GenericInputComponentInstance>)
		);
	}
	& (
		GetVueInputComponentProps<
			GenericInputComponentInstance
		> extends infer InferredProps
			? {} extends InferredProps
				? { props?: InferredProps }
				: { props: InferredProps }
			: never
	)
>;

export interface UseInputParams<
	GenericInputComponentInstance extends InstanceType<VueInputComponent> = InstanceType<VueInputComponent>,
> {
	defaultValue?: (
		| Exclude<
			GetVueInputComponentValue<GenericInputComponentInstance>,
			object | AnyFunction
		>
		| (() => GetVueInputComponentValue<GenericInputComponentInstance>)
	);
	props?: MayBeGetter<
		GetVueInputComponentProps<
			GenericInputComponentInstance
		>
	>;
}

export type UseInput<
	GenericInputComponentInstance extends InstanceType<VueInputComponent> = InstanceType<VueInputComponent>,
> = (
	params?: UseInputParams<GenericInputComponentInstance>
) => FormField<
	GetVueInputComponentValue<GenericInputComponentInstance>,
	GetVueInputComponentCheckedValue<GenericInputComponentInstance>
>;

export function createInput<
	GenericInputComponent extends VueInputComponent,
	GenericInputComponentInstance extends InstanceType<GenericInputComponent>,
>(
	inputComponent: GenericInputComponent,
	defaultParams: CreateInputParams<GenericInputComponentInstance>,
): UseInput<GenericInputComponentInstance>;

export function createInput(
	inputComponent: VueInputComponent,
	defaultParams: CreateInputParams,
): UseInput {
	return (localParams: UseInputParams = {}) => {
		const defaultValue = (() => {
			if (localParams.defaultValue !== undefined) {
				return typeof localParams.defaultValue === "function"
					? localParams.defaultValue()
					: localParams.defaultValue;
			}

			return typeof defaultParams.defaultValue === "function"
				? defaultParams.defaultValue()
				: defaultParams.defaultValue;
		})();

		const getLocalProps = typeof localParams.props === "function"
			? localParams.props()
			: justReturn(localParams.props);

		return createFormField(
			(modelValue, key) => {
				const componentRef = ref<
					InstanceType<VueInputComponent> | null
				>(null);

				const check = () => {
					if (componentRef.value?.check) {
						return componentRef.value.check();
					}

					return EE.success(modelValue.value);
				};

				const reset = () => {
					componentRef.value?.reset?.();
				};

				const dispose = () => {
					console.log("dispose input");

					componentRef.value?.dispose?.();
				};

				const getVNode = () => {
					console.log("render input");

					return h(
						() => {
							console.log("inner render input");

							return h(
								inputComponent,
								{
									...defaultParams.props,
									...getLocalProps(),
									modelValue: modelValue.value,
									"onUpdate:modelValue": (value: any) => {
										modelValue.value = value;
									},
									id: key,
									key: key,
									ref: componentRef,
								},
							);
						},
					);
				};

				return {
					check,
					reset,
					dispose,
					getVNode,
				};
			},
			defaultValue,
		);
	};
}
