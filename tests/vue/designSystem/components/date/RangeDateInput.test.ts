import { RangeDateInput } from "@V/designSystem";
import * as DD from "@duplojs/utils/date";
import { mount } from "@vue/test-utils";

describe("RangeDateInput", () => {
	it("renders two date inputs with a minus separator", () => {
		const wrapper = mount(RangeDateInput, {
			props: {
				modelValue: {
					from: null,
					to: null,
				},
			},
		});

		const inputs = wrapper.findAll<HTMLInputElement>("input.DFV-date-input");

		expect(wrapper.get(".DFV-range-date-input").element.tagName).toBe("DIV");
		expect(inputs).toHaveLength(2);
		expect(wrapper.get('.DFV-range-date-input-separator [data-dfv-icon="minus"]').element.tagName).toBe("svg");
	});

	it("passes min and max constraints to inner date inputs", () => {
		const wrapper = mount(RangeDateInput, {
			props: {
				min: DD.createOrThrow(new Date("2024-01-01T00:00:00.000Z")),
				max: DD.createOrThrow(new Date("2024-12-31T00:00:00.000Z")),
				modelValue: {
					from: DD.createOrThrow(new Date("2024-02-01T00:00:00.000Z")),
					to: DD.createOrThrow(new Date("2024-11-30T00:00:00.000Z")),
				},
			},
		});

		const inputs = wrapper.findAll<HTMLInputElement>("input.DFV-date-input");

		expect(inputs[0]!.element.value).toBe("2024-02-01");
		expect(inputs[0]!.attributes("min")).toBe("2024-01-01");
		expect(inputs[0]!.attributes("max")).toBe("2024-11-30");
		expect(inputs[1]!.element.value).toBe("2024-11-30");
		expect(inputs[1]!.attributes("min")).toBe("2024-02-01");
		expect(inputs[1]!.attributes("max")).toBe("2024-12-31");
	});

	it("updates the from and to model values through inner date inputs", async() => {
		const modelValue = {
			from: null,
			to: null,
		};
		const wrapper = mount(RangeDateInput, {
			props: {
				modelValue,
			},
		});

		const inputs = wrapper.findAll("input.DFV-date-input");

		await inputs[0]!.setValue("2024-03-04");
		await inputs[1]!.setValue("2024-03-20");

		expect(DD.format(modelValue.from as any, "YYYY-MM-DD", "UTC")).toBe("2024-03-04");
		expect(DD.format(modelValue.to as any, "YYYY-MM-DD", "UTC")).toBe("2024-03-20");
	});
});
