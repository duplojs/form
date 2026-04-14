<script setup lang="ts">
export interface Props {
	fieldKey: string;
	options: {
		value: string;
		label: string;
	}[];
}

const props = defineProps<Props>();

const modelValue = defineModel<string>({ required: true });
</script>

<template>
	<select
		class="DFV-union-select-kind"
		v-model="modelValue"
		:id="`select-union-${props.fieldKey}`"
	>
		<option
			v-for="{value, label} in props.options"
			:value="value"
			:key="`${value}-${label}`"
		>
			{{ label }}
		</option>
	</select>
</template>
