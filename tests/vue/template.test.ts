import { describe, expect, test } from "vitest";
import { createTemplate } from "@V";

describe("createTemplate", () => {
	test("creates a template whose vnode uses the provided component, props and slots", () => {
		const templateComponent = { name: "TemplateComponent" } as any;
		const useTemplate = createTemplate("check", templateComponent);
		const template = useTemplate();
		const slots = {
			default: () => "slot-content",
		};

		const vnode = template.getVNode(
			{
				fromRuntime: "runtime-value",
			},
			slots,
		);

		expect(vnode.type).toBe(templateComponent);
		expect(vnode.props).toMatchObject({
			fromRuntime: "runtime-value",
		});
		expect(vnode.children).toBe(slots);
	});

	test("merges default props, local props and runtime props in that order", () => {
		const templateComponent = { name: "TemplateComponent" } as any;
		const useTemplate = createTemplate(
			"check",
			templateComponent,
			{
				props: {
					shared: "default",
					fromDefault: "default-value",
				},
			},
		);
		const template = useTemplate({
			shared: "local",
			fromLocal: "local-value",
		});

		const vnode = template.getVNode(
			{
				shared: "runtime",
				fromRuntime: "runtime-value",
			},
			{},
		);

		expect(vnode.props).toMatchObject({
			shared: "runtime",
			fromDefault: "default-value",
			fromLocal: "local-value",
			fromRuntime: "runtime-value",
		});
	});
});
