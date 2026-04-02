import { createForm, createInput, createTemplate, useStepLayout } from "@V";
import { E, sleep } from "@duplojs/utils";
import { mount } from "@vue/test-utils";
import TextInput from "@test-utils/TextInput.vue";
import TextInputWithErrorExpose from "@test-utils/TextInputWithErrorExpose.vue";
import TextInputWithExpose from "@test-utils/TextInputWithExpose.vue";
import StepTemplateAlt from "@test-utils/templates/StepTemplateAlt.vue";
import { testTemplates } from "@test-utils/templates";

describe("useStepLayout", () => {
	it("navigates across steps, blocks final check before last step, and resets the current step", async() => {
		const useForm = createForm(testTemplates);
		const field = useStepLayout(
			[
				createInput(TextInput, { defaultValue: "first-default" })(),
				createInput(TextInput, { defaultValue: "second-default" })(),
			] as const,
			{
				errorMessageNotAtLastStep: "Go to the end",
			},
		);
		const { component, currentValue, check, reset, dispose } = useForm(field);
		const wrapper = mount(component);

		expect(field.defaultValue).toStrictEqual({
			currentStep: 0,
			steps: ["first-default", "second-default"],
		});
		expect(wrapper.find("#step-current").text()).toBe("0/2");
		expect(wrapper.find("#step-is-last").text()).toBe("false");
		expect(wrapper.find("#step-current-value").text()).toBe(JSON.stringify({
			currentStep: 0,
			steps: ["first-default", "second-default"],
		}));
		expect(wrapper.find("#step-form-fields-count").text()).toBe("2");

		expect(check()).toStrictEqual(
			E.error([{ key: "form-field" }]),
		);
		await sleep();
		expect(wrapper.find("#step-error-message").text()).toBe("Go to the end");

		await wrapper.find("#step-previous").trigger("click");
		await sleep();
		expect(currentValue.value.currentStep).toBe(0);

		await wrapper.find("#test-text-input").setValue("first-value");
		expect(currentValue.value.steps).toStrictEqual(["first-value", "second-default"]);

		await wrapper.find("#step-next").trigger("click");
		await sleep();
		expect(currentValue.value.currentStep).toBe(1);
		expect(wrapper.find("#step-current").text()).toBe("1/2");
		expect(wrapper.find("#step-is-last").text()).toBe("true");
		expect(wrapper.find("#step-error-message").text()).toBe("");

		await wrapper.find("#step-next").trigger("click");
		await sleep();
		expect(currentValue.value.currentStep).toBe(1);

		await wrapper.find("#test-text-input").setValue("second-value");
		expect(currentValue.value.steps).toStrictEqual(["first-value", "second-value"]);
		expect(check()).toStrictEqual(
			E.success(["first-value", "second-value"]),
		);

		await wrapper.find("#step-reset").trigger("click");
		await sleep();
		expect(currentValue.value.steps).toStrictEqual(["first-value", "second-default"]);

		await wrapper.find("#step-previous").trigger("click");
		await sleep();
		expect(currentValue.value.currentStep).toBe(0);

		reset();
		await sleep();
		expect(currentValue.value.steps).toStrictEqual(["first-default", "second-default"]);

		dispose();
		expect(currentValue.value.steps).toStrictEqual(["first-default", "second-default"]);
	});

	it("uses the local template override and blocks next step when the current step check fails", async() => {
		const useForm = createForm(testTemplates);
		const localTemplate = createTemplate("step", StepTemplateAlt)();
		const field = useStepLayout(
			[
				createInput(TextInputWithErrorExpose, { defaultValue: "first-default" })(),
				createInput(TextInput, { defaultValue: "second-default" })(),
			] as const,
			{
				template: localTemplate,
				errorMessageNotAtLastStep: "Go to the end",
			},
		);
		const { component, currentValue, dispose } = useForm(field);
		const wrapper = mount(component);

		expect(wrapper.find("#local-step-template").exists()).toBe(true);
		expect(wrapper.find("#local-step-current").text()).toBe("0");

		await wrapper.find("#local-step-next").trigger("click");
		await sleep();
		expect(currentValue.value.currentStep).toBe(0);
		expect(wrapper.find("#local-step-error").text()).toBe("");

		dispose();
		expect(currentValue.value.currentStep).toBe(0);
	});

	it("returns aggregated step errors when the last step check fails", async() => {
		const useForm = createForm(testTemplates);
		const field = useStepLayout(
			[
				createInput(TextInput, { defaultValue: "first-default" })(),
				createInput(TextInputWithErrorExpose, { defaultValue: "second-default" })(),
			] as const,
			{
				errorMessageNotAtLastStep: "Go to the end",
			},
		);
		const { component, currentValue, check } = useForm(field);
		const wrapper = mount(component);

		await wrapper.find("#step-next").trigger("click");
		await sleep();
		expect(currentValue.value.currentStep).toBe(1);

		expect(check()).toStrictEqual(
			E.error([{ key: "inner-field" }]),
		);
		expect(wrapper.find("#step-error-message").text()).toBe("");
	});

	it("delegates reset and dispose to visited cached step instances", async() => {
		const useForm = createForm(testTemplates);
		const field = useStepLayout(
			[
				createInput(TextInputWithExpose, { defaultValue: "first-default" })(),
				createInput(TextInputWithExpose, { defaultValue: "second-default" })(),
			] as const,
			{
				errorMessageNotAtLastStep: "Go to the end",
			},
		);
		const { component, currentValue, reset, dispose } = useForm(field);
		const wrapper = mount(component);

		await wrapper.find("#test-text-input").setValue("first");
		await wrapper.find("#step-next").trigger("click");
		await sleep();
		await wrapper.find("#test-text-input").setValue("second");

		reset();
		await sleep();
		expect(currentValue.value.steps).toStrictEqual(["first-default", "second-default"]);

		dispose();
		await sleep();
		expect(wrapper.findAll("#text-input-with-expose-disposed")).toHaveLength(1);
	});
});
