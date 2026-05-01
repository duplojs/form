import { TextInput } from "@V/designSystem";
import { useTextInput } from "@V/designSystem/components";
import { createForm } from "@V/form";
import { testTemplates } from "@test-utils/templates";
import { mount } from "@vue/test-utils";

describe("TextInput", () => {
	const useForm = createForm(testTemplates);

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

	it("useTextInput creates a form field with an empty string default", () => {
		const { component, currentValue } = useForm(useTextInput());
		const wrapper = mount(component);

		expect(currentValue.value).toBe("");
		expect(wrapper.get("input.DFV-text-input").element.tagName).toBe("INPUT");
	});
});
