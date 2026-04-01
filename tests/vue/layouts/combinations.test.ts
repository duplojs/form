import { createForm, createInput, useCheckLayout, useDisabledLayout, useMultiLayout, useRepeatLayout, useStepLayout, useUnionLayout } from "@V";
import { DP, E, sleep } from "@duplojs/utils";
import { mount } from "@vue/test-utils";
import { ref } from "vue";
import TextInput from "@test-utils/TextInput.vue";
import { testTemplates } from "@test-utils/templates";

describe("layout combinations", () => {
	it("propagates deep currentValue mutations through nested multi, check, and repeat layouts", async() => {
		const useForm = createForm(testTemplates);
		const field = useMultiLayout({
			age: useCheckLayout(
				createInput(TextInput, { defaultValue: "1" })(),
				{
					dataParser: DP.coerce.number({ errorMessage: "Need number" }),
				},
			),
			tags: useRepeatLayout(
				createInput(TextInput, { defaultValue: "tag-default" })(),
				{
					min: 1,
					max: 3,
				},
			),
		});
		const { component, currentValue, check } = useForm(field);
		const wrapper = mount(component);

		currentValue.value.age = "42";
		currentValue.value.tags[0] = "first-tag";
		currentValue.value.tags.push("second-tag");
		await sleep();

		expect(wrapper.find("#multi-current-value").text()).toBe(JSON.stringify({
			age: "42",
			tags: ["first-tag", "second-tag"],
		}));
		expect(wrapper.find("#check-current-value").text()).toBe("42");
		expect(wrapper.find("#repeat-current-value").text()).toBe(JSON.stringify(["first-tag", "second-tag"]));

		const inputs = wrapper.findAll("#test-text-input");
		expect(inputs).toHaveLength(3);
		expect(inputs[0]!.element.value).toBe("42");
		expect(inputs[1]!.element.value).toBe("first-tag");
		expect(inputs[2]!.element.value).toBe("second-tag");

		expect(check()).toStrictEqual(
			E.success({
				age: 42,
				tags: ["first-tag", "second-tag"],
			}),
		);
	});

	it("keeps nested step, union, multi, repeat, disabled, and check layouts in sync when currentValue mutates deeply", async() => {
		const isDisabled = ref(false);
		const useForm = createForm(testTemplates);
		const field = useStepLayout(
			[
				useUnionLayout(
					[
						[
							"person",
							useMultiLayout({
								first: createInput(TextInput, { defaultValue: "first-default" })(),
								last: createInput(TextInput, { defaultValue: "last-default" })(),
							}),
						],
						[
							"tags",
							useRepeatLayout(
								createInput(TextInput, { defaultValue: "tag-default" })(),
								{
									min: 1,
									max: 2,
								},
							),
						],
					],
					{
						defaultKind: "person",
					},
				),
				useDisabledLayout(
					useCheckLayout(
						createInput(TextInput, { defaultValue: "10" })(),
						{
							dataParser: DP.coerce.number({ errorMessage: "Need number" }),
						},
					),
					{
						isDisabled: () => isDisabled.value,
					},
				),
			],
			{
				errorMessageNotAtLastStep: "Go to the end",
			},
		);
		const { component, currentValue, check } = useForm(field);
		const wrapper = mount(component);

		if (currentValue.value.steps[0].kind === "person") {
			currentValue.value.steps[0].value.first = "Ada";
			currentValue.value.steps[0].value.last = "Lovelace";
		}
		await sleep();

		expect(wrapper.find("#step-current").text()).toBe("0/2");
		expect(wrapper.find("#union-current-kind").text()).toBe("person");
		expect(wrapper.find("#multi-current-value").text()).toBe(JSON.stringify({
			first: "Ada",
			last: "Lovelace",
		}));
		expect(wrapper.findAll("#test-text-input")).toHaveLength(2);
		expect(wrapper.findAll("#test-text-input")[0]!.element.value).toBe("Ada");
		expect(wrapper.findAll("#test-text-input")[1]!.element.value).toBe("Lovelace");

		currentValue.value.steps[0].updateKind("tags");
		await sleep();

		expect(wrapper.find("#union-current-kind").text()).toBe("tags");
		expect(wrapper.find("#repeat-current-value").text()).toBe(JSON.stringify(["tag-default"]));
		expect(wrapper.findAll("#test-text-input")).toHaveLength(1);
		expect(wrapper.find("#test-text-input").element.value).toBe("tag-default");

		if (currentValue.value.steps[0].kind === "tags") {
			currentValue.value.steps[0].value[0] = "math";
			currentValue.value.steps[0].value.push("analysis");
		}
		await sleep();

		expect(wrapper.find("#union-current-value").text()).toBe(JSON.stringify({
			kind: "tags",
			value: ["math", "analysis"],
		}));
		expect(wrapper.find("#repeat-current-value").text()).toBe(JSON.stringify(["math", "analysis"]));
		expect(wrapper.findAll("#test-text-input")).toHaveLength(2);
		expect(wrapper.findAll("#test-text-input")[0]!.element.value).toBe("math");
		expect(wrapper.findAll("#test-text-input")[1]!.element.value).toBe("analysis");

		currentValue.value.currentStep = 1;
		currentValue.value.steps[1] = "11";
		await sleep();

		expect(wrapper.find("#step-current").text()).toBe("1/2");
		expect(wrapper.find("#step-is-last").text()).toBe("true");
		expect(wrapper.find("#check-current-value").text()).toBe("11");
		expect(wrapper.find("#test-text-input").element.value).toBe("11");

		isDisabled.value = true;
		await sleep();
		expect(wrapper.find("#check-field-key").exists()).toBe(false);

		isDisabled.value = false;
		await sleep();
		expect(wrapper.find("#check-current-value").text()).toBe("11");
		expect(wrapper.find("#test-text-input").element.value).toBe("11");

		expect(check()).toStrictEqual(
			E.success([
				{
					kind: "tags",
					value: ["math", "analysis"],
				},
				11,
			]),
		);
	});

	it("updates a step layout nested inside a multi layout when currentValue mutates at different depths", async() => {
		const useForm = createForm(testTemplates);
		const field = useMultiLayout({
			profile: useStepLayout(
				[
					createInput(TextInput, { defaultValue: "first-default" })(),
					useCheckLayout(
						createInput(TextInput, { defaultValue: "20" })(),
						{
							dataParser: DP.coerce.number({ errorMessage: "Need number" }),
						},
					),
				] as const,
				{
					errorMessageNotAtLastStep: "Go to the end",
				},
			),
			note: createInput(TextInput, { defaultValue: "note-default" })(),
		});
		const { component, currentValue, check } = useForm(field);
		const wrapper = mount(component);

		currentValue.value.profile.steps[0] = "Ada";
		currentValue.value.profile.currentStep = 1;
		currentValue.value.profile.steps[1] = "33";
		currentValue.value.note = "memo";
		await sleep();

		expect(wrapper.find("#multi-current-value").text()).toBe(JSON.stringify({
			profile: {
				currentStep: 1,
				steps: ["Ada", "33"],
			},
			note: "memo",
		}));
		expect(wrapper.find("#step-current").text()).toBe("1/2");
		expect(wrapper.find("#step-current-value").text()).toBe(JSON.stringify({
			currentStep: 1,
			steps: ["Ada", "33"],
		}));
		expect(wrapper.find("#check-current-value").text()).toBe("33");

		const inputs = wrapper.findAll("#test-text-input");
		expect(inputs).toHaveLength(2);
		expect(inputs[0]!.element.value).toBe("33");
		expect(inputs[1]!.element.value).toBe("memo");

		currentValue.value.profile.currentStep = 0;
		await sleep();
		expect(wrapper.find("#step-current").text()).toBe("0/2");
		expect(wrapper.find("#test-text-input").element.value).toBe("Ada");

		currentValue.value.profile.steps[0] = "Grace";
		await sleep();
		expect(wrapper.find("#step-current-value").text()).toBe(JSON.stringify({
			currentStep: 0,
			steps: ["Grace", "33"],
		}));
		expect(wrapper.find("#test-text-input").element.value).toBe("Grace");

		currentValue.value.profile.currentStep = 1;
		await sleep();
		expect(check()).toStrictEqual(
			E.success({
				profile: ["Grace", 33],
				note: "memo",
			}),
		);
	});

	it("keeps a step layout nested inside a union layout reactive across kind switches", async() => {
		const useForm = createForm(testTemplates);
		const field = useUnionLayout(
			[
				[
					"wizard",
					useStepLayout(
						[
							createInput(TextInput, { defaultValue: "start-default" })(),
							useRepeatLayout(
								createInput(TextInput, { defaultValue: "item-default" })(),
								{
									min: 1,
									max: 3,
								},
							),
						] as const,
						{
							errorMessageNotAtLastStep: "Go to the end",
						},
					),
				],
				[
					"single",
					createInput(TextInput, { defaultValue: "single-default" })(),
				],
			] as const,
			{
				defaultKind: "wizard",
			},
		);
		const { component, currentValue, check } = useForm(field);
		const wrapper = mount(component);

		if (currentValue.value.kind === "wizard") {
			currentValue.value.value.currentStep = 1;
			currentValue.value.value.steps[0] = "start-value";
			currentValue.value.value.steps[1][0] = "first-item";
			currentValue.value.value.steps[1].push("second-item");
		}
		await sleep();

		expect(wrapper.find("#union-current-kind").text()).toBe("wizard");
		expect(wrapper.find("#step-current").text()).toBe("1/2");
		expect(wrapper.find("#repeat-current-value").text()).toBe(JSON.stringify(["first-item", "second-item"]));
		expect(wrapper.findAll("#test-text-input")).toHaveLength(2);
		expect(wrapper.findAll("#test-text-input")[0]!.element.value).toBe("first-item");
		expect(wrapper.findAll("#test-text-input")[1]!.element.value).toBe("second-item");

		currentValue.value.updateKind("single", "single-from-current-value");
		await sleep();

		expect(wrapper.find("#union-current-kind").text()).toBe("single");
		expect(wrapper.find("#union-current-value").text()).toBe(JSON.stringify({
			kind: "single",
			value: "single-from-current-value",
		}));
		expect(wrapper.find("#test-text-input").element.value).toBe("single-from-current-value");

		currentValue.value.updateKind("wizard");
		await sleep();

		expect(wrapper.find("#union-current-kind").text()).toBe("wizard");
		expect(wrapper.find("#step-current").text()).toBe("1/2");
		expect(wrapper.find("#repeat-current-value").text()).toBe(JSON.stringify(["first-item", "second-item"]));
		expect(wrapper.findAll("#test-text-input")[0]!.element.value).toBe("first-item");
		expect(wrapper.findAll("#test-text-input")[1]!.element.value).toBe("second-item");

		expect(check()).toStrictEqual(
			E.success({
				kind: "wizard",
				value: ["start-value", ["first-item", "second-item"]],
			}),
		);
	});
});
