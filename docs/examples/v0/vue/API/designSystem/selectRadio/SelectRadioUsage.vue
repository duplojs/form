<script setup lang="ts">
import {
	RadioGroup,
	SelectInput,
} from "@duplojs/form/vueDesignSystem";
import { ref } from "vue";

const kind = ref<string | null>("email");
const level = ref<string | null>("medium");
</script>

<template>
	<div style="display: grid; gap: 12px;">
		<SelectInput
			v-model="kind"
			:options="[
				{ value: 'email', label: 'Email' },
				{ value: 'phone', label: 'Phone' },
			]"
		/>

		<RadioGroup
			v-model="level"
			name="level"
			:options="[
				{ value: 'low', label: 'Low' },
				{ value: 'medium', label: 'Medium', description: 'Recommended' },
				{ value: 'high', label: 'High' },
			]"
		/>
	</div>
</template>
