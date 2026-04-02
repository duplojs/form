import { createForm, createInput, createTemplate } from "@V";
import { mount } from "@vue/test-utils";
import TextInput from "@test-utils/TextInput.vue";
import { testTemplates } from "@test-utils/templates";
import { GridInputTemplate } from "@V/templates/grid";

describe("GridInputTemplate", () => {
	it("renders a real input field inside the grid input wrapper", async() => {
		const useForm = createForm(testTemplates);
		const { component, currentValue } = useForm(
			createInput(
				TextInput,
				{
					defaultValue: "default",
					template: createTemplate("input", GridInputTemplate)({
						columns: 4,
					}),
				},
			)(),
		);
		const wrapper = mount(component);
		const inputTemplate = wrapper.get(".DFV-template_input");

		expect(inputTemplate.classes()).toEqual(
			expect.arrayContaining([
				"DFV-template_input",
				"DFV-deep_form-field",
				"DFV-grid-element",
				"DFV-grid-input",
			]),
		);
		expect(inputTemplate.attributes("style")).toContain("--columns: 4");
		expect(inputTemplate.get("#test-text-input").element.id).toBe("test-text-input");

		await wrapper.get("#test-text-input").setValue("updated");
		expect(currentValue.value).toBe("updated");
	});
});
