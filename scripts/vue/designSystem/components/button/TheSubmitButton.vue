<script setup lang="ts">
import TheButton, { type Props as TheButtonProps } from "./TheButton.vue";

export type Props = Pick<
	TheButtonProps,
	"className" | "disabled" | "label" | "size"
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
		:class-name="['DFV-submit-button', props.className]"
		type="submit"
		:label="props.label"
		:disabled="props.disabled"
		variant="primary"
		:size="props.size"
	/>
</template>
