import { createForm, createInput, createTemplate, useSectionLayout } from "@V";
import { E, sleep } from "@duplojs/utils";
import { mount } from "@vue/test-utils";
import TextInput from "@test-utils/TextInput.vue";
import TextInputWithExpose from "@test-utils/TextInputWithExpose.vue";
import SectionTemplateAlt from "@test-utils/templates/SectionTemplateAlt.vue";
import { testTemplates } from "@test-utils/templates";

describe("useSectionLayout", () => {
	it("uses default section template and delegates check/reset/dispose", async() => {
		const useForm = createForm(testTemplates);
		const field = useSectionLayout(
			createInput(TextInputWithExpose, { defaultValue: "default" })(),
			{ title: "Profile" },
		);
		const { component, currentValue, check, reset, dispose } = useForm(field);
		const wrapper = mount(component);

		expect(field.defaultValue).toBe("default");
		expect(wrapper.find("#test-text-input").exists()).toBe(true);
		expect(check()).toStrictEqual(E.success("test"));

		reset();
		await sleep();
		expect(currentValue.value).toBe("reset");

		dispose();
		await sleep();
		expect(wrapper.find("#text-input-with-expose-disposed").exists()).toBe(true);
	});

	it("uses local section template override", async() => {
		const useForm = createForm(testTemplates);
		const localTemplate = createTemplate("section", SectionTemplateAlt)();
		const { component, currentValue, check } = useForm(
			useSectionLayout(
				createInput(TextInput, { defaultValue: "default" })(),
				{
					title: "Account",
					template: localTemplate,
				},
			),
		);
		const wrapper = mount(component);

		expect(wrapper.find("#local-section-template").exists()).toBe(true);
		expect(wrapper.find("#local-section-title").text()).toBe("Account");
		expect(wrapper.find("#local-section-current-value").text()).toBe("default");

		await wrapper.find("#test-text-input").setValue("updated");
		expect(currentValue.value).toBe("updated");
		expect(check()).toStrictEqual(E.success("updated"));
	});
});
