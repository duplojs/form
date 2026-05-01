import { SelectInput, templateFormSelect } from "@V/designSystem";
import { useSelectInput } from "@V/designSystem/components";
import { createForm } from "@V/form";
import { testTemplates } from "@test-utils/templates";
import { mount } from "@vue/test-utils";

describe("SelectInput", () => {
	const useForm = createForm(testTemplates);

	it("renders a select input with options and chevron icon", () => {
		const wrapper = mount(SelectInput, {
			props: {
				fieldKey: "kind",
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

		const select = wrapper.get<HTMLSelectElement>("select.DFV-select-input");
		const options = wrapper.findAll<HTMLOptionElement>("option");

		expect(wrapper.get(".DFV-select-input-root").element.tagName).toBe("DIV");
		expect(select.attributes("id")).toBe("select-kind");
		expect(select.element.value).toBe("a");
		expect(options.map((option) => option.element.value)).toEqual(["a", "b"]);
		expect(options.map((option) => option.text())).toEqual(["A", "B"]);
		expect(wrapper.get("[data-dfv-icon=\"chevron-down\"]").element.tagName).toBe("svg");
	});

	it("emits the selected value", async() => {
		const wrapper = mount(SelectInput, {
			props: {
				fieldKey: "kind",
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

		await wrapper.get("select").setValue("b");

		expect(wrapper.emitted("update:modelValue")).toEqual([["b"]]);
	});

	it("templateFormSelect emits only non-null values", () => {
		const emit = vi.fn();
		const vnode = templateFormSelect(
			{
				fieldKey: "kind",
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
			{ emit } as never,
		);
		const onUpdateModelValue = vnode.props?.["onUpdate:modelValue"] as ((value: string | null) => void);

		expect(typeof onUpdateModelValue).toBe("function");

		onUpdateModelValue(null);
		expect(emit).not.toHaveBeenCalled();

		onUpdateModelValue("b");
		expect(emit).toHaveBeenCalledTimes(1);
		expect(emit).toHaveBeenCalledWith("update:modelValue", "b");
	});

	it("useSelectInput creates a form field with null default and updates current value", async() => {
		const { component, currentValue } = useForm(
			useSelectInput({
				props: {
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
			}),
		);
		const wrapper = mount(component);

		expect(currentValue.value).toBeNull();

		await wrapper.get("select").setValue("b");
		expect(currentValue.value).toBe("b");
	});
});
