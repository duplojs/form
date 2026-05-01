<script setup lang="ts">
import { type RepeatTemplateProperties } from "@duplojs/form/vue";

type Props = (
	& RepeatTemplateProperties["props"]
	& {
		addLabel?: string;
		removeLabel?: string;
		resetLabel?: string;
	}
);

defineProps<Props>();
defineSlots<RepeatTemplateProperties["slots"]>();
defineEmits<RepeatTemplateProperties["emits"]>();
</script>

<template>
	<div>
		<slot name="formField" />

		<button type="button" @click="$emit('addElement')">
			Add
		</button>
	</div>
</template>
