import { IconMinus } from "@V/designSystem";
import { mount } from "@vue/test-utils";

describe("IconMinus", () => {
	it("renders the minus svg icon with default props", () => {
		const wrapper = mount(IconMinus);

		const svg = wrapper.get("svg.DFV-icon-svg");
		const path = svg.get("path");

		expect(svg.attributes("viewBox")).toBe("0 0 20 20");
		expect(svg.attributes("fill")).toBe("none");
		expect(svg.attributes("xmlns")).toBe("http://www.w3.org/2000/svg");
		expect(svg.attributes("data-dfv-icon")).toBe("minus");
		expect(svg.attributes("style")).toContain("--DFV-icon-size: 1rem");

		expect(path.attributes("d")).toBe("M5 10H15");
		expect(path.attributes("stroke")).toBe("currentColor");
		expect(path.attributes("stroke-width")).toBe("1.7");
		expect(path.attributes("stroke-linecap")).toBe("round");
		expect(path.attributes("stroke-linejoin")).toBe("round");
	});

	it("renders custom size and stroke width", () => {
		const wrapper = mount(IconMinus, {
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
