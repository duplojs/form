import { TimeInput } from "@V/designSystem";
import { useTimeInput } from "@V/designSystem/components/time";
import * as DD from "@duplojs/utils/date";
import { createForm } from "@V/form";
import { testTemplates } from "@test-utils/templates";
import { mount } from "@vue/test-utils";
import { vi } from "vitest";

describe("TimeInput", () => {
	const useForm = createForm(testTemplates);

	it("renders a time input with formatted model, min, and max values", () => {
		const wrapper = mount(TimeInput, {
			props: {
				modelValue: DD.createTime(570, "minute"),
				min: DD.createTime(480, "minute"),
				max: DD.createTime(1080, "minute"),
			},
		});

		const input = wrapper.get<HTMLInputElement>("input.DFV-time-input");

		expect(input.attributes("type")).toBe("time");
		expect(input.element.value).toBe("09:30");
		expect(input.attributes("min")).toBe("08:00");
		expect(input.attributes("max")).toBe("18:00");
	});

	it("emits a time when the input value changes", async() => {
		const wrapper = mount(TimeInput, {
			props: {
				modelValue: null,
			},
		});

		await wrapper.get("input").setValue("10:15");

		const emittedValue = wrapper.emitted("update:modelValue")?.[0]?.[0];

		expect(DD.formatTime(emittedValue as DD.TheTime, "HH:mm")).toBe("10:15");
	});

	it("emits midnight when the input value is missing", async() => {
		const wrapper = mount(TimeInput, {
			props: {
				modelValue: DD.createTime(615, "minute"),
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

		const emittedValue = wrapper.emitted("update:modelValue")?.[0]?.[0];

		expect(String(emittedValue)).toBe("time0-");
	});

	it("ignores unsafe time values", async() => {
		const wrapper = mount(TimeInput, {
			props: {
				modelValue: DD.createTime(615, "minute"),
			},
		});

		const input = wrapper.get("input");
		const valueGetter = vi
			.spyOn(HTMLInputElement.prototype, "value", "get")
			.mockReturnValue(Number.MAX_SAFE_INTEGER as unknown as string);

		try {
			await input.trigger("input");
		} finally {
			valueGetter.mockRestore();
		}

		expect(wrapper.emitted("update:modelValue")![0]).toEqual([null]);
	});

	it("useTimeInput creates a form field with midnight default", () => {
		const { component, currentValue } = useForm(useTimeInput());
		const wrapper = mount(component);
		const input = wrapper.get<HTMLInputElement>("input.DFV-time-input");

		expect(DD.formatTime(currentValue.value as DD.TheTime, "HH:mm")).toBe("00:00");
		expect(input.attributes("type")).toBe("time");
		expect(input.element.value).toBe("00:00");
	});
});
