import { OutlineButton } from "@V/designSystem";
import { mount } from "@vue/test-utils";

describe("OutlineButton", () => {
	it("renders an outline button variation", () => {
		const wrapper = mount(OutlineButton, {
			props: {
				label: "Back",
				size: "lg",
				type: "submit",
			},
		});

		const button = wrapper.get("button.DFV-button");

		expect(button.attributes("type")).toBe("submit");
		expect(button.classes()).toEqual(
			expect.arrayContaining([
				"DFV-button-variant-outline",
				"DFV-button-size-lg",
			]),
		);
		expect(button.text()).toBe("Back");
	});
});
