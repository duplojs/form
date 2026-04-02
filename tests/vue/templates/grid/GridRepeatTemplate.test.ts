import { createForm, createInput, createTemplate, useRepeatLayout } from "@V";
import { sleep } from "@duplojs/utils";
import { mount } from "@vue/test-utils";
import TextInput from "@test-utils/TextInput.vue";
import { testTemplates } from "@test-utils/templates";
import GridRepeatTemplate from "@V/templates/grid/GridRepeatTemplate.vue";

describe("GridRepeatTemplate", () => {
	it("renders a real repeat layout with grid wrappers and default design-system buttons", async() => {
		const useForm = createForm(testTemplates);
		const { component, currentValue } = useForm(
			useRepeatLayout(
				createInput(TextInput, { defaultValue: "default" })(),
				{
					min: 1,
					max: 2,
					template: createTemplate("repeat", GridRepeatTemplate)({
						columns: 8,
						maxColumns: 12,
						gap: 14,
						repeatElementColumn: 5,
						repeatElementMaxColumn: 6,
					}),
				},
			),
		);
		const wrapper = mount(component);
		const repeatTemplate = wrapper.get(".DFV-template_repeat");

		expect(repeatTemplate.classes()).toEqual(
			expect.arrayContaining([
				"DFV-template_repeat",
				"DFV-deep_form-field",
				"DFV-grid-element",
			]),
		);
		expect(repeatTemplate.attributes("style")).toContain("--columns: 8");

		const rootContainer = repeatTemplate.findAll(".DFV-grid-container")[0]!;
		expect(rootContainer.attributes("style")).toContain("--max-columns: 12");
		expect(rootContainer.attributes("style")).toContain("--gap: 14px");
		expect(repeatTemplate.findAll(".DFV-grid-repeat-element")).toHaveLength(1);
		expect(repeatTemplate.findAll("button[type=\"button\"]")).toHaveLength(3);
		expect(repeatTemplate.text()).toContain("Reset");
		expect(repeatTemplate.text()).toContain("×");
		expect(repeatTemplate.text()).toContain("+");

		await repeatTemplate.findAll("button[type=\"button\"]").at(-1)!.trigger("click");
		await sleep();
		expect(currentValue.value).toStrictEqual(["default", "default"]);
		expect(repeatTemplate.findAll(".DFV-grid-repeat-element")).toHaveLength(2);

		await repeatTemplate.findAll("#test-text-input")[1]!.setValue("second");
		expect(currentValue.value).toStrictEqual(["default", "second"]);
	});

	it("wires reset and remove actions and leaves optional styles unset when omitted", async() => {
		const useForm = createForm(testTemplates);
		const { component, currentValue } = useForm(
			useRepeatLayout(
				createInput(TextInput, { defaultValue: "default" })(),
				{
					min: 1,
					max: 2,
					template: createTemplate("repeat", GridRepeatTemplate)(),
				},
			),
		);
		const wrapper = mount(component);
		const repeatTemplate = wrapper.get(".DFV-template_repeat");

		await repeatTemplate.findAll("button[type=\"button\"]").at(-1)!.trigger("click");
		await sleep();
		await repeatTemplate.findAll("#test-text-input")[1]!.setValue("changed");
		expect(currentValue.value).toStrictEqual(["default", "changed"]);

		const secondElement = repeatTemplate.findAll(".DFV-grid-repeat-element")[1]!;
		await secondElement.findAll("button[type=\"button\"]")[0]!.trigger("click");
		await sleep();
		expect(currentValue.value).toStrictEqual(["default", "default"]);

		await secondElement.findAll("button[type=\"button\"]")[1]!.trigger("click");
		await sleep();
		expect(currentValue.value).toStrictEqual(["default"]);

		expect(repeatTemplate.attributes("style") ?? "").not.toContain("--columns:");
		expect(repeatTemplate.findAll(".DFV-grid-container")[0]!.attributes("style") ?? "").not.toContain("--gap:");
		expect(repeatTemplate.findAll(".DFV-grid-repeat-container")).toHaveLength(1);
	});
});
