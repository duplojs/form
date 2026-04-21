import { PrimaryButton } from "@V/designSystem";
import { mount } from "@vue/test-utils";

describe("PrimaryButton", () => {
	it("renders a primary button variation", () => {
		const wrapper = mount(PrimaryButton, {
			props: {
				label: "Submit",
				size: "lg",
				type: "submit",
			},
		});

		const button = wrapper.get("button.DFV-button");

		expect(button.attributes("type")).toBe("submit");
		expect(button.classes()).toEqual(
			expect.arrayContaining([
				"DFV-button-variant-primary",
				"DFV-button-size-lg",
			]),
		);
		expect(button.text()).toBe("Submit");
	});
});
