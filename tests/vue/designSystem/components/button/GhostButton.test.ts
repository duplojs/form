import { GhostButton } from "@V/designSystem";
import { mount } from "@vue/test-utils";

describe("GhostButton", () => {
	it("renders a ghost button variation", () => {
		const wrapper = mount(GhostButton, {
			props: {
				label: "Cancel",
				size: "lg",
				type: "submit",
			},
		});

		const button = wrapper.get("button.DFV-button");

		expect(button.attributes("type")).toBe("submit");
		expect(button.classes()).toEqual(
			expect.arrayContaining([
				"DFV-button-variant-ghost",
				"DFV-button-size-lg",
			]),
		);
		expect(button.text()).toBe("Cancel");
	});
});
