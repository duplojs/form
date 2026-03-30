import { createFormField, type FormField, type GetFormFieldCheckedValue, type GetFormFieldValue } from "@V/formField";
import { type Templates } from "@V/template";
import { type VueComponent } from "@V/types";
import { simpleClone, unwrap, type AnyTuple } from "@duplojs/utils";
import * as EE from "@duplojs/utils/either";
import { computed, effectScope, h, watch } from "vue";

export interface UnionTemplateProperties {
	props: {
		fieldKey: string;
		kinds: string[];
		getCurrentValue(): unknown;
		getCurrentKind(): string;
	};
	emits: {
		changeKind: [kind: string];
	};
	slots: {
		formField(): any;
	};
}
declare module "@V/template" {
	interface AllowedTemplateComponents {
		union: VueComponent<UnionTemplateProperties>;
	}
}

export interface UseUnionLayoutParams<
	GenericKind extends string = string,
> {
	template?: Templates["union"];
	defaultKind: GenericKind;
}

export type FormFieldUnionElement = [string, FormField];

export function useUnionLayout<
	const GenericFormFieldElements extends FormFieldUnionElement,
>(
	formFieldUnionElements: AnyTuple<GenericFormFieldElements>,
	params: UseUnionLayoutParams<GenericFormFieldElements[0]>
): FormField<
	GenericFormFieldElements extends FormFieldUnionElement
		? {
			kind: GenericFormFieldElements[0];
			value: GetFormFieldValue<GenericFormFieldElements[1]>;
		}
		: never,
	GenericFormFieldElements extends FormFieldUnionElement
		? {
			kind: GenericFormFieldElements[0];
			value: GetFormFieldCheckedValue<GenericFormFieldElements[1]>;
		}
		: never
>;

export function useUnionLayout(
	formFieldUnionElements: AnyTuple<FormFieldUnionElement>,
	params: UseUnionLayoutParams,
): FormField<
		{
			kind: string;
			value: unknown;
		},
		{
			kind: string;
			value: unknown;
		}
	> {
	const formFieldUnionMapper = Object.fromEntries(formFieldUnionElements);

	const kinds = Object.keys(formFieldUnionMapper);

	return createFormField(
		(modelValue, key, templates) => {
			const template = params?.template ?? templates.union;

			const scope = effectScope();
			const {
				formFieldInstance,
				formFieldVNode,
			} = scope.run(() => {
				watch(
					() => modelValue.value.kind,
					(kind) => {
						modelValue.value.value = simpleClone(
							formFieldUnionMapper[kind]!.defaultValue,
						);
					},
				);

				const formFieldInstance = computed(
					() => {
						const currentKind = modelValue.value.kind;

						return formFieldUnionMapper[currentKind]!.new(
							computed({
								get: () => currentKind === modelValue.value.kind
									? modelValue.value.value
									: formFieldUnionMapper[currentKind]!.defaultValue,
								set: (value) => {
									if (currentKind !== modelValue.value.kind) {
										return;
									}
									modelValue.value.value = value;
								},
							}),
							key,
							templates,
						);
					},
				);

				watch(
					formFieldInstance,
					(newValue, oldValue) => void oldValue.dispose(),
				);

				const formFieldVNode = computed(() => formFieldInstance.value.getVNode());

				return {
					formFieldInstance,
					formFieldVNode,
				};
			})!;

			const check = () => {
				const checkResult = formFieldInstance.value.check();
				if (EE.isLeft(checkResult)) {
					return checkResult;
				}

				return EE.success({
					kind: modelValue.value.kind,
					value: unwrap(checkResult),
				});
			};

			const reset = () => {
				formFieldInstance.value.reset();
			};

			const dispose = () => {
				scope.stop();
				formFieldInstance.value.dispose();
			};

			const getCurrentValue = () => modelValue.value;

			const getFieldVNode = () => formFieldVNode.value;

			const getCurrentKind = () => modelValue.value.kind;

			const onChangeKind = (value: string) => {
				if (formFieldUnionMapper[value] === undefined) {
					return;
				}

				modelValue.value.kind = value;
			};

			const getVNode = () => h(
				() => template.getVNode(
					{
						fieldKey: key,
						kinds,
						getCurrentValue,
						getCurrentKind,
						onChangeKind,
					},
					{
						formField: getFieldVNode,
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
		{
			kind: params.defaultKind,
			value: formFieldUnionMapper[params.defaultKind]!.defaultValue,
		},
	);
}
