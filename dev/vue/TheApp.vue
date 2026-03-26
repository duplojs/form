<script setup lang="ts">
import { createInput, useDisabledLayout, createForm, useMultiFieldLayout, useGridFormTemplate, useGridMultiFieldTemplate, useGridCheckTemplate, useCheckLayout } from "@V";
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
	multiField: useGridMultiFieldTemplate(),
	check: useGridCheckTemplate(),
});

const { component: Form, currentValue, check } = useForm(
	useDisabledLayout(
		useMultiFieldLayout({
			name: useInput({ defaultValue: "tt" }),
			age: useCheckLayout(
				useInput({ defaultValue: "198" }),
				{
					dataParser: DPE.coerce.number(),
				},
			),
		}),
		{
			isDisabled: () => disabled.value,
		},
	),
);

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
