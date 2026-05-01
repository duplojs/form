<script setup lang="ts">
import {
	NumberInput,
	TextInput,
	TextareaInput,
} from "@form/v0/vueDesignSystem";
import { ref } from "vue";

const text = ref("Hello");
const number = ref(42);
const description = ref("A longer message");
</script>

<template>
	<div style="display: grid; gap: 12px;">
		<TextInput
			v-model="text"
			placeholder="Your name"
		/>

		<NumberInput
			v-model="number"
			:min="0"
			:max="100"
		/>

		<TextareaInput
			v-model="description"
			placeholder="Description"
		/>
	</div>
</template>
