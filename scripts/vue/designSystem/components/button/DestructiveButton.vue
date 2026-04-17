<script setup lang="ts">
import TheButton, { type Props as TheButtonProps } from "./TheButton.vue";

export type Props = Pick<
	TheButtonProps,
	"label" | "size" | "icon" | "iconPosition" | "iconSize" | "type"
>;

defineProps<Props>();

</script>

<template>
	<TheButton
		variant="destructive"
		:type="type"
		:label="label"
		:size="size"
		:icon="icon"
		:icon-size="iconSize"
		:icon-position="iconPosition"
	/>
</template>
