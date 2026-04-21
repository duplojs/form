import {
	useCheckBoxInput, useCheckBoxPolicyInput, useDateInput, useDualRangeInput, useFileInput,
	useNumberInput, useRadioGroupInput, useRangeDateInput, useRangeInput, useRangeTimeInput,
	useTextareaInput, useTextInput, useTimeInput,
} from "@V/designSystem";
import { createForm } from "@V/form";
import { mount } from "@vue/test-utils";
import { testTemplates } from "@test-utils/templates";

const useForm = createForm(testTemplates);

describe("designSystem", () => {
	it("uses TextInput", () => {
		const { component, currentValue } = useForm(useTextInput());
		const wrapper = mount(component);

		expect(currentValue.value).toBe("");
		expect(wrapper.get("input.DFV-text-input").element.tagName).toBe("INPUT");
	});

	it("uses NumberInput", () => {
		const { component, currentValue } = useForm(useNumberInput());
		const wrapper = mount(component);

		expect(currentValue.value).toBe(0);
		expect(wrapper.get("input.DFV-number-input").element.tagName).toBe("INPUT");
	});

	it("uses TheCheckbox", () => {
		const { component, currentValue } = useForm(
			useCheckBoxInput({
				props: {
					name: "accepted",
				},
			}),
		);
		const wrapper = mount(component);

		expect(currentValue.value).toBe(false);
		expect(wrapper.get("input.DFV-checkbox-input").attributes("name")).toBe("accepted");
	});

	it("uses CheckboxPolicy", () => {
		const { component, currentValue } = useForm(
			useCheckBoxPolicyInput({
				props: {
					title: "Policy",
				},
			}),
		);
		const wrapper = mount(component);

		expect(currentValue.value).toBe(false);
		expect(wrapper.get(".DFV-checkbox-policy-title").text()).toContain("Policy");
	});

	it("uses DateInput", () => {
		const { component, currentValue } = useForm(useDateInput());
		const wrapper = mount(component);

		expect(currentValue.value).toBeNull();
		expect(wrapper.get("input.DFV-date-input").attributes("type")).toBe("date");
	});

	it("uses RangeDateInput", () => {
		const { component, currentValue } = useForm(useRangeDateInput());
		const wrapper = mount(component);

		expect(currentValue.value).toEqual({
			to: null,
			from: null,
		});
		expect(wrapper.findAll("input.DFV-date-input")).toHaveLength(2);
	});

	it("uses TextareaInput", () => {
		const { component, currentValue } = useForm(useTextareaInput());
		const wrapper = mount(component);

		expect(currentValue.value).toBe("");
		expect(wrapper.get("textarea.DFV-text-area").element.tagName).toBe("TEXTAREA");
	});

	it("uses TimeInput", () => {
		const { component, currentValue } = useForm(useTimeInput());
		const wrapper = mount(component);

		expect(currentValue.value).toBeNull();
		expect(wrapper.get("input.DFV-time-input").attributes("type")).toBe("time");
	});

	it("uses RangeTimeInput", () => {
		const { component, currentValue } = useForm(useRangeTimeInput());
		const wrapper = mount(component);

		expect(currentValue.value).toEqual({
			to: null,
			from: null,
		});
		expect(wrapper.findAll("input.DFV-time-input")).toHaveLength(2);
	});

	it("uses FileInput", () => {
		const { component, currentValue } = useForm(useFileInput());
		const wrapper = mount(component);

		expect(currentValue.value).toBeNull();
		expect(wrapper.get("input.DFV-file-input").attributes("type")).toBe("file");
	});

	it("uses RadioGroup", () => {
		const { component, currentValue } = useForm(
			useRadioGroupInput({
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
		expect(wrapper.get(".DFV-radio-group").attributes("role")).toBe("radiogroup");
		expect(wrapper.get(".DFV-radio-label").text()).toBe("A");
	});

	it("uses RangeInput", () => {
		const { component, currentValue } = useForm(useRangeInput());
		const wrapper = mount(component);

		expect(currentValue.value).toBe(0);
		expect(wrapper.get("input.DFV-range-input").attributes("type")).toBe("range");
	});

	it("uses DualRangeInput", () => {
		const { component, currentValue } = useForm(useDualRangeInput());
		const wrapper = mount(component);

		expect(currentValue.value).toEqual({
			start: 0,
			end: 100,
		});
		expect(wrapper.findAll("input.DFV-dual-range-input")).toHaveLength(2);
	});
});
