<script setup lang="ts">
import { E } from "@duplojs/utils";

interface Props {
	id?: string;
}

defineProps<Props>();

const model = defineModel<string>();

defineExpose({
	check: () => E.error([{ key: "inner-field" }]),
});
</script>

<template>
	<input
		id="test-text-input"
		v-model="model"
	/>
</template>
