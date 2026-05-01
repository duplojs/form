<script setup lang="ts">
import { FileInput } from "@form/v0/vueDesignSystem";
import { ref } from "vue";

const files = ref<File[] | null>(null);
</script>

<template>
	<FileInput
		v-model="files"
		accept=".pdf,.png"
		multiple
	/>
</template>
