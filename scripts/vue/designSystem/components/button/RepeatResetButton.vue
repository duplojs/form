<script setup lang="ts">
import TheButton, { type Props as TheButtonProps } from "./TheButton.vue";

export type Props = Pick<
	TheButtonProps,
	"disabled" | "iconPosition" | "iconSize" | "label" | "size"
>;

const props = withDefaults(
	defineProps<Props>(),
	{
		label: "Reset",
		size: "sm",
		iconSize: "lg",
		iconPosition: "start",
		disabled: false,
	},
);

</script>

<template>
	<TheButton
		class="DFV-button-repeat-reset"
		:label="props.label"
		variant="outline"
		:size="props.size"
		icon="reset"
		:icon-size="props.iconSize"
		:icon-position="props.iconPosition"
		:disabled="props.disabled"
	/>
</template>
