import { TheButton } from "@V/designSystem";
import { flushPromises, mount } from "@vue/test-utils";

describe("TheButton", () => {
	it("renders a primary medium button by default", () => {
		const wrapper = mount(TheButton, {
			props: {
				label: "Submit",
			},
		});

		const button = wrapper.get("button.DFV-button");

		expect(button.element.tagName).toBe("BUTTON");
		expect(button.attributes("type")).toBe("button");
		expect(button.classes()).toEqual(
			expect.arrayContaining([
				"DFV-button",
				"DFV-button-variant-primary",
				"DFV-button-size-md",
			]),
		);
		expect(button.get("span").text()).toBe("Submit");
	});

	it("renders custom variant, size, and type", () => {
		const wrapper = mount(TheButton, {
			props: {
				label: "Delete",
				variant: "destructive",
				size: "2xl",
				type: "submit",
			},
		});

		const button = wrapper.get("button");

		expect(button.attributes("type")).toBe("submit");
		expect(button.classes()).toEqual(
			expect.arrayContaining([
				"DFV-button-variant-destructive",
				"DFV-button-size-2xl",
			]),
		);
		expect(button.text()).toBe("Delete");
	});

	it("does not render a label span when label is not provided", () => {
		const wrapper = mount(TheButton);

		expect(wrapper.find("span").exists()).toBe(false);
	});

	it("renders the icon before the label by default", async() => {
		const wrapper = mount(TheButton, {
			props: {
				label: "Next",
				icon: "next",
			},
		});

		await flushPromises();

		const children = wrapper.get("button").element.children;

		expect(children).toHaveLength(2);
		expect(children[0]!.tagName).toBe("svg");
		expect(children[1]!.tagName).toBe("SPAN");
		expect(wrapper.get("[data-dfv-icon=\"next\"]").attributes("style")).toContain("--DFV-icon-size: 1rem");
	});

	it("renders the icon after the label", async() => {
		const wrapper = mount(TheButton, {
			props: {
				label: "Previous",
				icon: "previous",
				iconPosition: "end",
			},
		});

		await flushPromises();

		const children = wrapper.get("button").element.children;

		expect(children).toHaveLength(2);
		expect(children[0]!.tagName).toBe("SPAN");
		expect(children[1]!.tagName).toBe("svg");
		expect(wrapper.get("[data-dfv-icon=\"previous\"]").element.tagName).toBe("svg");
	});

	it("uses iconSize instead of button size when it is provided", async() => {
		const wrapper = mount(TheButton, {
			props: {
				label: "Add",
				size: "2xl",
				icon: "plus",
				iconSize: "sm",
			},
		});

		await flushPromises();

		expect(wrapper.get("button").classes()).toContain("DFV-button-size-2xl");
		expect(wrapper.get("[data-dfv-icon=\"plus\"]").attributes("style")).toContain("--DFV-icon-size: 0.875rem");
	});

	it("renders the remove icon", async() => {
		const wrapper = mount(TheButton, {
			props: {
				label: "Remove",
				icon: "remove",
			},
		});

		await flushPromises();

		expect(wrapper.get("[data-dfv-icon=\"remove\"]").element.tagName).toBe("svg");
	});

	it("renders the minus icon", async() => {
		const wrapper = mount(TheButton, {
			props: {
				label: "Minus",
				icon: "minus",
			},
		});

		await flushPromises();

		expect(wrapper.get("[data-dfv-icon=\"minus\"]").element.tagName).toBe("svg");
	});
});
