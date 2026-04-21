import { DateInput } from "@V/designSystem";
import * as DD from "@duplojs/utils/date";
import { mount } from "@vue/test-utils";
import { vi } from "vitest";

describe("DateInput", () => {
	it("renders a date input with formatted model, min, and max values", () => {
		const wrapper = mount(DateInput, {
			props: {
				modelValue: DD.createOrThrow(new Date("2024-01-10T00:00:00.000Z")),
				min: DD.createOrThrow(new Date("2024-01-01T00:00:00.000Z")),
				max: DD.createOrThrow(new Date("2024-12-31T00:00:00.000Z")),
			},
		});

		const input = wrapper.get<HTMLInputElement>("input.DFV-date-input");

		expect(input.attributes("type")).toBe("date");
		expect(input.element.value).toBe("2024-01-10");
		expect(input.attributes("min")).toBe("2024-01-01");
		expect(input.attributes("max")).toBe("2024-12-31");
	});

	it("emits a date when the input value changes", async() => {
		const wrapper = mount(DateInput, {
			props: {
				modelValue: null,
			},
		});

		await wrapper.get("input").setValue("2024-02-03");

		const emittedValue = wrapper.emitted("update:modelValue")?.[0]?.[0];

		expect(DD.format(emittedValue as DD.TheDate, "YYYY-MM-DD", "UTC")).toBe("2024-02-03");
	});

	it("emits null when the input value is missing", async() => {
		const wrapper = mount(DateInput, {
			props: {
				modelValue: DD.createOrThrow(new Date("2024-02-03T00:00:00.000Z")),
			},
		});

		const input = wrapper.get("input");
		const valueGetter = vi
			.spyOn(HTMLInputElement.prototype, "value", "get")
			.mockReturnValue(undefined as unknown as string);

		try {
			await input.trigger("input");
		} finally {
			valueGetter.mockRestore();
		}

		expect(wrapper.emitted("update:modelValue")?.[0]).toEqual([null]);
	});
});
