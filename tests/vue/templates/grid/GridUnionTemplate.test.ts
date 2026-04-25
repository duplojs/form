import { createForm, createInput, useUnionLayout } from "@V";
import { sleep } from "@duplojs/utils";
import { mount } from "@vue/test-utils";
import TextInput from "@test-utils/TextInput.vue";
import { testTemplates } from "@test-utils/templates";
import { templatesGrid } from "@test-utils/grid";

describe("GridUnionTemplate", () => {
	it("renders a real union layout with the design-system select and grid container", async() => {
		const useForm = createForm(testTemplates);
		const { component, currentValue } = useForm(
			useUnionLayout(
				[
					["aa", createInput(TextInput, { defaultValue: "a-default" })()],
					["bb", createInput(TextInput, { defaultValue: "b-default" })()],
				] as const,
				{
					defaultKind: "aa",
					template: templatesGrid.useUnionTemplate({
						columns: 9,
						maxColumns: 11,
						gap: 7,
						labels: {
							aa: "Kind A",
							bb: "Kind B",
						},
					}),
				},
			),
		);
		const wrapper = mount(component);
		const unionTemplate = wrapper.get(".DFV-template_union");

		expect(unionTemplate.classes()).toEqual(
			expect.arrayContaining([
				"DFV-template_union",
				"DFV-deep_form-field",
				"DFV-grid-element",
			]),
		);
		expect(unionTemplate.attributes("style")).toContain("--DFV-grid-columns: 9");

		const select = unionTemplate.get<HTMLSelectElement>(".DFV-select-input");
		expect(select.findAll("option")).toHaveLength(2);
		expect(select.text()).toContain("Kind A");
		expect(select.text()).toContain("Kind B");

		const container = unionTemplate.get(".DFV-grid-container");
		expect(container.attributes("style")).toContain("--DFV-grid-max-columns: 11");
		expect(container.attributes("style")).toContain("--DFV-grid-gap: 7px");
		expect(unionTemplate.get("#test-text-input").element.id).toBe("test-text-input");

		await select.setValue("bb");
		await sleep();
		expect(currentValue.value.kind).toBe("bb");
		expect(currentValue.value.value).toBe("b-default");
	});

	it("falls back to raw kind labels and omits gap when not provided", () => {
		const useForm = createForm(testTemplates);
		const { component } = useForm(
			useUnionLayout(
				[
					["a", createInput(TextInput, { defaultValue: "a-default" })()],
					["b", createInput(TextInput, { defaultValue: "b-default" })()],
				] as const,
				{
					defaultKind: "a",
					template: templatesGrid.useUnionTemplate({
						columns: 4,
					}),
				},
			),
		);
		const wrapper = mount(component);
		const unionTemplate = wrapper.get(".DFV-template_union");
		const select = unionTemplate.get<HTMLSelectElement>(".DFV-select-input");

		expect(select.text()).toContain("a");
		expect(select.text()).toContain("b");
		expect(unionTemplate.get(".DFV-grid-container").attributes("style") ?? "").not.toContain("--DFV-grid-gap:");
	});
});
