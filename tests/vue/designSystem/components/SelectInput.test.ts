import { SelectInput } from "@V/designSystem";
import { mount } from "@vue/test-utils";

describe("SelectInput", () => {
	it("renders a select input with options and chevron icon", () => {
		const wrapper = mount(SelectInput, {
			props: {
				fieldKey: "kind",
				modelValue: "a",
				options: [
					{ value: "a", label: "A" },
					{ value: "b", label: "B" },
				],
			},
		});

		const select = wrapper.get<HTMLSelectElement>("select.DFV-select-input");
		const options = wrapper.findAll<HTMLOptionElement>("option");

		expect(wrapper.get(".DFV-select-input-root").element.tagName).toBe("DIV");
		expect(select.attributes("id")).toBe("select-kind");
		expect(select.element.value).toBe("a");
		expect(options.map((option) => option.element.value)).toEqual(["a", "b"]);
		expect(options.map((option) => option.text())).toEqual(["A", "B"]);
		expect(wrapper.get('[data-dfv-icon="chevron-down"]').element.tagName).toBe("svg");
	});

	it("emits the selected value", async() => {
		const wrapper = mount(SelectInput, {
			props: {
				fieldKey: "kind",
				modelValue: "a",
				options: [
					{ value: "a", label: "A" },
					{ value: "b", label: "B" },
				],
			},
		});

		await wrapper.get("select").setValue("b");

		expect(wrapper.emitted("update:modelValue")).toEqual([["b"]]);
	});
});
