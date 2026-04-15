<script setup lang="ts">
import TheButton, { type Props as TheButtonProps } from "./TheButton.vue";

export type Props = Pick<
	TheButtonProps,
	"className" | "disabled" | "iconPosition" | "iconSize" | "label" | "size"
>;

const props = withDefaults(
	defineProps<Props>(),
	{
		label: "Add",
		size: "sm",
		iconSize: "lg",
		iconPosition: "start",
		disabled: false,
	},
);
</script>

<template>
	<TheButton
		:class-name="['DFV-button-repeat-add', props.className]"
		:label="props.label"
		variant="primary"
		:size="props.size"
		icon="plus"
		:icon-size="props.iconSize"
		:icon-position="props.iconPosition"
		:disabled="props.disabled"
	/>
</template>
