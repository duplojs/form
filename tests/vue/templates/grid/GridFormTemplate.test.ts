import { createForm, createInput } from "@V";
import { mount } from "@vue/test-utils";
import TextInput from "@test-utils/TextInput.vue";
import { testTemplates } from "@test-utils/templates";
import { templatesGrid } from "@test-utils/grid";

describe("GridFormTemplate", () => {
	it("renders a real form with the grid form wrapper, container styles, and submitter slot", async() => {
		const useForm = createForm(testTemplates);
		const { component, currentValue } = useForm(
			createInput(TextInput, {
				defaultValue: "default",
			})(),
			{
				template: templatesGrid.useFormTemplate({
					maxColumns: 8,
					gap: 12,
				}),
			},
		);
		const wrapper = mount(component, {
			slots: {
				default: "<button id=\"grid-form-submitter\" type=\"submit\">submit</button>",
			},
		});

		const form = wrapper.get("form.DFV-grid-form");
		expect(form.element.tagName).toBe("FORM");

		const container = wrapper.get(".DFV-grid-container");
		expect(container.attributes("style")).toContain("--DFV-grid-max-columns: 8");
		expect(container.attributes("style")).toContain("--DFV-grid-gap: 12px");
		expect(container.get("#test-text-input").element.id).toBe("test-text-input");
		expect(wrapper.get("#grid-form-submitter").element.id).toBe("grid-form-submitter");

		await wrapper.get("#test-text-input").setValue("updated");
		expect(currentValue.value).toBe("updated");
	});

	it("handles form submit through the template submit listener", async() => {
		const useForm = createForm(testTemplates);
		const { component } = useForm(
			createInput(TextInput, {
				defaultValue: "default",
			})(),
			{
				template: templatesGrid.useFormTemplate(),
			},
		);
		const wrapper = mount(component, {
			slots: {
				default: "<button id=\"grid-form-submit\" type=\"submit\">submit</button>",
			},
		});

		await wrapper.get("form").trigger("submit");
		expect(wrapper.get("#grid-form-submit").element.id).toBe("grid-form-submit");
	});
});
