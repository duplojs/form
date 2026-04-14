<script setup lang="ts">
import IconPrevious from "./icons/IconPrevious.vue";

export interface Props {
	label: string;
}

defineProps<Props>();
</script>

<template>
	<button
		class="DFV-button-step-previous"
		type="button"
		:aria-label="label"
	>
		<IconPrevious size="lg" />

		{{ label }}
	</button>
</template>
