<script setup lang="ts">
export interface Props {
	placeholder?: string;
	disabled?: boolean;
}

const props = defineProps<Props>();

const model = defineModel<string>();
</script>

<template>
	<textarea
		class="DFV-text-area"
		v-model="model"
		:placeholder="props.placeholder"
		:disabled="props.disabled"
	/>
</template>
