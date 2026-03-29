<script setup lang="ts">
import { createInput, useDisabledLayout, createForm, useMultiLayout, useGridFormTemplate, useGridMultiTemplate, useGridCheckTemplate, useCheckLayout, useGridRepeatTemplate, useRepeatLayout, useGridUnionTemplate, useUnionLayout } from "@V";
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
	multi: useGridMultiTemplate(),
	check: useGridCheckTemplate(),
	repeat: useGridRepeatTemplate(),
	union: useGridUnionTemplate(),
});

const { component: Form, currentValue, check } = useForm(
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
		{
			isDisabled: () => disabled.value,
		},
	),
);

// const { component: Form, currentValue, check } = useForm(
// 	useRepeatLayout(
// 		useDisabledLayout(
// 			useMultiFieldLayout({
// 				name: useCheckLayout(
// 					useInput({ defaultValue: "198" }),
// 					{ dataParser: DPE.coerce.number() },
// 				),
// 			}),
// 			{
// 				isDisabled: () => disabled.value,
// 			},
// 		),
// 		{
// 			min: 2,
// 			max: 10,
// 		},
// 	),
// );

</script>

<template>
	<div>
		<Form @submit="console.log(check())">
			<button type="submit">
				test
			</button>
		</Form>

		<button @click="disabled = !disabled">
			disabled
		</button>

		{{ currentValue }}
	</div>
</template>
