<script setup lang="ts">
import IconRemove from "./icons/IconRemove.vue";

export interface Props {
	label: string;
}

defineProps<Props>();

</script>

<template>
	<button
		class="DFV-button-repeat-remove"
		type="button"
		:aria-label="label"
	>
		<IconRemove size="lg" />

		<span>{{ label }}</span>
	</button>
</template>
