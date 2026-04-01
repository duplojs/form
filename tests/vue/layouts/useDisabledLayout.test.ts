import { createForm, createInput, useDisabledLayout } from "@V";
import { E, sleep } from "@duplojs/utils";
import { mount } from "@vue/test-utils";
import TextInput from "@test-utils/TextInput.vue";
import TextInputWithExpose from "@test-utils/TextInputWithExpose.vue";
import { testTemplates } from "@test-utils/templates";
import { ref } from "vue";

describe("useDisabledLayout", () => {
	it("hide field and skip check when disabled", async() => {
		const isDisabled = ref(false);
		const useForm = createForm(testTemplates);
		const useInput = createInput(TextInput, {
			defaultValue: "default",
		});
		const field = useDisabledLayout(
			useInput(),
			{
				isDisabled: () => isDisabled.value,
			},
		);
		const { component, currentValue, check, reset, dispose } = useForm(field);
		const wrapper = mount(component);

		expect(field.defaultValue).toBe("default");
		expect(wrapper.find("#test-text-input").exists()).toBe(true);
		expect(check()).toStrictEqual(
			E.success("default"),
		);

		await wrapper.find("#test-text-input").setValue("enabled-value");
		expect(currentValue.value).toBe("enabled-value");
		expect(wrapper.find("#current-value-input").text()).toBe("enabled-value");

		isDisabled.value = true;
		await sleep();

		expect(wrapper.find("#test-text-input").exists()).toBe(false);
		expect(wrapper.find("#current-value-input").exists()).toBe(false);
		expect(check()).toStrictEqual(
			E.success(undefined),
		);

		reset();
		expect(currentValue.value).toBe("default");
		expect(() => void dispose()).not.toThrow();
	});

	it("show field again and keep delegating reset and dispose when re-enabled", async() => {
		const isDisabled = ref(true);
		const useForm = createForm(testTemplates);
		const useInput = createInput(TextInputWithExpose, {
			defaultValue: "default",
		});
		const { component, currentValue, check, reset, dispose } = useForm(
			useDisabledLayout(
				useInput(),
				{
					isDisabled: () => isDisabled.value,
				},
			),
		);
		const wrapper = mount(component);

		expect(wrapper.find("#test-text-input").exists()).toBe(false);
		expect(check()).toStrictEqual(
			E.success(undefined),
		);

		isDisabled.value = false;
		await sleep();

		const dom = wrapper.find("#test-text-input");
		expect(dom.exists()).toBe(true);

		await dom.setValue("ok");
		expect(currentValue.value).toBe("ok");
		expect(check()).toStrictEqual(
			E.success("test"),
		);

		reset();
		await sleep();
		expect(currentValue.value).toBe("reset");

		dispose();
		expect(currentValue.value).toBe("reset");
		await sleep();
		expect(wrapper.find("#text-input-with-expose-disposed").exists()).toBe(true);
	});

	it("updates the dom when currentValue changes directly", async() => {
		const isDisabled = ref(false);
		const useForm = createForm(testTemplates);
		const { component, currentValue } = useForm(
			useDisabledLayout(
				createInput(TextInput, { defaultValue: "default" })(),
				{
					isDisabled: () => isDisabled.value,
				},
			),
		);
		const wrapper = mount(component);

		currentValue.value = "from-current-value";
		await sleep();
		expect(wrapper.find<HTMLInputElement>("#test-text-input").element.value).toBe("from-current-value");
		expect(wrapper.find("#current-value-input").text()).toBe("from-current-value");

		isDisabled.value = true;
		await sleep();
		expect(wrapper.find("#test-text-input").exists()).toBe(false);

		isDisabled.value = false;
		await sleep();
		expect(wrapper.find<HTMLInputElement>("#test-text-input").element.value).toBe("from-current-value");
	});
});
