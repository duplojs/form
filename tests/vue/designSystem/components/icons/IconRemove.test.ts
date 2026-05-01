import { IconRemove } from "@V/designSystem";
import { mount } from "@vue/test-utils";

describe("IconRemove", () => {
	it("renders the remove svg icon with default props", () => {
		const wrapper = mount(IconRemove);

		const svg = wrapper.get("svg.DFV-icon-svg");
		const paths = svg.findAll("path");

		expect(svg.attributes("viewBox")).toBe("0 0 20 20");
		expect(svg.attributes("fill")).toBe("none");
		expect(svg.attributes("xmlns")).toBe("http://www.w3.org/2000/svg");
		expect(svg.attributes("data-dfv-icon")).toBe("remove");
		expect(svg.attributes("style")).toContain("--DFV-icon-size: 1rem");

		expect(paths).toHaveLength(2);
		expect(paths[0]!.attributes("d")).toBe("M5 5L15 15");
		expect(paths[1]!.attributes("d")).toBe("M15 5L5 15");

		for (const path of paths) {
			expect(path.attributes("stroke")).toBe("currentColor");
			expect(path.attributes("stroke-width")).toBe("1.7");
			expect(path.attributes("stroke-linecap")).toBe("round");
			expect(path.attributes("stroke-linejoin")).toBe("round");
		}
	});

	it("renders custom size and stroke width", () => {
		const wrapper = mount(IconRemove, {
			props: {
				size: "2xl",
				strokeWidth: 2.5,
			},
		});

		const svg = wrapper.get("svg.DFV-icon-svg");

		expect(svg.attributes("style")).toContain("--DFV-icon-size: 1.5rem");

		for (const path of svg.findAll("path")) {
			expect(path.attributes("stroke-width")).toBe("2.5");
		}
	});
});
