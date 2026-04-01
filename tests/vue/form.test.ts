import { createForm, createInput, createTemplate } from "@V";
import { E, sleep } from "@duplojs/utils";
import { mount } from "@vue/test-utils";
import TextInput from "@test-utils/TextInput.vue";
import TextInputWithExpose from "@test-utils/TextInputWithExpose.vue";
import FormTemplate from "@test-utils/templates/FormTemplate.vue";
import { testTemplates } from "@test-utils/templates";

describe("form", () => {
	it("mount form with default template and sync current value with the rendered field", async() => {
		const useForm = createForm(testTemplates);
		const templateSpy = vi.spyOn(testTemplates.form, "getVNode");
		const useInput = createInput(TextInput, {
			defaultValue: "default",
		});
		const { component, currentValue, check, reset } = useForm(
			useInput(),
		);
		const wrapper = mount(
			component,
			{
				slots: {
					default: "<button id=\"submitter\">submit</button>",
				},
			},
		);

		expect(currentValue.value).toBe("default");
		expect(wrapper.find("form").exists()).toBe(true);
		expect(wrapper.find("#submitter").exists()).toBe(true);

		const dom = wrapper.find("#test-text-input");
		await dom.setValue("SuperText");

		expect(currentValue.value).toBe("SuperText");
		expect(wrapper.find("#current-value-form").text()).toBe("SuperText");
		expect(check()).toStrictEqual(
			E.success("SuperText"),
		);

		reset();
		await sleep();
		expect(currentValue.value).toBe("default");
		expect(wrapper.find("#current-value-form").text()).toBe("default");
		expect(templateSpy.mock.calls[0]?.[0].getCurrentValue()).toBe("default");
	});

	it("use local template override and delegate check reset dispose to the field instance", async() => {
		const useForm = createForm(testTemplates);
		const localTemplate = createTemplate(FormTemplate)();
		const defaultTemplateSpy = vi.spyOn(testTemplates.form, "getVNode");
		const localTemplateSpy = vi.spyOn(localTemplate, "getVNode");
		const onSubmit = vi.fn();
		const useInput = createInput(TextInputWithExpose, {
			defaultValue: "default",
		});
		const { component, currentValue, check, reset, dispose } = useForm(
			useInput(),
			{
				template: localTemplate,
			},
		);
		const wrapper = mount(
			component,
			{
				attrs: {
					onSubmit,
				},
			},
		);

		expect(localTemplateSpy).toHaveBeenCalled();
		expect(defaultTemplateSpy).not.toHaveBeenCalled();
		expect(wrapper.find("form").exists()).toBe(true);
		expect(wrapper.find("#submitter").exists()).toBe(false);

		const dom = wrapper.find("#test-text-input");
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

		await wrapper.find("form").trigger("submit");
		expect(onSubmit).toHaveBeenCalledTimes(1);
	});
});
