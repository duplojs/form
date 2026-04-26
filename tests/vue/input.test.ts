import { createInput, createForm } from "@V";
import { mount } from "@vue/test-utils";
import TextInput from "@test-utils/TextInput.vue";
import { testTemplates } from "@test-utils/templates";
import { DP, E, sleep, unwrap } from "@duplojs/utils";
import TextInputWithExpose from "@test-utils/TextInputWithExpose.vue";
import TextInputWithErrorExpose from "@test-utils/TextInputWithErrorExpose.vue";
import { ref } from "vue";
import { templatesGrid } from "@test-utils/grid";

describe("input", () => {
	const useForm = createForm(testTemplates);

	it("test default value", () => {
		expect(
			createInput(TextInput, { defaultValue: "default" })().defaultValue,
		).toBe("default");
		expect(
			createInput(TextInput, { defaultValue: () => "defaultWithCallBack" })().defaultValue,
		).toBe("defaultWithCallBack");

		expect(
			createInput(TextInput, { defaultValue: "" })({ defaultValue: "default" }).defaultValue,
		).toBe("default");
		expect(
			createInput(TextInput, { defaultValue: "" })({ defaultValue: () => "defaultWithCallBack" }).defaultValue,
		).toBe("defaultWithCallBack");
	});

	it("mount form and write on text input", async() => {
		const useInput = createInput(TextInput, {
			defaultValue: "default",
		});
		const { component, currentValue, check, reset } = useForm(
			useInput(),
		);
		const wrapper = mount(component);

		const dom = wrapper.find("#test-text-input");
		await dom.setValue("SuperText");

		expect(currentValue.value).toBe(
			"SuperText",
		);
		const small = wrapper.find("#current-value-input");
		expect(small.text()).toBe("SuperText");
		expect(check()).toStrictEqual(
			E.success("SuperText"),
		);
		reset();
		expect(currentValue.value).toBe(
			"default",
		);
	});

	it("expect props is good", async() => {
		const useInput = createInput(TextInput, {
			defaultValue: "default",
			props: { defaultProps: "test" } as never,
		});
		const dynamicProps = ref("test");
		const { component } = useForm(
			useInput({ props: () => ({ contextProps: dynamicProps.value }) as never }),
		);
		const wrapper = mount(component);

		const dom = wrapper.find("#test-text-input");

		expect(dom.attributes()).toStrictEqual({
			contextprops: "test",
			defaultprops: "test",
			id: "test-text-input",
		});
		dynamicProps.value = "newValue";
		await sleep();
		expect(dom.attributes()).toStrictEqual({
			contextprops: "newValue",
			defaultprops: "test",
			id: "test-text-input",
		});
	});

	it("define custom check, reset", async() => {
		const useInput = createInput(TextInputWithExpose, {
			defaultValue: "default",
		});
		const { component, currentValue, check, reset, dispose } = useForm(useInput());
		const wrapper = mount(component);

		const dom = wrapper.find("#test-text-input");
		await dom.setValue("ok");

		expect(currentValue.value).toBe(
			"ok",
		);
		expect(check()).toStrictEqual(
			E.success("test"),
		);
		reset();
		await sleep();
		expect(currentValue.value).toBe(
			"reset",
		);
		dispose();
		expect(currentValue.value).toBe("reset");
		await sleep();
		expect(wrapper.find("#text-input-with-expose-disposed").exists()).toBe(true);
	});

	it("renders label when provided", () => {
		const useInput = createInput(TextInput, {
			defaultValue: "default",
		});
		const { component } = useForm(
			useInput({
				label: "Age",
				template: templatesGrid.useInputTemplate(),
			}),
		);
		const wrapper = mount(component);

		const label = wrapper.find("label");
		expect(label.exists()).toBe(true);
		expect(label.text()).toBe("Age");
		expect(label.attributes("for")).toBe("FRM_INP");
	});

	it("renders parser errors, clears them on valid value, and resets them", async() => {
		const useInput = createInput(TextInput, {
			defaultValue: "default",
		});
		const { component, currentValue, check, reset } = useForm(
			useInput({
				dataParser: DP.coerce.number({ errorMessage: "Need number" }),
			}),
		);
		const wrapper = mount(component);

		expect(wrapper.find("#input-error-message").text()).toBe("");

		const firstCheck = check();
		expect(E.isLeft(firstCheck)).toBe(true);
		expect(unwrap(firstCheck)).toMatchObject([
			{
				key: "FRM_INP",
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
		expect(wrapper.find("#input-error-message").text()).toBe("Need number");

		currentValue.value = "42";
		await sleep();
		expect(wrapper.find("#current-value-input").text()).toBe("42");
		expect(wrapper.find("#input-error-message").text()).toBe("");

		currentValue.value = "still-invalid";
		await sleep();
		expect(wrapper.find("#input-error-message").text()).toBe("");

		check();
		await sleep();
		expect(wrapper.find("#input-error-message").text()).toBe("Need number");

		reset();
		await sleep();
		expect(currentValue.value).toBe("default");
		expect(wrapper.find("#current-value-input").text()).toBe("default");
		expect(wrapper.find("#input-error-message").text()).toBe("");
	});

	it("falls back to generic error message when parser issue has no message", async() => {
		const useInput = createInput(TextInput, {
			defaultValue: "default",
		});
		const { component, check } = useForm(
			useInput({
				dataParser: DP.coerce.number(),
			}),
		);
		const wrapper = mount(component);

		expect(E.isLeft(check())).toBe(true);
		await sleep();
		expect(wrapper.find("#input-error-message").text()).toBe("Error");
	});

	it("does not call parser when input component check already fails", async() => {
		const useInput = createInput(TextInputWithErrorExpose, {
			defaultValue: "default",
		});
		const { component, check } = useForm(
			useInput({
				dataParser: {
					parse: () => {
						throw new Error("parser should not be called");
					},
				} as never,
			}),
		);
		const wrapper = mount(component);

		expect(check()).toStrictEqual(
			E.error([{ key: "inner-field" }]),
		);
		await sleep();
		expect(wrapper.find("#input-error-message").text()).toBe("");
	});
});
