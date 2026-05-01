<script setup lang="ts">
const model = defineModel({ required: true });
</script>

<template>
	<input
		type="text"
		v-model="model"
	/>
</template>
