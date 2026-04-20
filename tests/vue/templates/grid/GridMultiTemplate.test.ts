import { createForm, createInput, createTemplate, useMultiLayout } from "@V";
import { mount } from "@vue/test-utils";
import TextInput from "@test-utils/TextInput.vue";
import { testTemplates } from "@test-utils/templates";
import { GridMultiTemplate } from "@V/templates/grid";
describe("GridMultiTemplate", () => {
	it("renders a real multi layout inside the grid container with layout styles", async() => {
		const useForm = createForm(testTemplates);
		const { component, currentValue } = useForm(
			useMultiLayout(
				{
					first: createInput(TextInput, { defaultValue: "first-default" })(),
					second: createInput(TextInput, { defaultValue: "second-default" })(),
				},
				{
					template: createTemplate("multi", GridMultiTemplate)({
						columns: 7,
						maxColumns: 10,
						gap: 9,
					}),
				},
			),
		);
		const wrapper = mount(component);
		const multiTemplate = wrapper.get(".DFV-template_multi");

		expect(multiTemplate.classes()).toEqual(
			expect.arrayContaining([
				"DFV-template_multi",
				"DFV-deep_form-field",
				"DFV-grid-container",
				"DFV-grid-element",
			]),
		);
		expect(multiTemplate.attributes("style")).toContain("--DFV-grid-columns: 7");
		expect(multiTemplate.attributes("style")).toContain("--DFV-grid-max-columns: 10");
		expect(multiTemplate.attributes("style")).toContain("--DFV-grid-gap: 9px");
		expect(multiTemplate.findAll("#test-text-input")).toHaveLength(2);

		await multiTemplate.findAll("#test-text-input")[0]!.setValue("first-value");
		await multiTemplate.findAll("#test-text-input")[1]!.setValue("second-value");
		expect(currentValue.value).toStrictEqual({
			first: "first-value",
			second: "second-value",
		});
	});

	it("omits the gap style when no gap is provided", () => {
		const useForm = createForm(testTemplates);
		const { component } = useForm(
			useMultiLayout(
				{
					first: createInput(TextInput, { defaultValue: "first-default" })(),
				},
				{
					template: createTemplate("multi", GridMultiTemplate)({
						columns: 3,
					}),
				},
			),
		);
		const wrapper = mount(component);
		const multiTemplate = wrapper.get(".DFV-template_multi");

		expect(multiTemplate.attributes("style")).toContain("--DFV-grid-columns: 3");
		expect(multiTemplate.attributes("style")).not.toContain("--DFV-grid-gap:");
	});
});
