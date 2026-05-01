<script setup lang="ts">
export interface Props {
	placeholder?: string;
}

const props = defineProps<Props>();

const model = defineModel<string>({ required: true });
</script>

<template>
	<input
		v-model="model"
		type="text"
		:placeholder="props.placeholder"
	/>
</template>
