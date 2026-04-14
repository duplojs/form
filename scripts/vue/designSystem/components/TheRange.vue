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
