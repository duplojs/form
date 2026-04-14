<script setup lang="ts">
import IconReset from "./icons/IconReset.vue";

export interface Props {
	label?: string;
}

const props = withDefaults(
	defineProps<Props>(),
	{
		label: "Reset",
	},
);
</script>

<template>
	<button
		class="DFV-button-step-reset"
		type="button"
		:aria-label="props.label"
	>
		<IconReset size="lg" />

		{{ props.label }}
	</button>
</template>
