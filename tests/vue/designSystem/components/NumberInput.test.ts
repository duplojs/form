import { NumberInput } from "@V/designSystem";
import { useNumberInput } from "@V/designSystem/components";
import { createForm } from "@V/form";
import { testTemplates } from "@test-utils/templates";
import { mount } from "@vue/test-utils";

describe("NumberInput", () => {
	const useForm = createForm(testTemplates);

	it("renders a number input with value, placeholder, and constraints", () => {
		const wrapper = mount(NumberInput, {
			props: {
				modelValue: 5,
				placeholder: "Quantity",
				min: 1,
				max: 10,
				step: 2,
			},
		});

		const input = wrapper.get<HTMLInputElement>("input.DFV-number-input");

		expect(input.attributes("type")).toBe("number");
		expect(input.element.value).toBe("5");
		expect(input.attributes("placeholder")).toBe("Quantity");
		expect(input.attributes("min")).toBe("1");
		expect(input.attributes("max")).toBe("10");
		expect(input.attributes("step")).toBe("2");
	});

	it("emits a number when the input value changes", async() => {
		const wrapper = mount(NumberInput, {
			props: {
				modelValue: 5,
			},
		});

		await wrapper.get("input").setValue("12");

		expect(wrapper.emitted("update:modelValue")).toEqual([[12]]);
		expect(wrapper.get<HTMLInputElement>("input").element.value).toBe("12");
	});

	it("emits min value when the input is cleared and min is provided", async() => {
		const wrapper = mount(NumberInput, {
			props: {
				modelValue: 5,
				min: 3,
			},
		});

		await wrapper.get("input").setValue("");

		expect(wrapper.emitted("update:modelValue")).toEqual([[3]]);
		expect(wrapper.get<HTMLInputElement>("input").element.value).toBe("3");
	});

	it("emits zero when the input is cleared without min", async() => {
		const wrapper = mount(NumberInput, {
			props: {
				modelValue: 5,
			},
		});

		await wrapper.get("input").setValue("");

		expect(wrapper.emitted("update:modelValue")).toEqual([[0]]);
		expect(wrapper.get<HTMLInputElement>("input").element.value).toBe("0");
	});

	it("useNumberInput creates a form field with zero as default", () => {
		const { currentValue } = useForm(useNumberInput());

		expect(currentValue.value).toBe(0);
	});
});
