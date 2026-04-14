<script setup lang="ts">
export interface Props {
	placeholder?: string;
	min?: number;
	max?: number;
	step?: number;
	disabled?: boolean;
}

const props = defineProps<Props>();

const model = defineModel<number>();

function onInput(event: InputEvent) {
	const input = event.target as HTMLInputElement;

	if (input.value !== "") {
		model.value = Number(input.value);
	}
	input.value = model.value?.toString() ?? "0";
}
</script>

<template>
	<input
		class="DFV-number-input"
		:value="model"
		@input="onInput"
		type="number"
		:placeholder="props.placeholder"
		:min="props.min"
		:max="props.max"
		:step="props.step"
		:disabled="props.disabled"
	/>
</template>
