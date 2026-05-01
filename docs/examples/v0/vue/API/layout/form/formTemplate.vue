<script setup lang="ts">
import { type FormTemplateProperties } from "@form/v0/vue";

defineProps<FormTemplateProperties["props"]>();
defineSlots<FormTemplateProperties["slots"]>();
defineEmits<FormTemplateProperties["emits"]>();
</script>

<template>
	<form>
		<slot name="formField" />

		<slot name="submitter" />
	</form>
</template>
