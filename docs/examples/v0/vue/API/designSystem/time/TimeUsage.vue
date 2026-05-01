<script setup lang="ts">
import {
	RangeTimeInput,
	TimeInput,
} from "@duplojs/form/vueDesignSystem";
import * as DD from "@duplojs/utils/date";
import { ref } from "vue";

const time = ref(DD.createTime(9, "hour"));
const range = ref({
	from: DD.createTime(9, "hour"),
	to: DD.createTime(17, "hour"),
});
</script>

<template>
	<div style="display: grid; gap: 12px;">
		<TimeInput v-model="time" />

		<RangeTimeInput v-model="range" />
	</div>
</template>
