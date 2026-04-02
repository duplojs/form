<script setup lang="ts">
import { createInput, useDisabledLayout, createForm, useMultiLayout, useCheckLayout, useRepeatLayout, useUnionLayout, useStepLayout } from "@V";
import { useGridFormTemplate, useGridCheckTemplate, useGridRepeatTemplate, useGridUnionTemplate, useGridMultiTemplate, useGridInputTemplate, useGridStepByStepTemplate } from "@V/templates/grid";
import TheTextInput from "./components/TheTextInput.vue";
import { ref } from "vue";
import { DPE } from "@duplojs/utils";

const useInput = createInput(
	TheTextInput,
	{
		defaultValue: () => "Default value",
		props: { text: "" },
	},
);

const disabled = ref(false);

const useForm = createForm({
	form: useGridFormTemplate(),
	input: useGridInputTemplate(),
	multi: useGridMultiTemplate(),
	check: useGridCheckTemplate(),
	repeat: useGridRepeatTemplate(),
	union: useGridUnionTemplate(),
	step: useGridStepByStepTemplate(),
});

const { component: Form, currentValue, check } = useForm(
	useStepLayout(
		[
			useDisabledLayout(
				useUnionLayout(
					[
						[
							"one",
							useMultiLayout({
								name: useRepeatLayout(
									useInput({ defaultValue: "Default value" }),
									{
										max: 10,
										min: 2,
									},
								),
								age: useCheckLayout(
									useInput({ defaultValue: "26" }),
									{
										dataParser: DPE.coerce.number(),
										template: useGridCheckTemplate({
											label: "Check age",
											columns: 2,
											hideEmptyMessageError: true,
										}),
									},
								),
							}),
						],
						[
							"two",
							useInput({ defaultValue: "Another default value" }),
						],
					],
					{ defaultKind: "one" },
				),
				{ isDisabled: () => disabled.value },
			),
			useInput({ defaultValue: "two step" }),
		],
		{ errorMessageNotAtLastStep: "not a finish" },
	),
);
</script>

<template>
	<div>
		<Form @submit="console.log(check())">
			<button type="submit">
				Submit
			</button>
		</Form>

		<button @click="disabled = !disabled">
			disabled
		</button>

		{{ currentValue }}
	</div>
</template>
