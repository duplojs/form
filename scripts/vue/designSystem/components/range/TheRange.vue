<script setup lang="ts">
import { computed } from "vue";

export interface Props {
	min?: number;
	max?: number;
	step?: number;
	disabled?: boolean;
	displayValue?: boolean;
}

const props = withDefaults(
	defineProps<Props>(),
	{
		min: 0,
		max: 100,
		disabled: false,
		displayValue: false,
	},
);

const model = defineModel<number | undefined>();

const progressPercent = computed(() => {
	const value = model.value ?? props.min;

	if (props.max <= props.min) {
		return 0;
	}

	const clampedValue = Math.min(Math.max(value, props.min), props.max);
	return ((clampedValue - props.min) / (props.max - props.min)) * 100;
});
</script>

<template>
	<div class="DFV-range">
		<div
			v-if="props.displayValue"
			class="DFV-range-value"
			:style="{ '--DFV-range-value-position': `${progressPercent}%` }"
		>
			{{ model ?? props.min }}
		</div>

		<input
			class="DFV-range-input"
			v-model.number="model"
			:style="{ '--range-progress': `${progressPercent}%` }"
			type="range"
			:min="props.min"
			:max="props.max"
			:step="props.step"
			:disabled="props.disabled"
		/>
	</div>
</template>
