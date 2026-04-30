import { type MayBeGetter, type AnyFunction, type SimplifyTopLevel, type Unwrap, type IsEqual, unwrap } from "@duplojs/utils";
import type * as DP from "@duplojs/utils/dataParser";
import * as EE from "@duplojs/utils/either";
import { createFormField, type FormFieldInstance, type FormField } from "./formField";
import { type VueComponent } from "./types";
import { effectScope, h, ref, watch } from "vue";
import { type Templates } from "@V/template";

export interface InputTemplateProperties {
	props: {
		getLabel?(): string;
		getCurrentValue(): unknown;
		getErrorMessage?(): string | null;
		fieldKey: string;
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

export interface ExposeInputProperties {
	check?: FormFieldInstance["check"];
	reset?: FormFieldInstance["reset"];
	dispose?: FormFieldInstance["dispose"];
}

export type VueInputComponent = VueComponent<{
	props: {
		modelValue?: unknown;
	};
	emits: {
		"update:modelValue"(value: any): any;
	};
	expose: ExposeInputProperties;
}>;

export type GetVueInputComponentValue<
	GenericInputComponentInstance extends InstanceType<VueInputComponent>,
> = Exclude<
	GenericInputComponentInstance["$props"]["modelValue"],
	undefined
>;

export type GetVueInputComponentProps<
	GenericInputComponentInstance extends InstanceType<VueInputComponent>,
> = SimplifyTopLevel<
	Omit<
		GenericInputComponentInstance["$props"],
		"modelValue" | "onUpdate:modelValue" | "id" | "ref" | "key"
	>
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
		template?: Templates["input"];
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
	GenericDataParser extends DP.DataParser = DP.DataParser,
> {
	label?: MayBeGetter<string>;
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
	dataParser?: GenericDataParser;
	class?: string;
	template?: Templates["input"];
}

export type UseInput<
	GenericInputComponentInstance extends InstanceType<VueInputComponent> = InstanceType<VueInputComponent>,
> = <
	GenericDataParser extends DP.DataParser = never,
>(
	params?: UseInputParams<
		GenericInputComponentInstance,
		GenericDataParser
	>
) => FormField<
	GetVueInputComponentValue<GenericInputComponentInstance>,
	IsEqual<GenericDataParser, never> extends true
		? GetVueInputComponentCheckedValue<GenericInputComponentInstance>
		: DP.Output<GenericDataParser>,
	{}
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
			? params.props
			: () => params.props;

		const preparedLabel = params.label;
		const getLabel = typeof preparedLabel === "string"
			? () => preparedLabel
			: preparedLabel;

		return createFormField(
			(modelValue, parentKey, templates) => {
				const key = `${parentKey}_INP`;
				const template = params?.template ?? defaultParams.template ?? templates.input;
				let isDispose = false;

				const componentRef = ref<
					InstanceType<VueInputComponent> | null
				>(null);

				const scope = effectScope();
				const { errorMessage } = scope.run(() => {
					const errorMessage = ref<null | string>(null);

					watch(
						modelValue,
						() => {
							if (errorMessage.value !== null) {
								check();
							}
						},
						{ flush: "post" },
					);

					return {
						errorMessage,
					};
				})!;

				const check = () => {
					const result = componentRef.value?.check?.() || EE.success(modelValue.value);

					if (params.dataParser === undefined || EE.isLeft(result)) {
						return result;
					}

					const value = unwrap(result);

					const parserResult = params.dataParser.parse(value);

					if (EE.isLeft(parserResult)) {
						const dataParserError = unwrap(parserResult);
						errorMessage.value = dataParserError.issues[0]?.message ?? "Error";

						return EE.error(
							[
								{
									key,
									dataParserError,
								},
							] as const,
						);
					}

					errorMessage.value = null;

					return parserResult;
				};

				const reset = () => {
					componentRef.value?.reset?.();
					errorMessage.value = null;
				};

				const dispose = () => {
					scope.stop();
					isDispose = true;
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
								if (isDispose) {
									return;
								}

								modelValue.value = value;
							},
							id: key,
							key,
							ref: componentRef,
						},
					),
				);

				const getInputVNode = () => inputVNode;

				const getErrorMessage = params.dataParser && (() => errorMessage.value);

				const getVNode = () => h(
					() => template.getVNode(
						{
							getLabel,
							fieldKey: key,
							getCurrentValue,
							getErrorMessage,
							class: params.class,
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
