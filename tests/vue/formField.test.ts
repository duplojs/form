import { createFormField } from "@V/formField";

describe("createFormField", () => {
	it("returns a form field structure with the provided constructor and default value", () => {
		const newImplementation = vi.fn();
		const defaultValue = { name: "default" };

		const result = createFormField(newImplementation, defaultValue);

		expect(result).toMatchObject({
			new: newImplementation,
			defaultValue,
		});
	});
});
