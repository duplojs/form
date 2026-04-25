import { CheckboxPolicy } from "@V/designSystem";
import { useCheckboxPolicy } from "@V/designSystem/components/checkbox";
import * as EE from "@duplojs/utils/either";
import { createForm } from "@V/form";
import { testTemplates } from "@test-utils/templates";
import { mount } from "@vue/test-utils";

describe("CheckboxPolicy", () => {
	const useForm = createForm(testTemplates);

	it("renders policy content and required marker", () => {
		const wrapper = mount(CheckboxPolicy, {
			props: {
				id: "policy",
				name: "policy-name",
				title: "Privacy policy",
				description: "You must accept the policy.",
				required: true,
			},
		});

		const input = wrapper.get<HTMLInputElement>("input.DFV-checkbox-input");

		expect(wrapper.get(".DFV-checkbox-policy").element.tagName).toBe("DIV");
		expect(input.attributes("id")).toBe("policy");
		expect(input.attributes("name")).toBe("policy-name");
		expect(input.attributes("type")).toBe("checkbox");
		expect(wrapper.get(".DFV-checkbox-policy-title").text()).toContain("Privacy policy");
		expect(wrapper.get(".DFV-checkbox-policy-required").text()).toBe("*");
		expect(wrapper.get(".DFV-checkbox-policy-description").text()).toBe("You must accept the policy.");
	});

	it("updates the model when the checkbox is toggled", async() => {
		const wrapper = mount(CheckboxPolicy, {
			props: {
				id: "policy",
				modelValue: false,
			},
		});

		await wrapper.get("input").setValue(true);

		expect(wrapper.emitted("update:modelValue")).toEqual([[true]]);
	});

	it("exposes a failing check with an error message when required and unchecked", async() => {
		const wrapper = mount(CheckboxPolicy, {
			props: {
				id: "policy",
				title: "Privacy policy",
				required: true,
				errorMessage: "Policy required",
				modelValue: false,
			},
		});

		const result = wrapper.vm.check!();
		await wrapper.vm.$nextTick();

		expect(EE.isLeft(result)).toBe(true);
		expect(wrapper.get(".DFV-checkbox-policy-error").text()).toBe("Policy required");
	});

	it("exposes a successful check and reset clears the error message", async() => {
		const wrapper = mount(CheckboxPolicy, {
			props: {
				id: "policy",
				title: "Privacy policy",
				required: true,
			},
		});

		wrapper.vm.check!();
		await wrapper.vm.$nextTick();
		expect(wrapper.find(".DFV-checkbox-policy-error").exists()).toBe(true);

		await wrapper.get("input").setValue(true);
		const result = wrapper.vm.check!();
		await wrapper.vm.$nextTick();

		expect(EE.isRight(result)).toBe(true);
		expect(wrapper.find(".DFV-checkbox-policy-error").exists()).toBe(false);

		wrapper.vm.reset!();
		await wrapper.vm.$nextTick();
		expect(wrapper.find(".DFV-checkbox-policy-error").exists()).toBe(false);
	});

	it("useCheckboxPolicy creates a form field with false as default", () => {
		const { component, currentValue } = useForm(useCheckboxPolicy());
		const wrapper = mount(component);

		expect(currentValue.value).toBe(false);
		expect(wrapper.get("input.DFV-checkbox-input").attributes("type")).toBe("checkbox");
	});
});
