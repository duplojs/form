<script setup lang="ts">
import { computed } from "vue";

export interface Props {
	min?: number;
	max?: number;
	step?: number;
	disabled?: boolean;
}

const props = defineProps<Props>();

const model = defineModel<number | undefined>();

const progressPercent = computed(() => {
	const min = props.min ?? 0;
	const max = props.max ?? 100;
	const value = model.value ?? min;

	if (max <= min) {
		return 0;
	}

	const clampedValue = Math.min(Math.max(value, min), max);
	return ((clampedValue - min) / (max - min)) * 100;
});
</script>

<template>
	<input
		class="DFV-range"
		v-model.number="model"
		:style="{ '--range-progress': `${progressPercent}%` }"
		type="range"
		:min="props.min"
		:max="props.max"
		:step="props.step"
		:disabled="props.disabled"
	/>
</template>

<style lang="scss" scoped>
.DFV-range {
	--range-track: var(--DFV-color-neutral-200);
	--range-track-active: var(--DFV-color-neutral-500);
	--range-thumb: var(--DFV-color-neutral-500);
	--range-thumb-border: var(--DFV-color-neutral-600);
	--range-focus: var(--DFV-color-neutral-focus);
	--range-track-hover: var(--DFV-color-neutral-300);
	--range-progress: 0%;

	width: 100%;
	height: 1.35rem;
	margin: 0;
	padding: 0;
	appearance: none;
	background: transparent;
	cursor: pointer;

	&:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	&:focus-visible {
		outline: none;
	}

	&::-webkit-slider-runnable-track {
		height: 0.35rem;
		border-radius: 999px;
		background: linear-gradient(
			to right,
			var(--range-track-active) 0,
			var(--range-track-active) var(--range-progress),
			var(--range-track) var(--range-progress),
			var(--range-track) 100%
		);
		transition: background-color var(--DFV-transition-fast);
	}

	&::-webkit-slider-thumb {
		appearance: none;
		width: 1rem;
		height: 1rem;
		margin-top: -0.325rem;
		border: 1px solid var(--range-thumb-border);
		border-radius: 999px;
		background: var(--range-thumb);
		transition:
			transform var(--DFV-transition-fast),
			box-shadow var(--DFV-transition-fast);
	}

	&:hover::-webkit-slider-thumb {
		transform: scale(1.04);
	}

	&:focus-visible::-webkit-slider-thumb {
		box-shadow: 0 0 0 3px var(--range-focus);
	}

	&::-moz-range-track {
		height: 0.35rem;
		border: 0;
		border-radius: 999px;
		background: var(--range-track);
		transition: background-color var(--DFV-transition-fast);
	}

	&:hover::-moz-range-track {
		background: var(--range-track-hover);
	}

	&::-moz-range-progress {
		height: 0.35rem;
		border-radius: 999px;
		background: var(--range-track-active);
	}

	&::-moz-range-thumb {
		width: 1rem;
		height: 1rem;
		border: 1px solid var(--range-thumb-border);
		border-radius: 999px;
		background: var(--range-thumb);
		transition:
			transform var(--DFV-transition-fast),
			box-shadow var(--DFV-transition-fast);
	}

	&:hover::-moz-range-thumb {
		transform: scale(1.04);
	}

	&:focus-visible::-moz-range-thumb {
		box-shadow: 0 0 0 3px var(--range-focus);
	}
}
</style>
