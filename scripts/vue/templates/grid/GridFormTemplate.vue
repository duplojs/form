<script setup lang="ts">
import { type FormTemplateProperties } from "@V/form";

export type Props = {
	test: string;
} & FormTemplateProperties["props"];

defineProps<Props>();

defineSlots<FormTemplateProperties["slots"]>();

const emit = defineEmits<FormTemplateProperties["emits"]>();

function submit(event: SubmitEvent) {
	event.preventDefault();
	emit("submit");
}

</script>

<template>
	<form @submit="submit">
		<slot name="formField" />
		{{ test }}
		<slot name="submitter" />
	</form>
</template>
