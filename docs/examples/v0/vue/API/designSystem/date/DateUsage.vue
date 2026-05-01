<script setup lang="ts">
import {
	DateInput,
	RangeDateInput,
} from "@duplojs/form/vueDesignSystem";
import * as DD from "@duplojs/utils/date";
import { ref } from "vue";

const date = ref(DD.now());
const range = ref({
	from: DD.now(),
	to: DD.addDays(DD.now(), 3),
});
</script>

<template>
	<div style="display: grid; gap: 12px;">
		<DateInput v-model="date" />

		<RangeDateInput v-model="range" />
	</div>
</template>
