import { createForm, createInput, createTemplate, useCheckLayout } from "@V";
import { E, sleep, unwrap, DP } from "@duplojs/utils";
import { mount } from "@vue/test-utils";
import TextInput from "@test-utils/TextInput.vue";
import TextInputWithErrorExpose from "@test-utils/TextInputWithErrorExpose.vue";
import CheckTemplateAlt from "@test-utils/templates/CheckTemplateAlt.vue";
import { testTemplates } from "@test-utils/templates";

describe("useCheckLayout", () => {
	it("renders parser errors, clears them on valid value, resets them, and stops reactivity on dispose", async() => {
		const useForm = createForm(testTemplates);
		const useInput = createInput(TextInput, {
			defaultValue: "default",
		});
		const field = useCheckLayout(
			useInput(),
			{
				dataParser: DP.coerce.number({ errorMessage: "Need number" }),
			},
		);
		const { component, currentValue, check, reset, dispose } = useForm(field);
		const wrapper = mount(component);

		expect(wrapper.find("#test-text-input").exists()).toBe(true);
		expect(wrapper.find("#check-field-key").text()).toBe("form-field");
		expect(wrapper.find("#check-current-value").text()).toBe("default");
		expect(wrapper.find("#check-error-message").text()).toBe("");

		const firstCheck = check();
		expect(E.isLeft(firstCheck)).toBe(true);
		expect(unwrap(firstCheck)).toMatchObject([
			{
				key: "form-field",
				dataParserError: {
					issues: [
						{
							path: "",
							data: "default",
						},
					],
				},
			},
		]);
		await sleep();
		expect(wrapper.find("#check-error-message").text()).toBe("Need number");

		currentValue.value = "42";
		await sleep();
		expect(wrapper.find("#check-current-value").text()).toBe("42");
		expect(wrapper.find("#check-error-message").text()).toBe("");

		check();
		await sleep();
		expect(wrapper.find("#check-error-message").text()).toBe("");

		currentValue.value = "still-invalid";
		await sleep();
		expect(wrapper.find("#check-error-message").text()).toBe("");

		check();
		await sleep();
		expect(wrapper.find("#check-error-message").text()).toBe("Need number");

		reset();
		await sleep();
		expect(currentValue.value).toBe("default");
		expect(wrapper.find("#check-current-value").text()).toBe("default");
		expect(wrapper.find("#check-error-message").text()).toBe("");

		check();
		await sleep();
		expect(wrapper.find("#check-error-message").text()).toBe("Need number");

		dispose();
		currentValue.value = "123";
		await sleep();
		expect(wrapper.find("#check-current-value").text()).toBe("123");
		expect(wrapper.find("#check-error-message").text()).toBe("Need number");
	});

	it("uses the local template override and returns the inner field error without parsing", async() => {
		const useForm = createForm(testTemplates);
		const localCheckTemplate = createTemplate("check", CheckTemplateAlt)();
		const useInput = createInput(TextInputWithErrorExpose, {
			defaultValue: "default",
		});
		const field = useCheckLayout(
			useInput(),
			{
				template: localCheckTemplate,
				dataParser: {
					parse: () => {
						throw new Error("parser should not be called");
					},
				} as never,
			},
		);
		const { component, currentValue, check, reset, dispose } = useForm(field);
		const wrapper = mount(component);

		expect(wrapper.find("#local-check-template").exists()).toBe(true);
		expect(wrapper.find("#local-check-field-key").text()).toBe("form-field");
		expect(wrapper.find("#test-text-input").exists()).toBe(true);

		await wrapper.find("#test-text-input").setValue("value");
		expect(currentValue.value).toBe("value");
		expect(check()).toStrictEqual(
			E.error([{ key: "inner-field" }]),
		);
		expect(wrapper.find("#local-check-error-message").text()).toBe("");

		reset();
		await sleep();
		expect(currentValue.value).toBe("default");

		dispose();
		expect(wrapper.find("#local-check-template").exists()).toBe(true);
	});

	it("falls back to the generic error message when the parser error has no explicit message", async() => {
		const useForm = createForm(testTemplates);
		const useInput = createInput(TextInput, {
			defaultValue: "default",
		});
		const { component, check } = useForm(
			useCheckLayout(
				useInput(),
				{
					dataParser: {
						parse: () => E.error({
							issues: [
								{
									source: {
										definition: {},
									},
									path: "",
									data: "default",
								},
							],
							currentPath: [],
						}),
					} as never,
				},
			),
		);
		const wrapper = mount(component);

		expect(E.isLeft(check())).toBe(true);
		await sleep();
		expect(wrapper.find("#check-error-message").text()).toBe("Error");
	});

	it("updates the dom when currentValue changes directly", async() => {
		const useForm = createForm(testTemplates);
		const { component, currentValue } = useForm(
			useCheckLayout(
				createInput(TextInput, {
					defaultValue: "default",
				})(),
				{
					dataParser: DP.coerce.number({ errorMessage: "Need number" }),
				},
			),
		);
		const wrapper = mount(component);

		currentValue.value = "41";
		await sleep();
		expect(wrapper.find<HTMLInputElement>("#test-text-input").element.value).toBe("41");
		expect(wrapper.find("#check-current-value").text()).toBe("41");

		currentValue.value = "not-a-number";
		await sleep();
		expect(wrapper.find<HTMLInputElement>("#test-text-input").element.value).toBe("not-a-number");
		expect(wrapper.find("#check-current-value").text()).toBe("not-a-number");
	});
});
