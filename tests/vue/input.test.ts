import { createInput, createForm } from "@V";
import { mount } from "@vue/test-utils";
import TextInput from "@test-utils/TextInput.vue";
import { testTemplates } from "@test-utils/templates";
import { E, sleep } from "@duplojs/utils";
import TextInputWithExpose from "@test-utils/TextInputWithExpose.vue";
import { ref } from "vue";

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
});
