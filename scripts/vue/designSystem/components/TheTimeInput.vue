<script setup lang="ts">
import { unwrap } from "@duplojs/utils";
import * as DD from "@duplojs/utils/date";
import * as EE from "@duplojs/utils/either";
import { computed } from "vue";

export interface Props {
	min?: DD.TheTime | DD.SerializedTheTime;
	max?: DD.TheTime | DD.SerializedTheTime;
	step?: number;
	disabled?: boolean;
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
		:step="props.step"
		:disabled="props.disabled"
	/>
</template>
