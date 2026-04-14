<script setup lang="ts">
export interface Props {
	placeholder?: string;
	disabled?: boolean;
}

const props = defineProps<Props>();

const model = defineModel<string>();
</script>

<template>
	<input
		class="DFV-text-input"
		v-model="model"
		type="text"
		:placeholder="props.placeholder"
		:disabled="props.disabled"
	/>
</template>
