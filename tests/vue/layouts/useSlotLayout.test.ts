import { createForm, createInput, useSlotLayout } from "@V";
import { E, sleep } from "@duplojs/utils";
import { mount } from "@vue/test-utils";
import TextInput from "@test-utils/TextInput.vue";
import TextInputWithExpose from "@test-utils/TextInputWithExpose.vue";
import { testTemplates } from "@test-utils/templates";
import { h } from "vue";

describe("useSlotLayout", () => {
	it("delegates check/reset/dispose to inner form field and exposes slot params", async() => {
		const useForm = createForm(testTemplates);
		const field = useSlotLayout(
			"content",
			createInput(TextInputWithExpose, { defaultValue: "default" })(),
		);
		const { component, currentValue, check, reset, dispose } = useForm(field);
		const wrapper = mount(component, {
			slots: {
				content: (params) => h(
					"div",
					[
						h("small", { id: "slot-field-key" }, params.fieldKey),
						h("small", { id: "slot-value" }, String(params.value)),
						h(
							"button",
							{
								id: "slot-update",
								onClick: () => void params.update("slot-updated"),
							},
							"update",
						),
						params.formField(),
					],
				),
			},
		});

		expect(field.defaultValue).toBe("default");
		expect(wrapper.find("#slot-field-key").text()).toBe("FRM_SLT");
		expect(wrapper.find("#slot-value").text()).toBe("default");
		expect(wrapper.find("#test-text-input").exists()).toBe(true);
		expect(check()).toStrictEqual(E.success("test"));

		await wrapper.find("#slot-update").trigger("click");
		await sleep();
		expect(currentValue.value).toBe("slot-updated");
		expect(wrapper.find<HTMLInputElement>("#test-text-input").element.value).toBe("slot-updated");

		await wrapper.find("#test-text-input").setValue("typed-value");
		expect(currentValue.value).toBe("typed-value");

		reset();
		await sleep();
		expect(currentValue.value).toBe("reset");

		dispose();
		await sleep();
		expect(wrapper.find("#text-input-with-expose-disposed").exists()).toBe(true);
	});

	it("supports standalone slot field with defaultValue", async() => {
		const useForm = createForm(testTemplates);
		const field = useSlotLayout(
			"custom",
			{ defaultValue: "custom-default" as string },
		);
		const { component, currentValue, check, reset, dispose } = useForm(field);
		const wrapper = mount(component, {
			slots: {
				custom: (params) => h(
					"div",
					[
						h("small", { id: "custom-field-key" }, params.fieldKey),
						h("small", { id: "custom-value" }, String(params.value)),
						h(
							"button",
							{
								id: "custom-update",
								onClick: () => void params.update("custom-updated"),
							},
							"update",
						),
					],
				),
			},
		});

		expect(field.defaultValue).toBe("custom-default");
		expect(wrapper.find("#custom-field-key").text()).toBe("FRM_SLT");
		expect(wrapper.find("#custom-value").text()).toBe("custom-default");
		expect(check()).toStrictEqual(E.success("custom-default"));

		await wrapper.find("#custom-update").trigger("click");
		await sleep();
		expect(currentValue.value).toBe("custom-updated");
		expect(check()).toStrictEqual(E.success("custom-updated"));

		reset();
		expect(currentValue.value).toBe("custom-default");
		expect(() => void dispose()).not.toThrow();
	});

	it("supports standalone slot field with function defaultValue", () => {
		const useForm = createForm(testTemplates);
		const getDefaultValue = vi.fn(() => "custom-default-fn");
		const field = useSlotLayout(
			"custom",
			{ defaultValue: getDefaultValue },
		);
		const { component, currentValue, check } = useForm(field);
		const wrapper = mount(component, {
			slots: {
				custom: (params) => h("small", { id: "custom-fn-value" }, String(params.value)),
			},
		});

		expect(getDefaultValue).toHaveBeenCalledTimes(1);
		expect(field.defaultValue).toBe("custom-default-fn");
		expect(currentValue.value).toBe("custom-default-fn");
		expect(wrapper.find("#custom-fn-value").text()).toBe("custom-default-fn");
		expect(check()).toStrictEqual(E.success("custom-default-fn"));
	});

	it("updates slot output when currentValue changes directly", async() => {
		const useForm = createForm(testTemplates);
		const { component, currentValue } = useForm(
			useSlotLayout(
				"content",
				createInput(TextInput, { defaultValue: "default" })(),
			),
		);
		const wrapper = mount(component, {
			slots: {
				content: (params) => h(
					"div",
					[
						h("small", { id: "slot-direct-value" }, String(params.value)),
						params.formField(),
					],
				),
			},
		});

		currentValue.value = "from-current-value";
		await sleep();
		expect(wrapper.find("#slot-direct-value").text()).toBe("from-current-value");
		expect(wrapper.find<HTMLInputElement>("#test-text-input").element.value).toBe("from-current-value");
	});
});
