import { RadioGroup } from "@V/designSystem";
import { useRadioGroup } from "@V/designSystem/components";
import { createForm } from "@V/form";
import { testTemplates } from "@test-utils/templates";
import { mount } from "@vue/test-utils";

describe("RadioGroup", () => {
	const useForm = createForm(testTemplates);

	it("renders radio options with labels and descriptions", () => {
		const wrapper = mount(RadioGroup, {
			props: {
				name: "choice",
				modelValue: "a",
				options: [
					{
						value: "a",
						label: "A",
						description: "First option",
					},
					{
						value: "b",
						label: "B",
					},
				],
			},
		});

		const inputs = wrapper.findAll<HTMLInputElement>("input.DFV-radio-input");

		expect(wrapper.get(".DFV-radio-group").attributes("role")).toBe("radiogroup");
		expect(inputs).toHaveLength(2);
		expect(inputs[0]!.attributes("id")).toBe("choice-0");
		expect(inputs[0]!.attributes("name")).toBe("choice");
		expect(inputs[0]!.element.checked).toBe(true);
		expect(inputs[1]!.attributes("id")).toBe("choice-1");
		expect(wrapper.findAll(".DFV-radio-label").map((label) => label.text())).toEqual(["A", "B"]);
		expect(wrapper.get(".DFV-radio-description").text()).toBe("First option");
	});

	it("emits the selected option value", async() => {
		const wrapper = mount(RadioGroup, {
			props: {
				name: "choice",
				modelValue: "a",
				options: [
					{
						value: "a",
						label: "A",
					},
					{
						value: "b",
						label: "B",
					},
				],
			},
		});

		await wrapper.findAll("input.DFV-radio-input")[1]!.setValue();

		expect(wrapper.emitted("update:modelValue")).toEqual([["b"]]);
	});

	it("useRadioGroup creates a form field with null default and accepts options from props", () => {
		const { component, currentValue } = useForm(
			useRadioGroup({
				props: {
					options: [
						{
							value: "a",
							label: "A",
						},
					],
				},
			}),
		);
		const wrapper = mount(component);

		expect(currentValue.value).toBeNull();
		expect(wrapper.get("input.DFV-radio-input").attributes("value")).toBe("a");
	});
});
