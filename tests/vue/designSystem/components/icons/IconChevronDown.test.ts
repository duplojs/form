import { IconChevronDown } from "@V/designSystem";
import { mount } from "@vue/test-utils";

describe("IconChevronDown", () => {
	it("renders the chevron down svg icon with default props", () => {
		const wrapper = mount(IconChevronDown);

		const svg = wrapper.get("svg.DFV-icon-svg");
		const path = svg.get("path");

		expect(svg.attributes("viewBox")).toBe("0 0 20 20");
		expect(svg.attributes("fill")).toBe("none");
		expect(svg.attributes("xmlns")).toBe("http://www.w3.org/2000/svg");
		expect(svg.attributes("data-dfv-icon")).toBe("chevron-down");
		expect(svg.attributes("style")).toContain("--DFV-icon-size: 1rem");

		expect(path.attributes("d")).toBe("M5 7.5L10 12.5L15 7.5");
		expect(path.attributes("stroke")).toBe("currentColor");
		expect(path.attributes("stroke-width")).toBe("1.8");
		expect(path.attributes("stroke-linecap")).toBe("round");
		expect(path.attributes("stroke-linejoin")).toBe("round");
	});

	it("renders custom size and stroke width", () => {
		const wrapper = mount(IconChevronDown, {
			props: {
				size: "2xl",
				strokeWidth: 2.5,
			},
		});

		const svg = wrapper.get("svg.DFV-icon-svg");

		expect(svg.attributes("style")).toContain("--DFV-icon-size: 1.5rem");
		expect(svg.get("path").attributes("stroke-width")).toBe("2.5");
	});
});
