import { createForm, createInput } from "@V";
import { DP, sleep } from "@duplojs/utils";
import { mount } from "@vue/test-utils";
import TextInput from "@test-utils/TextInput.vue";
import { testTemplates } from "@test-utils/templates";
import { templatesGrid } from "@test-utils/grid";

describe("GridInputTemplate", () => {
	it("renders a real input field inside the grid input wrapper", async() => {
		const useForm = createForm(testTemplates);
		const { component, currentValue } = useForm(
			createInput(
				TextInput,
				{
					defaultValue: "default",
					template: templatesGrid.useInputTemplate({
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
		expect(inputTemplate.attributes("style")).toContain("--DFV-grid-columns: 4");
		expect(inputTemplate.get("#test-text-input").element.id).toBe("test-text-input");

		await wrapper.get("#test-text-input").setValue("updated");
		expect(currentValue.value).toBe("updated");
	});

	it("renders an empty error block when parser is enabled and hideEmptyMessageError is not true", () => {
		const useForm = createForm(testTemplates);
		const { component } = useForm(
			createInput(
				TextInput,
				{
					defaultValue: "41",
					template: templatesGrid.useInputTemplate(),
				},
			)({
				dataParser: DP.coerce.number({ errorMessage: "Need number" }),
			}),
		);
		const wrapper = mount(component);
		const inputTemplate = wrapper.get(".DFV-template_input");

		expect(inputTemplate.find(".DFV-grid-error").exists()).toBe(true);
		expect(inputTemplate.get(".DFV-grid-error").text()).toBe("");
	});

	it("hides empty parser error when configured and shows it on parser failure", async() => {
		const useForm = createForm(testTemplates);
		const { component, currentValue, check } = useForm(
			createInput(
				TextInput,
				{
					defaultValue: "41",
					template: templatesGrid.useInputTemplate({
						hideEmptyMessageError: true,
					}),
				},
			)({
				dataParser: DP.coerce.number({ errorMessage: "Need number" }),
			}),
		);
		const wrapper = mount(component);
		const inputTemplate = wrapper.get(".DFV-template_input");

		expect(inputTemplate.find(".DFV-grid-error").exists()).toBe(false);

		currentValue.value = "not-a-number";
		check();
		await sleep();
		expect(inputTemplate.get(".DFV-grid-error").text()).toBe("Need number");

		currentValue.value = "42";
		await sleep();
		expect(inputTemplate.find(".DFV-grid-error").exists()).toBe(false);
	});
});
