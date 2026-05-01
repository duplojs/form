<script setup lang="ts">
import * as EE from "@duplojs/utils/either";
import { unwrap } from "@duplojs/utils";
import { OutlineButton, PrimaryButton } from "@duplojs/form/vueDesignSystem";
import { onBeforeUnmount, ref } from "vue";
import {
	type ContactFormSubmitValue,
	useContactForm,
} from "./contactForm";

const {
	ContactForm,
	checkContactForm,
	currentContactValue,
	resetContactForm,
	disposeContactForm,
} = useContactForm();

const submitResult = ref<ContactFormSubmitValue | null>(null);

function submit() {
	const result = checkContactForm();

	if (EE.isRight(result)) {
		submitResult.value = unwrap(result);
	}
}

function reset() {
	resetContactForm();
	submitResult.value = null;
}

onBeforeUnmount(disposeContactForm);
</script>

<template>
	<ContactForm @submit="submit">
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
	</ContactForm>

	<pre>currentValue: {{ currentContactValue }}</pre>

	<pre>checkedValue: {{ submitResult }}</pre>
</template>
