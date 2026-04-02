import { createForm, createInput, createTemplate, useMultiLayout } from "@V";
import { E, sleep } from "@duplojs/utils";
import { mount } from "@vue/test-utils";
import TextInput from "@test-utils/TextInput.vue";
import TextInputWithExpose from "@test-utils/TextInputWithExpose.vue";
import TextInputWithErrorExpose from "@test-utils/TextInputWithErrorExpose.vue";
import MultiTemplateAlt from "@test-utils/templates/MultiTemplateAlt.vue";
import { testTemplates } from "@test-utils/templates";

describe("useMultiLayout", () => {
	it("mounts a multi field from an object wrapper and aggregates current values and checks", async() => {
		const useForm = createForm(testTemplates);
		const formField = useMultiLayout({
			first: createInput(TextInput, { defaultValue: "first-default" })(),
			second: createInput(TextInput, { defaultValue: "second-default" })(),
		});
		const { component, currentValue, check, reset, dispose } = useForm(formField);
		const wrapper = mount(component);

		expect(formField.defaultValue).toStrictEqual({
			first: "first-default",
			second: "second-default",
		});
		expect(wrapper.find("#multi-field-key").text()).toBe("form-field");
		expect(wrapper.find("#multi-current-value").text()).toBe(JSON.stringify({
			first: "first-default",
			second: "second-default",
		}));
		expect(wrapper.find("#multi-form-fields-count").text()).toBe("2");
		expect(check()).toStrictEqual(
			E.success({
				first: "first-default",
				second: "second-default",
			}),
		);

		const inputs = wrapper.findAll("#test-text-input");
		expect(inputs).toHaveLength(2);

		await inputs[0]!.setValue("first-value");
		await inputs[1]!.setValue("second-value");

		expect(currentValue.value).toStrictEqual({
			first: "first-value",
			second: "second-value",
		});
		expect(wrapper.find("#multi-current-value").text()).toBe(JSON.stringify({
			first: "first-value",
			second: "second-value",
		}));
		expect(check()).toStrictEqual(
			E.success({
				first: "first-value",
				second: "second-value",
			}),
		);

		reset();
		await sleep();
		expect(currentValue.value).toStrictEqual({
			first: "first-default",
			second: "second-default",
		});

		dispose();
		expect(currentValue.value).toStrictEqual({
			first: "first-default",
			second: "second-default",
		});
	});

	it("supports entry arrays, local template override, and aggregates child errors while preserving partial successes", async() => {
		const useForm = createForm(testTemplates);
		const localTemplate = createTemplate("multi", MultiTemplateAlt)();
		const formField = useMultiLayout(
			[
				["success", createInput(TextInputWithExpose, { defaultValue: "success-default" })()],
				["failure", createInput(TextInputWithErrorExpose, { defaultValue: "failure-default" })()],
			],
			{
				template: localTemplate,
			},
		);
		const { component, currentValue, check, reset, dispose } = useForm(formField);
		const wrapper = mount(component);

		expect(wrapper.find("#local-multi-template").exists()).toBe(true);
		expect(wrapper.find("#local-multi-field-key").text()).toBe("form-field");
		expect(wrapper.find("#local-multi-current-value").text()).toBe(JSON.stringify({
			success: "success-default",
			failure: "failure-default",
		}));

		const inputs = wrapper.findAll("#test-text-input");
		expect(inputs).toHaveLength(2);
		await inputs[0]!.setValue("ok");
		await inputs[1]!.setValue("ko");

		expect(currentValue.value).toStrictEqual({
			success: "ok",
			failure: "ko",
		});

		expect(check()).toStrictEqual(
			E.error([{ key: "inner-field" }]),
		);

		reset();
		await sleep();
		expect(currentValue.value).toStrictEqual({
			success: "reset",
			failure: "failure-default",
		});

		dispose();
		expect(currentValue.value).toStrictEqual({
			success: "reset",
			failure: "failure-default",
		});
		await sleep();
		expect(wrapper.find("#text-input-with-expose-disposed").exists()).toBe(true);
	});

	it("updates the dom when currentValue changes directly", async() => {
		const useForm = createForm(testTemplates);
		const { component, currentValue } = useForm(
			useMultiLayout({
				first: createInput(TextInput, { defaultValue: "first-default" })(),
				second: createInput(TextInput, { defaultValue: "second-default" })(),
			}),
		);
		const wrapper = mount(component);

		currentValue.value = {
			first: "first-from-current-value",
			second: "second-from-current-value",
		};
		await sleep();
		expect(wrapper.find("#multi-current-value").text()).toBe(JSON.stringify({
			first: "first-from-current-value",
			second: "second-from-current-value",
		}));
		const inputs = wrapper.findAll<HTMLInputElement>("#test-text-input");
		expect(inputs[0]!.element.value).toBe("first-from-current-value");
		expect(inputs[1]!.element.value).toBe("second-from-current-value");
	});
});
