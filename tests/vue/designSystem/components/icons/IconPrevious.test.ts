import { IconPrevious } from "@V/designSystem";
import { mount } from "@vue/test-utils";

describe("IconPrevious", () => {
	it("renders the previous svg icon with default props", () => {
		const wrapper = mount(IconPrevious);

		const svg = wrapper.get("svg.DFV-icon-svg");
		const path = svg.get("path");

		expect(svg.attributes("viewBox")).toBe("0 0 20 20");
		expect(svg.attributes("fill")).toBe("none");
		expect(svg.attributes("xmlns")).toBe("http://www.w3.org/2000/svg");
		expect(svg.attributes("data-dfv-icon")).toBe("previous");
		expect(svg.attributes("style")).toContain("--DFV-icon-size: 1rem");

		expect(path.attributes("d")).toBe("M13 5L7 10L13 15");
		expect(path.attributes("stroke")).toBe("currentColor");
		expect(path.attributes("stroke-width")).toBe("1.7");
		expect(path.attributes("stroke-linecap")).toBe("round");
		expect(path.attributes("stroke-linejoin")).toBe("round");
	});

	it("renders custom size and stroke width", () => {
		const wrapper = mount(IconPrevious, {
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
