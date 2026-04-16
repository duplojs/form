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

export interface Model {
	start: number;
	end: number;
}

const model = defineModel<Model | undefined>();

// protect if min > max
const safeMin = computed(() => Math.min(props.min, props.max));
const safeMax = computed(() => Math.max(props.min, props.max));

function clamp(value: number) {
	return Math.min(
		Math.max(value, safeMin.value),
		safeMax.value,
	);
}

const startValue = computed({
	get: () => {
		const end = clamp(model.value?.end ?? safeMax.value);
		return Math.min(clamp(model.value?.start ?? safeMin.value), end);
	},
	set: (value: number) => {
		const end = clamp(model.value?.end ?? safeMax.value);
		model.value = {
			start: Math.min(clamp(value), end),
			end,
		};
	},
});

const endValue = computed({
	get: () => {
		const start = clamp(model.value?.start ?? safeMin.value);
		return Math.max(clamp(model.value?.end ?? safeMax.value), start);
	},
	set: (value: number) => {
		const start = clamp(model.value?.start ?? safeMin.value);
		model.value = {
			start,
			end: Math.max(clamp(value), start),
		};
	},
});

function toPercent(value: number) {
	if (safeMax.value <= safeMin.value) {
		return 0;
	}

	return ((value - safeMin.value) / (safeMax.value - safeMin.value)) * 100;
}

const startPercent = computed(() => toPercent(startValue.value));
const endPercent = computed(() => toPercent(endValue.value));

const rangeStyle = computed(() => ({
	"--DFV-dual-range-start": `${startPercent.value}%`,
	"--DFV-dual-range-width": `${Math.max(endPercent.value - startPercent.value, 0)}%`,
}));

</script>

<template>
	<div
		class="DFV-dual-range"
		:class="{ 'is-disabled': props.disabled }"
	>
		<div
			v-if="props.displayValue"
			class="DFV-dual-range-value"
			:style="{ '--DFV-range-value-position': `${startPercent}%` }"
		>
			{{ startValue }}
		</div>

		<div
			v-if="props.displayValue"
			class="DFV-dual-range-value"
			:style="{ '--DFV-range-value-position': `${endPercent}%` }"
		>
			{{ endValue }}
		</div>

		<div class="DFV-dual-range-track" />

		<div
			class="DFV-dual-range-range"
			:style="rangeStyle"
		/>

		<input
			class="DFV-dual-range-input DFV-dual-range-input-start"
			v-model.number="startValue"
			type="range"
			:min="safeMin"
			:max="safeMax"
			:step="props.step"
			:disabled="props.disabled"
		/>

		<input
			class="DFV-dual-range-input DFV-dual-range-input-end"
			v-model.number="endValue"
			type="range"
			:min="safeMin"
			:max="safeMax"
			:step="props.step"
			:disabled="props.disabled"
		/>
	</div>
</template>
