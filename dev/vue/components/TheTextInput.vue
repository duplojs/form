<script setup lang="ts">
interface Props {
	test: string;
}

defineProps<Props>();

const model = defineModel<string>();

</script>

<template>
	<input v-model="model" />
</template>
