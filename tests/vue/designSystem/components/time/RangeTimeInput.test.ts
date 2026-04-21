import { RangeTimeInput } from "@V/designSystem";
import * as DD from "@duplojs/utils/date";
import { mount } from "@vue/test-utils";

describe("RangeTimeInput", () => {
	it("renders two time inputs with a minus separator", () => {
		const wrapper = mount(RangeTimeInput, {
			props: {
				modelValue: {
					from: null,
					to: null,
				},
			},
		});

		const inputs = wrapper.findAll<HTMLInputElement>("input.DFV-time-input");

		expect(wrapper.get(".DFV-range-time-input").element.tagName).toBe("DIV");
		expect(inputs).toHaveLength(2);
		expect(wrapper.get('.DFV-range-time-input-separator [data-dfv-icon="minus"]').element.tagName).toBe("svg");
	});

	it("passes min and max constraints to inner time inputs", () => {
		const wrapper = mount(RangeTimeInput, {
			props: {
				min: DD.createTime(480, "minute"),
				max: DD.createTime(1080, "minute"),
				modelValue: {
					from: DD.createTime(570, "minute"),
					to: DD.createTime(1020, "minute"),
				},
			},
		});

		const inputs = wrapper.findAll<HTMLInputElement>("input.DFV-time-input");

		expect(inputs[0]!.element.value).toBe("09:30");
		expect(inputs[0]!.attributes("min")).toBe("08:00");
		expect(inputs[0]!.attributes("max")).toBe("17:00");
		expect(inputs[1]!.element.value).toBe("17:00");
		expect(inputs[1]!.attributes("min")).toBe("09:30");
		expect(inputs[1]!.attributes("max")).toBe("18:00");
	});

	it("updates the from and to model values through inner time inputs", async() => {
		const modelValue = {
			from: null,
			to: null,
		};
		const wrapper = mount(RangeTimeInput, {
			props: {
				modelValue,
			},
		});

		const inputs = wrapper.findAll("input.DFV-time-input");

		await inputs[0]!.setValue("09:45");
		await inputs[1]!.setValue("16:30");

		expect(DD.formatTime(modelValue.from as any, "HH:mm")).toBe("09:45");
		expect(DD.formatTime(modelValue.to as any, "HH:mm")).toBe("16:30");
	});
});
