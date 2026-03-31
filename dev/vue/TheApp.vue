<script setup lang="ts">
import { createInput, useDisabledLayout, createForm, useMultiLayout, useCheckLayout, useRepeatLayout, useUnionLayout, useStepLayout } from "@V";
import { useGridFormTemplate, useGridCheckTemplate, useGridRepeatTemplate, useGridUnionTemplate, useGridMultiTemplate, useGridInputTemplate, useGridStepByStepTemplate } from "@V/templates/grid";
import TheTextInput from "./components/TheTextInput.vue";
import { ref } from "vue";
import { DPE } from "@duplojs/utils";

const useInput = createInput(
	TheTextInput,
	{
		defaultValue: () => "test",
		props: { test: "" },
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
									useInput({ defaultValue: "tt" }),
									{
										max: 10,
										min: 2,
									},
								),
								age: useCheckLayout(
									useInput({ defaultValue: "198" }),
									{
										dataParser: DPE.coerce.number(),
										template: useGridCheckTemplate({
											label: "test",
											columns: 2,
											hideEmptyMessageError: true,
										}),
									},
								),
							}),
						],
						[
							"two",
							useInput({ defaultValue: "ooo" }),
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
			<button
				type="submit"
			>
				test
			</button>
		</Form>

		<button @click="disabled = !disabled">
			disabled
		</button>

		{{ currentValue }}
	</div>
</template>
