import { createFormField, type FormFieldInstance, type FormField, type GetFormFieldCheckedValue, type GetFormFieldValue } from "@V/formField";
import { type Templates } from "@V/template";
import { type VueComponent } from "@V/types";
import { simpleClone, unwrap, type AnyTuple } from "@duplojs/utils";
import * as EE from "@duplojs/utils/either";
import { computed, effectScope, h, type VNode, watch } from "vue";

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

			let skipNextWatch = false;
			let cacheValue: Record<string, unknown> = {};
			const cacheFormFields: Record<string, FormFieldInstance> = {};
			const scope = effectScope();
			const {
				formFieldInstances,
			} = scope.run(() => {
				watch(
					() => modelValue.value.kind,
					(kind, oldKind) => {
						if (skipNextWatch === true) {
							skipNextWatch = false;
							return;
						}

						cacheValue[oldKind] = modelValue.value.value;

						modelValue.value.value = kind in cacheValue
							? cacheValue[kind]
							: simpleClone(
								formFieldUnionMapper[kind]!.defaultValue,
							);
					},
				);

				const formFieldInstances = Object.fromEntries(
					formFieldUnionElements
						.map(
							([kind, formField]) => [
								kind,
								() => {
									if (cacheFormFields[kind] === undefined) {
										cacheFormFields[kind] = formField.new(
											computed({
												get: () => kind === modelValue.value.kind
													? modelValue.value.value
													: formFieldUnionMapper[kind]!.defaultValue,
												set: (value) => {
													if (kind !== modelValue.value.kind) {
														return;
													}
													modelValue.value.value = value;
												},
											}),
											key,
											templates,
										);
									}

									return cacheFormFields[kind];
								},
							],
						),
				);

				return {
					formFieldInstances,
				};
			})!;

			const check = () => {
				const checkResult = formFieldInstances[modelValue.value.kind]!().check();
				if (EE.isLeft(checkResult)) {
					return checkResult;
				}

				return EE.success({
					kind: modelValue.value.kind,
					value: unwrap(checkResult),
				});
			};

			const reset = () => {
				cacheValue = {};
				skipNextWatch = true;
				Object.entries(cacheFormFields).forEach(
					([, formFieldInstance]) => void formFieldInstance.reset(),
				);
			};

			const dispose = () => {
				scope.stop();
				Object.entries(cacheFormFields).forEach(
					([, formFieldInstance]) => void formFieldInstance.dispose(),
				);
			};

			const getCurrentValue = () => modelValue.value;

			const cacheFormFieldVNodes: Record<string, VNode> = {};
			const formFieldVNodes = Object.fromEntries(
				Object
					.entries(formFieldInstances)
					.map(
						([kind, getFormFieldInstance]) => [
							kind,
							() => {
								if (cacheFormFieldVNodes[kind] === undefined) {
									cacheFormFieldVNodes[kind] = getFormFieldInstance().getVNode();
								}

								return cacheFormFieldVNodes[kind];
							},
						],
					),
			);

			const getFieldVNode = () => formFieldVNodes[modelValue.value.kind]!();

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
