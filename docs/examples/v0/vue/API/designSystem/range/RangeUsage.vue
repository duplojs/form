<script setup lang="ts">
import {
	DualRangeInput,
	RangeInput,
} from "@duplojs/form/vueDesignSystem";
import { ref } from "vue";

const value = ref(35);
const interval = ref({
	start: 20,
	end: 80,
});
</script>

<template>
	<div style="display: grid; gap: 12px;">
		<RangeInput
			v-model="value"
			:min="0"
			:max="100"
			manual
		/>

		<DualRangeInput
			v-model="interval"
			:min="0"
			:max="100"
			manual
		/>
	</div>
</template>
