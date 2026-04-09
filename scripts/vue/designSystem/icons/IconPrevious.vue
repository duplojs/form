<script setup lang="ts">
import { computed } from "vue";

import { DFV_ICON_SIZES, type DfvIconSize } from "./index";

const props = withDefaults(
	defineProps<{
		size?: DfvIconSize;
		strokeWidth?: number;
	}>(),
	{
		size: "md",
		strokeWidth: 1.7,
	},
);

const iconStyle = computed(() => ({
	"--DFV-icon-size": DFV_ICON_SIZES[props.size],
}));
</script>

<template>
	<svg
		class="DFV-icon-svg"
		:style="iconStyle"
		viewBox="0 0 20 20"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			d="M13 5L7 10L13 15"
			stroke="currentColor"
			:stroke-width="strokeWidth"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
	</svg>
</template>

<style scoped lang="scss">
.DFV-icon-svg {
	display: block;
	height: var(--DFV-icon-size);
	width: var(--DFV-icon-size);
}
</style>
