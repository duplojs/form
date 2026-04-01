import { createForm, createFormField, createInput, createTemplate, useRepeatLayout } from "@V";
import { E, sleep } from "@duplojs/utils";
import { mount } from "@vue/test-utils";
import { h } from "vue";
import TextInput from "@test-utils/TextInput.vue";
import TextInputWithErrorExpose from "@test-utils/TextInputWithErrorExpose.vue";
import TextInputWithExpose from "@test-utils/TextInputWithExpose.vue";
import RepeatTemplateAlt from "@test-utils/templates/RepeatTemplateAlt.vue";
import { testTemplates } from "@test-utils/templates";

describe("useRepeatLayout", () => {
	it("mounts with the default template and supports add remove reset min max and aggregate success", async() => {
		const useForm = createForm(testTemplates);
		const field = useRepeatLayout(
			createInput(TextInput, { defaultValue: "default" })(),
			{
				min: 1,
				max: 2,
			},
		);
		const { component, currentValue, check, reset, dispose } = useForm(field);
		const wrapper = mount(component);

		expect(field.defaultValue).toStrictEqual(["default"]);
		expect(wrapper.find("#repeat-field-key").text()).toBe("root");
		expect(wrapper.find("#repeat-current-value").text()).toBe(JSON.stringify(["default"]));
		expect(wrapper.find("#repeat-form-fields-count").text()).toBe("1");
		expect(wrapper.find("#repeat-min").text()).toBe("1");
		expect(wrapper.find("#repeat-max").text()).toBe("2");
		expect(check()).toStrictEqual(
			E.success(["default"]),
		);

		await wrapper.find("#test-text-input").setValue("first");
		expect(currentValue.value).toStrictEqual(["first"]);

		await wrapper.find("#repeat-add").trigger("click");
		await sleep();
		expect(currentValue.value).toStrictEqual(["first", "default"]);
		expect(wrapper.findAll("#test-text-input")).toHaveLength(2);
		expect(wrapper.find("#repeat-form-fields-count").text()).toBe("2");

		await wrapper.findAll("#test-text-input")[1]!.setValue("second");
		expect(check()).toStrictEqual(
			E.success(["first", "second"]),
		);

		await wrapper.find("#repeat-add").trigger("click");
		await sleep();
		expect(currentValue.value).toStrictEqual(["first", "second"]);

		await wrapper.find("#repeat-reset-1").trigger("click");
		await sleep();
		expect(currentValue.value).toStrictEqual(["first", "default"]);

		await wrapper.find("#repeat-remove-1").trigger("click");
		await sleep();
		expect(currentValue.value).toStrictEqual(["first"]);
		expect(wrapper.findAll("#test-text-input")).toHaveLength(1);

		await wrapper.find("#repeat-remove-0").trigger("click");
		await sleep();
		expect(currentValue.value).toStrictEqual(["first"]);

		reset();
		await sleep();
		expect(currentValue.value).toStrictEqual(["default"]);
		currentValue.value = [undefined as never];
		await sleep();
		expect(wrapper.find<HTMLInputElement>("#test-text-input").element.value).toBe("");
		expect(check()).toStrictEqual(
			E.success([undefined]),
		);

		dispose();
		expect(currentValue.value).toStrictEqual([undefined]);
	});

	it("supports local template override, invalid reset indexes, and aggregates child errors", async() => {
		const useForm = createForm(testTemplates);
		const localTemplate = createTemplate(RepeatTemplateAlt)();
		const field = useRepeatLayout(
			createInput(TextInputWithErrorExpose, { defaultValue: "default" })(),
			{
				min: 1,
				max: 2,
				template: localTemplate,
			},
		);
		const { component, currentValue, check, reset, dispose } = useForm(field);
		const wrapper = mount(component);

		expect(wrapper.find("#local-repeat-template").exists()).toBe(true);
		expect(wrapper.find("#local-repeat-field-key").text()).toBe("root");
		expect(wrapper.find("#local-repeat-current-value").text()).toBe(JSON.stringify(["default"]));
		expect(check()).toStrictEqual(
			E.error([{ key: "inner-field" }]),
		);

		await wrapper.find("#local-repeat-add").trigger("click");
		await sleep();
		expect(currentValue.value).toStrictEqual(["default", "default"]);

		await wrapper.find("#local-repeat-reset-invalid").trigger("click");
		await sleep();
		expect(currentValue.value).toStrictEqual(["default", "default"]);

		reset();
		await sleep();
		expect(currentValue.value).toStrictEqual(["default"]);

		dispose();
		expect(currentValue.value).toStrictEqual(["default"]);
	});

	it("defaults min to zero when omitted", () => {
		const field = useRepeatLayout(
			createInput(TextInput, { defaultValue: "default" })(),
			{
				max: 2,
			},
		);

		expect(field.defaultValue).toStrictEqual([]);
	});

	it("disposes previous repeated instances when the list size changes", async() => {
		const useForm = createForm(testTemplates);
		const field = useRepeatLayout(
			createInput(TextInputWithExpose, { defaultValue: "default" })(),
			{
				min: 1,
				max: 2,
			},
		);
		const { component, currentValue } = useForm(field);
		const wrapper = mount(component);

		await wrapper.find("#test-text-input").setValue("kept");
		expect(currentValue.value).toStrictEqual(["kept"]);

		await wrapper.find("#repeat-add").trigger("click");
		await sleep();
		expect(currentValue.value).toStrictEqual(["kept", "default"]);

		await wrapper.find("#repeat-remove-1").trigger("click");
		await sleep();
		expect(currentValue.value).toStrictEqual(["kept"]);
	});

	it("does not let cached instances mutate the array when the size changes", async() => {
		const useForm = createForm(testTemplates);
		let inactiveReadValue: unknown = undefined;
		const disposableField = createFormField(
			(modelValue: { value: string }) => ({
				check: () => E.success(modelValue.value),
				reset: () => {
					inactiveReadValue = modelValue.value;
					modelValue.value = "reset";
				},
				dispose: () => {
					modelValue.value = "disposed";
				},
				getVNode: () => h("div"),
			}),
			"default",
		);
		const field = useRepeatLayout(
			disposableField,
			{
				min: 1,
				max: 2,
			},
		);
		const { component, currentValue, reset } = useForm(field);
		const wrapper = mount(component);

		await wrapper.find("#repeat-add").trigger("click");
		await sleep();
		expect(currentValue.value).toStrictEqual(["default", "default"]);

		await wrapper.find("#repeat-remove-1").trigger("click");
		await sleep();
		expect(currentValue.value).toStrictEqual(["default"]);

		reset();
		await sleep();
		expect(currentValue.value).toStrictEqual(["default"]);
		expect(inactiveReadValue).toBe("default");
	});

	it("updates the dom when currentValue changes directly", async() => {
		const useForm = createForm(testTemplates);
		const { component, currentValue } = useForm(
			useRepeatLayout(
				createInput(TextInput, { defaultValue: "default" })(),
				{
					min: 1,
					max: 3,
				},
			),
		);
		const wrapper = mount(component);

		currentValue.value = ["first", "second"];
		await sleep();
		expect(wrapper.find("#repeat-current-value").text()).toBe(JSON.stringify(["first", "second"]));
		expect(wrapper.find("#repeat-form-fields-count").text()).toBe("2");
		const inputs = wrapper.findAll<HTMLInputElement>("#test-text-input");
		expect(inputs[0]!.element.value).toBe("first");
		expect(inputs[1]!.element.value).toBe("second");

		currentValue.value = ["only-one"];
		await sleep();
		expect(wrapper.find("#repeat-current-value").text()).toBe(JSON.stringify(["only-one"]));
		expect(wrapper.find("#repeat-form-fields-count").text()).toBe("1");
		expect(wrapper.findAll("#test-text-input")).toHaveLength(1);
		expect(wrapper.find<HTMLInputElement>("#test-text-input").element.value).toBe("only-one");
	});
});
