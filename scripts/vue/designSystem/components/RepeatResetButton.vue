<script setup lang="ts">
import IconReset from "./icons/IconReset.vue";

export interface Props {
	label: string;
}

defineProps<Props>();

</script>

<template>
	<button
		class="DFV-button-repeat-reset"
		type="button"
		:aria-label="label"
	>
		<IconReset size="lg" />

		<span>{{ label }}</span>
	</button>
</template>
