import { createForm, createInput, useCheckLayout } from "@V";
import { DP, sleep } from "@duplojs/utils";
import { mount } from "@vue/test-utils";
import TextInput from "@test-utils/TextInput.vue";
import { testTemplates } from "@test-utils/templates";
import { templatesGrid } from "@test-utils/grid";

describe("GridCheckTemplate", () => {
	it("renders the grid check template inside a real form with the expected classes, styles and parser error", async() => {
		const useForm = createForm(testTemplates);
		const { component, check, currentValue } = useForm(
			useCheckLayout(
				createInput(TextInput, {
					defaultValue: "default",
				})(),
				{
					template: templatesGrid.useCheckTemplate({
						columns: 6,
						maxColumns: 8,
						gap: 12,
					}),
					dataParser: DP.coerce.number({ errorMessage: "Need number" }),
				},
			),
		);
		const wrapper = mount(component);
		const checkTemplate = wrapper.get(".DFV-template_check");

		expect(checkTemplate.classes()).toEqual(
			expect.arrayContaining([
				"DFV-template_check",
				"DFV-deep_form-field",
				"DFV-grid-element",
			]),
		);
		expect(checkTemplate.attributes("style")).toContain("--DFV-grid-columns: 6");

		const container = checkTemplate.get(".DFV-grid-container");
		expect(container.attributes("style")).toContain("--DFV-grid-max-columns: 8");
		expect(container.attributes("style")).toContain("--DFV-grid-gap: 12px");
		expect(container.get("input").attributes("id")).toBe("test-text-input");

		const error = checkTemplate.get(".DFV-grid-error");
		expect(error.text()).toBe("");

		expect(currentValue.value).toBe("default");
		check();
		await sleep();
		expect(checkTemplate.get(".DFV-grid-error").text()).toBe("Need number");
	});

	it("hides the empty error block when configured and shows it again on a real parser error", async() => {
		const useForm = createForm(testTemplates);
		const { component, currentValue, check } = useForm(
			useCheckLayout(
				createInput(TextInput, {
					defaultValue: "41",
				})(),
				{
					template: templatesGrid.useCheckTemplate({
						hideEmptyMessageError: true,
					}),
					dataParser: DP.coerce.number({ errorMessage: "Need number" }),
				},
			),
		);
		const wrapper = mount(component);
		const checkTemplate = wrapper.get(".DFV-template_check");

		expect(checkTemplate.find("label").exists()).toBe(false);
		expect(checkTemplate.find(".DFV-grid-error").exists()).toBe(false);

		currentValue.value = "not-a-number";
		check();
		await sleep();
		expect(checkTemplate.get(".DFV-grid-error").text()).toBe("Need number");

		currentValue.value = "42";
		await sleep();
		expect(checkTemplate.find(".DFV-grid-error").exists()).toBe(false);
	});
});
