import { DualRangeInput } from "@V/designSystem";
import { mount } from "@vue/test-utils";
import { afterEach, vi } from "vitest";

afterEach(() => {
	vi.useRealTimers();
});

describe("DualRangeInput", () => {
	it("renders two range sliders with constraints and selected range style", () => {
		const wrapper = mount(DualRangeInput, {
			props: {
				modelValue: {
					start: 20,
					end: 80,
				},
				min: 0,
				max: 100,
				step: 5,
			},
		});

		const inputs = wrapper.findAll<HTMLInputElement>("input.DFV-dual-range-input");
		const range = wrapper.get(".DFV-dual-range-range");

		expect(wrapper.get(".DFV-dual-range").element.tagName).toBe("DIV");
		expect(inputs).toHaveLength(2);
		expect(inputs[0]!.classes()).toContain("DFV-dual-range-input-start");
		expect(inputs[0]!.attributes("type")).toBe("range");
		expect(inputs[0]!.element.value).toBe("20");
		expect(inputs[0]!.attributes("min")).toBe("0");
		expect(inputs[0]!.attributes("max")).toBe("100");
		expect(inputs[0]!.attributes("step")).toBe("5");
		expect(inputs[1]!.classes()).toContain("DFV-dual-range-input-end");
		expect(inputs[1]!.element.value).toBe("80");
		expect(range.attributes("style")).toContain("--DFV-dual-range-start: 20%");
		expect(range.attributes("style")).toContain("--DFV-dual-range-width: 60%");
	});

	it("updates the start and end values when sliders change", async() => {
		const modelValue = {
			start: 20,
			end: 80,
		};
		const wrapper = mount(DualRangeInput, {
			props: {
				modelValue,
				min: 0,
				max: 100,
				step: 5,
			},
		});

		const inputs = wrapper.findAll("input.DFV-dual-range-input");

		await inputs[0]!.setValue("30");
		await inputs[1]!.setValue("90");

		expect(modelValue).toEqual({
			start: 30,
			end: 90,
		});
	});

	it("does not move start after end or end before start", async() => {
		const modelValue = {
			start: 20,
			end: 80,
		};
		const wrapper = mount(DualRangeInput, {
			props: {
				modelValue,
				min: 0,
				max: 100,
			},
		});

		const inputs = wrapper.findAll("input.DFV-dual-range-input");

		await inputs[0]!.setValue("90");
		expect(modelValue).toEqual({
			start: 20,
			end: 80,
		});

		await inputs[1]!.setValue("10");
		expect(modelValue).toEqual({
			start: 20,
			end: 80,
		});
	});

	it("renders manual number inputs when manual mode is enabled", () => {
		const wrapper = mount(DualRangeInput, {
			props: {
				modelValue: {
					start: 20,
					end: 80,
				},
				min: 0,
				max: 100,
				step: 5,
				manual: true,
			},
		});

		const numberInputs = wrapper.findAll<HTMLInputElement>("input.DFV-number-input");

		expect(wrapper.get(".DFV-dual-range-container-input").element.tagName).toBe("DIV");
		expect(numberInputs).toHaveLength(2);
		expect(numberInputs[0]!.element.value).toBe("20");
		expect(numberInputs[0]!.attributes("min")).toBe("0");
		expect(numberInputs[0]!.attributes("max")).toBe("80");
		expect(numberInputs[0]!.attributes("step")).toBe("5");
		expect(numberInputs[1]!.element.value).toBe("80");
		expect(numberInputs[1]!.attributes("min")).toBe("20");
		expect(numberInputs[1]!.attributes("max")).toBe("100");
		expect(numberInputs[1]!.attributes("step")).toBe("5");
	});

	it("updates the start value from the manual number input after debounce", async() => {
		vi.useFakeTimers();
		const modelValue = {
			start: 20,
			end: 80,
		};
		const wrapper = mount(DualRangeInput, {
			props: {
				modelValue,
				min: 0,
				max: 100,
				step: 5,
				manual: true,
				manualDebounce: 100,
			},
		});

		const numberInputs = wrapper.findAll("input.DFV-number-input");

		await numberInputs[0]!.setValue("33");
		expect(modelValue.start).toBe(20);

		await vi.advanceTimersByTimeAsync(100);

		expect(modelValue).toEqual({
			start: 35,
			end: 80,
		});
	});

	it("updates the end value from the manual number input after debounce", async() => {
		vi.useFakeTimers();
		const modelValue = {
			start: 20,
			end: 80,
		};
		const wrapper = mount(DualRangeInput, {
			props: {
				modelValue,
				min: 0,
				max: 100,
				step: 5,
				manual: true,
				manualDebounce: 100,
			},
		});

		const numberInputs = wrapper.findAll("input.DFV-number-input");

		await numberInputs[1]!.setValue("87");
		expect(modelValue.end).toBe(80);

		await vi.advanceTimersByTimeAsync(100);

		expect(modelValue).toEqual({
			start: 20,
			end: 85,
		});
	});
});
