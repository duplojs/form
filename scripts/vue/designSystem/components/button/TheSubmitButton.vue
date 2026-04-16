<script setup lang="ts">
import TheButton, { type Props as TheButtonProps } from "./TheButton.vue";

export type Props = Pick<
	TheButtonProps,
	"disabled" | "label" | "size"
>;

const props = withDefaults(
	defineProps<Props>(),
	{
		label: "Submit",
		size: "md",
		disabled: false,
	},
);
</script>

<template>
	<TheButton
		class="DFV-submit-button"
		type="submit"
		:label="props.label"
		:disabled="props.disabled"
		variant="primary"
		:size="props.size"
	/>
</template>
