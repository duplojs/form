import { createForm, createFormField, createInput, createTemplate, useUnionLayout } from "@V";
import { E, sleep } from "@duplojs/utils";
import { mount } from "@vue/test-utils";
import { h, ref, type Ref } from "vue";
import TextInput from "@test-utils/TextInput.vue";
import TextInputWithErrorExpose from "@test-utils/TextInputWithErrorExpose.vue";
import UnionTemplateAlt from "@test-utils/templates/UnionTemplateAlt.vue";
import { testTemplates } from "@test-utils/templates";

describe("useUnionLayout", () => {
	it("mounts with the default template, switches kind, and resets values to the selected kind default", async() => {
		const useForm = createForm(testTemplates);
		const field = useUnionLayout(
			[
				["a", createInput(TextInput, { defaultValue: "a-default" })()],
				["b", createInput(TextInput, { defaultValue: "b-default" })()],
			] as const,
			{
				defaultKind: "a",
			},
		);
		const { component, currentValue, check, reset, dispose } = useForm(field);
		const wrapper = mount(component);

		expect(field.defaultValue).toMatchObject({
			kind: "a",
			value: "a-default",
		});
		expect(typeof field.defaultValue.updateKind).toBe("function");
		expect(() => void field.defaultValue.updateKind("b")).not.toThrow();
		expect(wrapper.find("#union-field-key").text()).toBe("FRM_UNI");
		expect(wrapper.find("#union-current-kind").text()).toBe("a");
		expect(wrapper.find("#union-current-value").text()).toBe(JSON.stringify({
			kind: "a",
			value: "a-default",
		}));
		expect(check()).toStrictEqual(
			E.success({
				kind: "a",
				value: "a-default",
			}),
		);

		await wrapper.find("#test-text-input").setValue("a-value");
		expect(currentValue.value).toMatchObject({
			kind: "a",
			value: "a-value",
		});

		await wrapper.find("#union-kind-select").setValue("b");
		await sleep();
		expect(currentValue.value).toMatchObject({
			kind: "b",
			value: "b-default",
		});
		expect(wrapper.find("#union-current-kind").text()).toBe("b");

		await wrapper.find("#test-text-input").setValue("b-value");
		expect(check()).toStrictEqual(
			E.success({
				kind: "b",
				value: "b-value",
			}),
		);

		await wrapper.find("#union-kind-select").setValue("a");
		await sleep();
		expect(currentValue.value).toMatchObject({
			kind: "a",
			value: "a-value",
		});

		reset();
		expect(currentValue.value).toMatchObject({
			kind: "a",
			value: "a-default",
		});

		dispose();
		expect(currentValue.value).toMatchObject({
			kind: "a",
			value: "a-default",
		});
	});

	it("uses the local template override, ignores invalid kinds, and propagates current field errors", async() => {
		const useForm = createForm(testTemplates);
		const localTemplate = createTemplate("union", UnionTemplateAlt)();
		const field = useUnionLayout(
			[
				["a", createInput(TextInput, { defaultValue: "a-default" })()],
				["b", createInput(TextInputWithErrorExpose, { defaultValue: "b-default" })()],
			] as const,
			{
				defaultKind: "a",
				template: localTemplate,
			},
		);
		const { component, currentValue, check, dispose } = useForm(field);
		const wrapper = mount(component);

		expect(wrapper.find("#local-union-template").exists()).toBe(true);
		expect(wrapper.find("#local-union-kind").text()).toBe("a");

		await wrapper.find("#local-union-invalid-kind").trigger("click");
		await sleep();
		expect(currentValue.value).toMatchObject({
			kind: "a",
			value: "a-default",
		});

		await wrapper.find("#local-union-kind-b").trigger("click");
		await sleep();
		expect(currentValue.value).toMatchObject({
			kind: "b",
			value: "b-default",
		});

		expect(check()).toStrictEqual(
			E.error([{ key: "inner-field" }]),
		);

		dispose();
		expect(currentValue.value).toMatchObject({
			kind: "b",
			value: "b-default",
		});
	});

	it("keeps one cached instance per kind and restores the cached value when switching back", async() => {
		const useForm = createForm(testTemplates);
		let createACount = 0;
		const cachedField = createFormField(
			(modelValue: Ref<string>) => {
				createACount++;

				return {
					check: () => E.success(modelValue.value),
					reset: () => undefined,
					dispose: () => undefined,
					getVNode: () => h("div"),
				};
			},
			"a-default",
		);
		const field = useUnionLayout(
			[
				["a", cachedField],
				["b", createInput(TextInput, { defaultValue: "b-default" })()],
			] as const,
			{
				defaultKind: "a",
			},
		);
		const { component, currentValue, check } = useForm(field);
		const wrapper = mount(component);

		expect(createACount).toBe(1);
		expect(check()).toStrictEqual(
			E.success({
				kind: "a",
				value: "a-default",
			}),
		);
		expect(createACount).toBe(1);

		currentValue.value.value = "a-cached";
		await wrapper.find("#union-kind-select").setValue("b");
		await sleep();
		expect(currentValue.value).toMatchObject({
			kind: "b",
			value: "b-default",
		});

		await wrapper.find("#union-kind-select").setValue("a");
		await sleep();
		expect(currentValue.value).toMatchObject({
			kind: "a",
			value: "a-cached",
		});
		expect(createACount).toBe(1);
	});

	it("clears cached values after a full form reset", async() => {
		const useForm = createForm(testTemplates);
		const field = useUnionLayout(
			[
				["a", createInput(TextInput, { defaultValue: "a-default" })()],
				["b", createInput(TextInput, { defaultValue: "b-default" })()],
			] as const,
			{
				defaultKind: "a",
			},
		);
		const { component, currentValue, reset } = useForm(field);
		const wrapper = mount(component);

		await wrapper.find("#test-text-input").setValue("a-value");
		await wrapper.find("#union-kind-select").setValue("b");
		await sleep();
		await wrapper.find("#test-text-input").setValue("b-value");

		reset();
		await sleep();
		expect(currentValue.value).toMatchObject({
			kind: "a",
			value: "a-default",
		});

		await wrapper.find("#union-kind-select").setValue("b");
		await sleep();
		expect(currentValue.value).toMatchObject({
			kind: "b",
			value: "b-default",
		});
	});

	it("ignores reset writes from a cached inactive kind", async() => {
		let inactiveReadValue: unknown = undefined;
		const inactiveResetField = createFormField(
			(modelValue: Ref<string>) => ({
				check: () => E.success(modelValue.value),
				reset: () => {
					inactiveReadValue = modelValue.value;
					modelValue.value = "inactive-reset";
				},
				dispose: () => undefined,
				getVNode: () => h("div"),
			}),
			"b-default",
		);
		const activeField = createFormField(
			(modelValue: Ref<string>) => ({
				check: () => E.success(modelValue.value),
				reset: () => undefined,
				dispose: () => undefined,
				getVNode: () => h("div"),
			}),
			"a-default",
		);
		const field = useUnionLayout(
			[
				["a", activeField],
				["b", inactiveResetField],
			] as const,
			{
				defaultKind: "a",
			},
		);
		const modelValue = ref({
			kind: "a" as "a" | "b",
			value: "a-default",
			updateKind: (arg: string) => {},
		});
		const instance = field.new(modelValue, "root", testTemplates, () => null);

		expect(instance.check()).toStrictEqual(
			E.success({
				kind: "a",
				value: "a-default",
			}),
		);

		modelValue.value.updateKind("b");
		await sleep();
		expect(instance.check()).toStrictEqual(
			E.success({
				kind: "b",
				value: "b-default",
			}),
		);

		modelValue.value.updateKind("a");
		await sleep();
		instance.reset();
		expect(modelValue.value).toMatchObject({
			kind: "a",
			value: "a-default",
		});
		expect(inactiveReadValue).toBe("b-default");
	});

	it("updates the dom when currentValue changes directly", async() => {
		const useForm = createForm(testTemplates);
		const { component, currentValue } = useForm(
			useUnionLayout(
				[
					["a", createInput(TextInput, { defaultValue: "a-default" })()],
					["b", createInput(TextInput, { defaultValue: "b-default" })()],
				] as const,
				{
					defaultKind: "a",
				},
			),
		);
		const wrapper = mount(component);

		currentValue.value.value = "a-from-current-value";
		await sleep();
		expect(wrapper.find("#union-current-kind").text()).toBe("a");
		expect(wrapper.find("#union-current-value").text()).toBe(JSON.stringify({
			kind: "a",
			value: "a-from-current-value",
		}));
		expect(wrapper.find<HTMLInputElement>("#test-text-input").element.value).toBe("a-from-current-value");

		currentValue.value.updateKind("b", "b-from-current-value");
		await sleep();
		expect(wrapper.find("#union-current-kind").text()).toBe("b");
		expect(wrapper.find("#union-current-value").text()).toBe(JSON.stringify({
			kind: "b",
			value: "b-from-current-value",
		}));
		expect(wrapper.find<HTMLInputElement>("#test-text-input").element.value).toBe("b-from-current-value");

		currentValue.value.updateKind("a", "a-from-current-value");
		await sleep();
		expect(wrapper.find("#union-current-kind").text()).toBe("a");
		expect(wrapper.find("#union-current-value").text()).toBe(JSON.stringify({
			kind: "a",
			value: "a-from-current-value",
		}));
		expect(wrapper.find<HTMLInputElement>("#test-text-input").element.value).toBe(String(currentValue.value.value));
	});

	it("keeps the previous kind value cached when the union value is fully reassigned", async() => {
		const useForm = createForm(testTemplates);
		const { component, currentValue } = useForm(
			useUnionLayout(
				[
					["a", createInput(TextInput, { defaultValue: "a-default" })()],
					["b", createInput(TextInput, { defaultValue: "b-default" })()],
				] as const,
				{
					defaultKind: "a",
				},
			),
		);
		const wrapper = mount(component);

		currentValue.value.updateKind("a", "a-cached-before-reassign");
		await sleep();
		expect(wrapper.find<HTMLInputElement>("#test-text-input").element.value).toBe("a-cached-before-reassign");

		currentValue.value.updateKind("b", "b-from-full-reassign");
		await sleep();
		expect(wrapper.find("#union-current-kind").text()).toBe("b");
		expect(wrapper.find<HTMLInputElement>("#test-text-input").element.value).toBe("b-from-full-reassign");

		currentValue.value.updateKind("a");
		await sleep();
		expect(currentValue.value).toMatchObject({
			kind: "a",
			value: "a-cached-before-reassign",
		});
		expect(wrapper.find("#union-current-value").text()).toBe(JSON.stringify({
			kind: "a",
			value: "a-cached-before-reassign",
		}));
		expect(wrapper.find<HTMLInputElement>("#test-text-input").element.value).toBe("a-cached-before-reassign");
	});
});
