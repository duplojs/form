<script setup lang="ts">
import * as EE from "@duplojs/utils/either";
import "@duplojs/form/vueDesignSystem.css";
import "@duplojs/form/vueGrid.css";
import { createForm, useMultiLayout, useRepeatLayout, useUnionLayout, type GetCheckedValue } from "@duplojs/form/vue";
import { createGridTemplates } from "@duplojs/form/vueGrid";
import { PrimaryButton, templateFormAddButton, templateFormNextButton, templateFormPreviousButton, templateFormRemoveButton, templateFormResetButton, templateFormSelect, useNumberInput, useTextareaInput, useTextInput } from "@duplojs/form/vueDesignSystem";
import { ref } from "vue";
import { unwrap } from "@duplojs/utils";

const templatesGrid = createGridTemplates({
	repeat: {
		addLabel: "Add another item",
		removeLabel: "Remove this item",
		addButton: templateFormAddButton,
		removeButton: templateFormRemoveButton,
		resetButton: templateFormResetButton,
	},
	step: {
		nextLabel: "Continue",
		previousLabel: "Back",
		resetButton: templateFormResetButton,
		nextButton: templateFormNextButton,
		previousButton: templateFormPreviousButton,
	},
	union: { selectInputKind: templateFormSelect },
});

const useForm = createForm(templatesGrid.useTemplates());

const { component: Form, currentValue, check } = useForm(
	useUnionLayout(
		[
			[
				"one",
				useTextInput({ defaultValue: "test" }),
			],
			[
				"two",
				useMultiLayout({
					prop1: useNumberInput(),
					prop2: useUnionLayout(
						[
							["subOne", useTextInput()],
							["subTwo", useTextareaInput({ defaultValue: "long text" })],
						],
						{ defaultKind: "subTwo" },
					),
				}),
			],
			[
				"three",
				useRepeatLayout(
					useUnionLayout(
						[
							["text", useTextInput()],
							["number", useTextareaInput({ defaultValue: "long text" })],
							["file", useTextareaInput({ defaultValue: "long text" })],
						],
						{ defaultKind: "file" },
					),
					{ max: 10 },
				),
			],
		],
		{
			defaultKind: "one",
			template: templatesGrid.useUnionTemplate({
				labels: {
					one: "un",
				},
			}),
		},
	),
);

const checkedValue = ref<GetCheckedValue<typeof check> | null>(null);

function submit() {
	const result = check();
	if (EE.isLeft(result)) {
		return;
	}

	checkedValue.value = unwrap(result);
}
</script>

<template>
	<div>
		<Form @submit="submit">
			<PrimaryButton>submit</PrimaryButton>
		</Form>

		<div id="current-value">
			{{ currentValue }}
		</div>

		<div id="checked-value">
			{{ checkedValue }}
		</div>
	</div>
</template>
