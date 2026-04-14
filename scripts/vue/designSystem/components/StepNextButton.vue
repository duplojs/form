<script setup lang="ts">
import IconNext from "./icons/IconNext.vue";

export interface Props {
	label: string;
}

defineProps<Props>();

</script>

<template>
	<button
		class="DFV-button-step-next"
		type="button"
		:aria-label="label"
	>
		<span>{{ label }}</span>

		<IconNext size="lg" />
	</button>
</template>
