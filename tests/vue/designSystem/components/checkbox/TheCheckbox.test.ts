import { TheCheckbox } from "@V/designSystem";
import { mount } from "@vue/test-utils";

describe("TheCheckbox", () => {
	it("renders a checkbox with id, name, and label", () => {
		const wrapper = mount(TheCheckbox, {
			props: {
				id: "terms",
				name: "terms-name",
				label: "Accept terms",
			},
		});

		const label = wrapper.get("label.DFV-checkbox");
		const input = label.get("input.DFV-checkbox-input");

		expect(input.attributes("id")).toBe("terms");
		expect(input.attributes("name")).toBe("terms-name");
		expect(input.attributes("type")).toBe("checkbox");
		expect(label.get(".DFV-checkbox-label").text()).toBe("Accept terms");
	});

	it("does not render a label text when label is not provided", () => {
		const wrapper = mount(TheCheckbox, {
			props: {
				id: "terms",
			},
		});

		expect(wrapper.find(".DFV-checkbox-label").exists()).toBe(false);
	});

	it("updates the model when the checkbox is toggled", async() => {
		const wrapper = mount(TheCheckbox, {
			props: {
				id: "terms",
				modelValue: false,
			},
		});

		await wrapper.get("input").setValue(true);

		expect(wrapper.emitted("update:modelValue")).toEqual([[true]]);
	});
});
