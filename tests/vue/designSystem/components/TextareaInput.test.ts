import { TextareaInput } from "@V/designSystem";
import { mount } from "@vue/test-utils";

describe("TextareaInput", () => {
	it("renders a textarea with value and placeholder", () => {
		const wrapper = mount(TextareaInput, {
			props: {
				modelValue: "hello",
				placeholder: "Your message",
			},
		});

		const textarea = wrapper.get<HTMLTextAreaElement>("textarea.DFV-text-area");

		expect(textarea.element.value).toBe("hello");
		expect(textarea.attributes("placeholder")).toBe("Your message");
	});

	it("emits the updated text value", async() => {
		const wrapper = mount(TextareaInput, {
			props: {
				modelValue: "hello",
			},
		});

		await wrapper.get("textarea").setValue("updated");

		expect(wrapper.emitted("update:modelValue")).toEqual([["updated"]]);
	});
});
