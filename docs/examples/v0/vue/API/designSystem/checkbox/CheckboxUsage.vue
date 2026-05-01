<script setup lang="ts">
import {
	CheckboxPolicy,
	TheCheckbox,
} from "@form/v0/vueDesignSystem";
import { ref } from "vue";

const checked = ref(false);
const accepted = ref(false);
</script>

<template>
	<div style="display: grid; gap: 12px;">
		<TheCheckbox
			v-model="checked"
			id="newsletter"
			label="Subscribe to newsletter"
		/>

		<CheckboxPolicy
			v-model="accepted"
			id="terms"
			title="Accept terms"
			description="You must accept before continuing."
			required
		/>
	</div>
</template>
