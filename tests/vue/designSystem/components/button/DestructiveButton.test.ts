import { DestructiveButton } from "@V/designSystem";
import { mount } from "@vue/test-utils";

describe("DestructiveButton", () => {
	it("renders a destructive button variation", () => {
		const wrapper = mount(DestructiveButton, {
			props: {
				label: "Delete",
				size: "lg",
				type: "submit",
			},
		});

		const button = wrapper.get("button.DFV-button");

		expect(button.attributes("type")).toBe("submit");
		expect(button.classes()).toEqual(
			expect.arrayContaining([
				"DFV-button-variant-destructive",
				"DFV-button-size-lg",
			]),
		);
		expect(button.text()).toBe("Delete");
	});
});
