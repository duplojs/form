<script setup lang="ts">
import * as EE from "@duplojs/utils/either";
import { unwrap } from "@duplojs/utils";
import { OutlineButton, PrimaryButton } from "@duplojs/form/vueDesignSystem";
import { onBeforeUnmount, ref } from "vue";
import { useFormWithCustomTemplate } from "./templateForm";

const {
	FormWithCustomTemplate,
	checkFormWithCustomTemplate,
	currentFormWithCustomTemplateValue,
	resetFormWithCustomTemplate,
	disposeFormWithCustomTemplate,
} = useFormWithCustomTemplate();

const submitResult = ref<unknown>(null);

function submit() {
	const result = checkFormWithCustomTemplate();

	if (EE.isRight(result)) {
		submitResult.value = unwrap(result);
	}
}

function reset() {
	resetFormWithCustomTemplate();
	submitResult.value = null;
}

onBeforeUnmount(disposeFormWithCustomTemplate);
</script>

<template>
	<FormWithCustomTemplate @submit="submit">
		<div style="display: flex; gap: 8px; margin-top: 16px;">
			<PrimaryButton
				type="submit"
				label="Submit"
			/>

			<OutlineButton
				type="button"
				label="Reset"
				@click="reset"
			/>
		</div>
	</FormWithCustomTemplate>

	<pre>currentValue: {{ currentFormWithCustomTemplateValue }}</pre>

	<pre>checkedValue: {{ submitResult }}</pre>
</template>
