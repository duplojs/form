import { type MayBeGetter, type AnyFunction, type SimplifyTopLevel, type Unwrap, justReturn } from "@duplojs/utils";
import * as EE from "@duplojs/utils/either";
import { createFormField, type FormFieldInstance, type FormField } from "./formField";
import { type VueComponent } from "./types";
import { h, ref } from "vue";
import { type Templates } from "@V/template";

export interface InputTemplateProperties {
	props: {
		getCurrentValue(): unknown;
	};
	slots: {
		input(): any;
	};
}
declare module "./template" {
	interface AllowedTemplateComponents {
		input: VueComponent<InputTemplateProperties>;
	}
}

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
	template?: Templates["input"];
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
	return (params: UseInputParams = {}) => {
		const defaultValue = (() => {
			if (params.defaultValue !== undefined) {
				return typeof params.defaultValue === "function"
					? params.defaultValue()
					: params.defaultValue;
			}

			return typeof defaultParams.defaultValue === "function"
				? defaultParams.defaultValue()
				: defaultParams.defaultValue;
		})();

		const getLocalProps = typeof params.props === "function"
			? params.props()
			: justReturn(params.props);

		return createFormField(
			(modelValue, key, templates) => {
				const template = params?.template ?? templates.input;

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
					componentRef.value?.dispose?.();
				};

				const getCurrentValue = () => modelValue.value;

				const inputVNode = h(
					() => h(
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
					),
				);

				const getInputVNode = () => inputVNode;

				const getVNode = () => h(
					() => template.getVNode(
						{
							getCurrentValue,
						},
						{
							input: getInputVNode,
						},
					),
				);

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
