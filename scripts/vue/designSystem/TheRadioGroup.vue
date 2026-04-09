<script setup lang="ts">
import TheRadioInput from "./TheRadioInput.vue";

export interface Props {
	name: string;
	options: {
		value: string;
		label: string;
		description?: string;
	}[];
	disabled?: boolean;
}

const props = defineProps<Props>();

const model = defineModel<string | undefined>();
</script>

<template>
	<div
		class="DFV-radio-group"
		role="radiogroup"
	>
		<TheRadioInput
			v-for="(option, index) in props.options"
			:key="option.value"
			v-model="model"
			:id="`${props.name}-${index}`"
			:name="props.name"
			:value="option.value"
			:description="option.description"
			:disabled="props.disabled"
		>
			{{ option.label }}
		</TheRadioInput>
	</div>
</template>

<style lang="scss" scoped>
.DFV-radio-group {
	display: flex;
	flex-direction: column;
	gap: 0.45rem;
}
</style>
