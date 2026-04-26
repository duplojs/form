import { createForm, createInput, useSectionLayout } from "@V";
import { mount } from "@vue/test-utils";
import TextInput from "@test-utils/TextInput.vue";
import { testTemplates } from "@test-utils/templates";
import { templatesGrid } from "@test-utils/grid";

describe("GridSectionTemplate", () => {
	it("renders a real section layout with title, grid styles and nested field", async() => {
		const useForm = createForm(testTemplates);
		const { component, currentValue } = useForm(
			useSectionLayout(
				createInput(TextInput, {
					defaultValue: "default",
				})(),
				{
					title: "Profile",
					template: templatesGrid.useSectionTemplate({
						columns: 6,
						maxColumns: 8,
						gap: 12,
					}),
				},
			),
		);
		const wrapper = mount(component);
		const sectionTemplate = wrapper.get(".DFV-template_section");

		expect(sectionTemplate.classes()).toEqual(
			expect.arrayContaining([
				"DFV-template_section",
				"DFV-deep_FRM_SEC",
				"DFV-grid-element",
			]),
		);
		expect(sectionTemplate.attributes("style")).toContain("--DFV-grid-columns: 6");
		expect(sectionTemplate.get("label").text()).toBe("Profile");

		const container = sectionTemplate.get(".DFV-grid-container");
		expect(container.attributes("style")).toContain("--DFV-grid-max-columns: 8");
		expect(container.attributes("style")).toContain("--DFV-grid-gap: 12px");
		expect(container.get("#test-text-input").element.id).toBe("test-text-input");

		await wrapper.get("#test-text-input").setValue("updated");
		expect(currentValue.value).toBe("updated");
	});

	it("omits title and gap styles when they are not provided", () => {
		const useForm = createForm(testTemplates);
		const { component } = useForm(
			useSectionLayout(
				createInput(TextInput, {
					defaultValue: "default",
				})(),
				{
					template: templatesGrid.useSectionTemplate({
						columns: 4,
					}),
				},
			),
		);
		const wrapper = mount(component);
		const sectionTemplate = wrapper.get(".DFV-template_section");

		expect(sectionTemplate.attributes("style")).toContain("--DFV-grid-columns: 4");
		expect(sectionTemplate.find("label").exists()).toBe(false);
		expect(sectionTemplate.get(".DFV-grid-container").attributes("style") ?? "").not.toContain("--DFV-grid-gap:");
	});
});
