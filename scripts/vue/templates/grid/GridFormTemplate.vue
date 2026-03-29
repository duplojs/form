<script setup lang="ts">
import { type FormTemplateProperties } from "@V/form";

export type Props = FormTemplateProperties["props"];

defineProps<Props>();

defineSlots<FormTemplateProperties["slots"]>();

const emit = defineEmits<FormTemplateProperties["emits"]>();

function submit(event: SubmitEvent) {
	event.preventDefault();
	event.stopPropagation();
	event.stopImmediatePropagation();
	emit("submit");
}

</script>

<template>
	<form @submit="submit">
		<slot name="formField" />

		<slot name="submitter" />
	</form>
</template>
