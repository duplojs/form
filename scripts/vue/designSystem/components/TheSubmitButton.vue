<script setup lang="ts">
export interface Props {
	label?: string;
	disabled?: boolean;
}

const props = withDefaults(
	defineProps<Props>(),
	{
		label: "Submit",
		disabled: false,
	},
);
</script>

<template>
	<button
		class="DFV-submit-button"
		type="submit"
		:aria-label="props.label"
		:disabled="props.disabled"
	>
		{{ props.label }}
	</button>
</template>
