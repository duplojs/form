<script setup lang="ts">
import IconPlus from "./icons/IconPlus.vue";

export interface Props {
	label: string;
}

defineProps<Props>();
</script>

<template>
	<button
		class="DFV-button-repeat-add"
		type="button"
		:aria-label="label"
	>
		<IconPlus size="lg" />

		<span>{{ label }}</span>
	</button>
</template>
