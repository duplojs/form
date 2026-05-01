import { TextareaInput } from "@V/designSystem";
import { useTextareaInput } from "@V/designSystem/components";
import { createForm } from "@V/form";
import { testTemplates } from "@test-utils/templates";
import { mount } from "@vue/test-utils";

describe("TextareaInput", () => {
	const useForm = createForm(testTemplates);

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

	it("useTextareaInput creates a form field with an empty string default", () => {
		const { component, currentValue } = useForm(useTextareaInput());
		const wrapper = mount(component);

		expect(currentValue.value).toBe("");
		expect(wrapper.get("textarea.DFV-text-area").element.tagName).toBe("TEXTAREA");
	});
});
