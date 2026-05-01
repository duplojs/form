<script setup lang="ts">
import { unwrap } from "@duplojs/utils";
import * as DD from "@duplojs/utils/date";
import * as EE from "@duplojs/utils/either";
import { computed } from "vue";

export interface Props {
	min?: DD.TheTime | DD.SerializedTheTime;
	max?: DD.TheTime | DD.SerializedTheTime;
}

const props = defineProps<Props>();

const model = defineModel<DD.TheTime | DD.SerializedTheTime | null>();

const modelValue = computed({
	get: () => model.value
		? DD.formatTime(model.value, "HH:mm")
		: model.value,
	set: (value) => {
		const result = DD.createTime({ value: value ?? "" });

		if (EE.isRight(result)) {
			model.value = unwrap(result);
		} else {
			model.value = null;
		}
	},
});

const rangeDate = computed(
	() => ({
		min: props.min && DD.formatTime(props.min, "HH:mm"),
		max: props.max && DD.formatTime(props.max, "HH:mm"),
	}),
);
</script>

<template>
	<input
		class="DFV-time-input"
		v-model="modelValue"
		type="time"
		:min="rangeDate.min"
		:max="rangeDate.max"
	/>
</template>

<style lang="scss">
.DFV-time-input {
	--DFV-time-input-width: 100%;
	--DFV-time-input-background: var(--DFV-color-white);
	--DFV-time-input-foreground: var(--DFV-muted-foreground);
	--DFV-time-input-border-color: var(--DFV-muted-border);
	--DFV-time-input-hover-border-color: var(--DFV-muted-border-strong);
	--DFV-time-input-focus-border-color: var(--DFV-primary);
	--DFV-time-input-focus: var(--DFV-primary-focus);

	box-sizing: border-box;
	width: var(--DFV-time-input-width);
	padding: var(--DFV-spacing-sm);
	border: 1px solid var(--DFV-time-input-border-color);
	border-radius: var(--DFV-radius-sm);
	background: var(--DFV-time-input-background);
	color: var(--DFV-time-input-foreground);
	font-size: var(--DFV-font-size-sm);
	font-weight: var(--DFV-font-weight-medium);
	line-height: var(--DFV-line-height-tight);
	transition:
		border-color var(--DFV-transition-fast),
		box-shadow var(--DFV-transition-fast),
		background-color var(--DFV-transition-fast);

	&:hover {
		border-color: var(--DFV-time-input-hover-border-color);
	}

	&:focus-visible {
		outline: none;
		border-color: var(--DFV-time-input-focus-border-color);
		box-shadow: 0 0 0 2px var(--DFV-time-input-focus);
	}
}
</style>
