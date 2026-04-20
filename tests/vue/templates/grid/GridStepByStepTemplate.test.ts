import { createForm, createInput, useStepLayout } from "@V";
import { E, sleep } from "@duplojs/utils";
import { mount } from "@vue/test-utils";
import TextInput from "@test-utils/TextInput.vue";
import { testTemplates } from "@test-utils/templates";
import { useGridStepByStepTemplate } from "@V/templates/grid";

describe("GridStepByStepTemplate", () => {
	it("renders a real step layout with the default design-system buttons", async() => {
		const useForm = createForm(testTemplates);
		const { component, currentValue, check } = useForm(
			useStepLayout(
				[
					createInput(TextInput, { defaultValue: "first-default" })(),
					createInput(TextInput, { defaultValue: "second-default" })(),
				] as const,
				{
					errorMessageNotAtLastStep: "Go to the end",
					template: useGridStepByStepTemplate(),
				},
			),
		);
		const wrapper = mount(component);
		const stepTemplate = wrapper.get(".DFV-template_step");

		expect(stepTemplate.classes()).toEqual(
			expect.arrayContaining([
				"DFV-template_step",
				"DFV-deep_form-field",
				"DFV-grid-element",
			]),
		);
		expect(stepTemplate.get(".DFV-step-indicator-meta").text()).toContain("Step 1");
		expect(stepTemplate.get(".DFV-step-indicator-meta").text()).toContain("on 2");
		expect(stepTemplate.get(".DFV-grid-container").element.className).toContain("DFV-grid-container");
		expect(stepTemplate.findAll("button[type=\"button\"]")).toHaveLength(3);
		expect(stepTemplate.text()).toContain("Previous");
		expect(stepTemplate.text()).toContain("Next");

		expect(E.isLeft(check())).toBe(true);
		await sleep();
		expect(stepTemplate.text()).toContain("Go to the end");

		await stepTemplate.findAll("button[type=\"button\"]")[2]!.trigger("click");
		await sleep();
		expect(currentValue.value.currentStep).toBe(1);
		expect(stepTemplate.get(".DFV-step-indicator-meta").text()).toContain("Step 2");
		expect(stepTemplate.get(".DFV-step-indicator-meta").text()).toContain("on 2");
	});

	it("wires previous and reset actions through the template buttons", async() => {
		const useForm = createForm(testTemplates);
		const { component, currentValue } = useForm(
			useStepLayout(
				[
					createInput(TextInput, { defaultValue: "first-default" })(),
					createInput(TextInput, { defaultValue: "second-default" })(),
				] as const,
				{
					errorMessageNotAtLastStep: "Go to the end",
					template: useGridStepByStepTemplate(),
				},
			),
		);
		const wrapper = mount(component);
		const stepTemplate = wrapper.get(".DFV-template_step");

		await stepTemplate.get("#test-text-input").setValue("first-value");
		await stepTemplate.findAll("button[type=\"button\"]")[2]!.trigger("click");
		await sleep();
		await stepTemplate.get("#test-text-input").setValue("second-value");

		await stepTemplate.findAll("button[type=\"button\"]")[1]!.trigger("click");
		await sleep();
		expect(currentValue.value.steps).toStrictEqual(["first-value", "second-default"]);

		await stepTemplate.findAll("button[type=\"button\"]")[0]!.trigger("click");
		await sleep();
		expect(currentValue.value.currentStep).toBe(0);
	});

	it("one step", () => {
		const useForm = createForm(testTemplates);
		const { component } = useForm(
			useStepLayout(
				[createInput(TextInput, { defaultValue: "only-step" })()],
				{
					template: useGridStepByStepTemplate(),
					errorMessageNotAtLastStep: "",
				},
			),
		);
		const wrapper = mount(component);
		const stepTemplate = wrapper.get(".DFV-template_step");

		expect(stepTemplate.get(".DFV-step-indicator-meta").text()).toContain("Step 1");
		expect(stepTemplate.get(".DFV-step-indicator-meta").text()).toContain("on 1");
		expect(stepTemplate.get(".DFV-step-indicator-fill").attributes("style")).toContain("width: 100%");
		expect(stepTemplate.find(".DFV-step-error").exists()).toBe(false);
	});
});
