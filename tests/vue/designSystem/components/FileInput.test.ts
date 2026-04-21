import { FileInput } from "@V/designSystem";
import { mount } from "@vue/test-utils";

describe("FileInput", () => {
	it("renders a file input with accept and multiple props", () => {
		const wrapper = mount(FileInput, {
			props: {
				accept: "image/png",
				multiple: true,
			},
		});

		const input = wrapper.get<HTMLInputElement>("input.DFV-file-input");

		expect(input.attributes("type")).toBe("file");
		expect(input.attributes("accept")).toBe("image/png");
		expect(input.attributes("multiple")).toBe("");
	});

	it("does not render multiple by default", () => {
		const wrapper = mount(FileInput);

		expect(wrapper.get("input.DFV-file-input").attributes("multiple")).toBeUndefined();
	});

	it("emits selected files when the input changes", async() => {
		const wrapper = mount(FileInput);
		const file = new File(["hello"], "hello.txt", { type: "text/plain" });
		const input = wrapper.get<HTMLInputElement>("input");

		Object.defineProperty(input.element, "files", {
			value: [file],
			configurable: true,
		});
		await input.trigger("change");

		expect(wrapper.emitted("update:modelValue")).toEqual([[[file]]]);
	});

	it("emits undefined when no file is selected", async() => {
		const wrapper = mount(FileInput);
		const input = wrapper.get<HTMLInputElement>("input");

		Object.defineProperty(input.element, "files", {
			value: [],
			configurable: true,
		});
		await input.trigger("change");

		expect(wrapper.emitted("update:modelValue")).toBeUndefined();
	});
});
