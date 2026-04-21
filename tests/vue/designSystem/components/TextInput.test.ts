import { TextInput } from "@V/designSystem";
import { mount } from "@vue/test-utils";

describe("TextInput", () => {
	it("renders a text input with value and placeholder", () => {
		const wrapper = mount(TextInput, {
			props: {
				modelValue: "hello",
				placeholder: "Your text",
			},
		});

		const input = wrapper.get<HTMLInputElement>("input.DFV-text-input");

		expect(input.attributes("type")).toBe("text");
		expect(input.element.value).toBe("hello");
		expect(input.attributes("placeholder")).toBe("Your text");
	});

	it("emits the updated text value", async() => {
		const wrapper = mount(TextInput, {
			props: {
				modelValue: "hello",
			},
		});

		await wrapper.get("input").setValue("updated");

		expect(wrapper.emitted("update:modelValue")).toEqual([["updated"]]);
	});
});
