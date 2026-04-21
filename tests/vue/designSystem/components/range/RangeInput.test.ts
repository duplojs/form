import { RangeInput } from "@V/designSystem";
import { mount } from "@vue/test-utils";
import { afterEach, vi } from "vitest";

afterEach(() => {
	vi.useRealTimers();
});

describe("RangeInput", () => {
	it("renders a range slider with value, constraints, and progress style", () => {
		const wrapper = mount(RangeInput, {
			props: {
				modelValue: 25,
				min: 0,
				max: 100,
				step: 5,
			},
		});

		const input = wrapper.get<HTMLInputElement>("input.DFV-range-input");

		expect(wrapper.get(".DFV-range").element.tagName).toBe("DIV");
		expect(input.attributes("type")).toBe("range");
		expect(input.element.value).toBe("25");
		expect(input.attributes("min")).toBe("0");
		expect(input.attributes("max")).toBe("100");
		expect(input.attributes("step")).toBe("5");
		expect(input.attributes("style")).toContain("--DFV-range-progress-value: 25%");
	});

	it("emits the selected value when the slider changes", async() => {
		const wrapper = mount(RangeInput, {
			props: {
				modelValue: 25,
				min: 0,
				max: 100,
				step: 5,
			},
		});

		await wrapper.get("input.DFV-range-input").setValue("50");

		expect(wrapper.emitted("update:modelValue")).toEqual([[50]]);
	});

	it("clamps progress style between min and max", () => {
		const wrapper = mount(RangeInput, {
			props: {
				modelValue: 150,
				min: 0,
				max: 100,
			},
		});

		expect(wrapper.get("input.DFV-range-input").attributes("style")).toContain("--DFV-range-progress-value: 100%");
	});

	it("renders the manual number input when manual mode is enabled", () => {
		const wrapper = mount(RangeInput, {
			props: {
				modelValue: 25,
				min: 0,
				max: 100,
				step: 5,
				manual: true,
			},
		});

		const numberInput = wrapper.get<HTMLInputElement>("input.DFV-number-input");

		expect(numberInput.attributes("type")).toBe("number");
		expect(numberInput.element.value).toBe("25");
		expect(numberInput.attributes("min")).toBe("0");
		expect(numberInput.attributes("max")).toBe("100");
		expect(numberInput.attributes("step")).toBe("5");
	});

	it("updates the model from the manual number input after debounce", async() => {
		vi.useFakeTimers();
		const wrapper = mount(RangeInput, {
			props: {
				modelValue: 25,
				min: 0,
				max: 100,
				step: 5,
				manual: true,
				manualDebounce: 100,
			},
		});

		await wrapper.get("input.DFV-number-input").setValue("53");

		expect(wrapper.emitted("update:modelValue")).toBeUndefined();

		await vi.advanceTimersByTimeAsync(100);

		expect(wrapper.emitted("update:modelValue")).toEqual([[55]]);
	});
});
