<script setup lang="ts">
import { unwrap } from "@duplojs/utils";
import * as DD from "@duplojs/utils/date";
import * as EE from "@duplojs/utils/either";
import { computed } from "vue";

export interface Props {
	min?: DD.TheDate | DD.SerializedTheDate;
	max?: DD.TheDate | DD.SerializedTheDate;
	disabled?: boolean;
}

const props = defineProps<Props>();

const model = defineModel<DD.TheDate | DD.SerializedTheDate | null>();

const modelValue = computed({
	get: () => model.value
		? DD.format(model.value, "YYYY-MM-DD", "UTC")
		: model.value,
	set: (value) => {
		const result = DD.create(new Date(value ?? NaN));

		if (EE.isRight(result)) {
			model.value = unwrap(result);
		} else {
			model.value = null;
		}
	},
});

const rangeDate = computed(
	() => ({
		min: props.min && DD.format(props.min, "YYYY-MM-DD", "UTC"),
		max: props.max && DD.format(props.max, "YYYY-MM-DD", "UTC"),
	}),
);
</script>

<template>
	<input
		class="DFV-date-input"
		v-model="modelValue"
		type="date"
		:min="rangeDate.min"
		:max="rangeDate.max"
		:disabled="props.disabled"
	/>
</template>
