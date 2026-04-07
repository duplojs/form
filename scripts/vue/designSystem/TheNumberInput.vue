<script setup lang="ts">
export interface Props {
	placeholder?: string;
	min?: number;
	max?: number;
	step?: number;
	disabled?: boolean;
}

const props = defineProps<Props>();

const model = defineModel<number | undefined>();
</script>

<template>
	<input
		class="DFV-number-input"
		v-model.number="model"
		type="number"
		:placeholder="props.placeholder"
		:min="props.min"
		:max="props.max"
		:step="props.step"
		:disabled="props.disabled"
	/>
</template>

<style lang="scss" scoped>
.DFV-number-input {
	--input-bg: var(--DFV-color-white);
	--input-fg: var(--DFV-color-text-strong);
	--input-border: var(--DFV-color-neutral-200);
	--input-hover-border: var(--DFV-color-neutral-300);
	--input-focus-border: var(--DFV-color-primary-500);
	--input-focus-shadow: var(--DFV-color-primary-focus);
	--input-placeholder: var(--DFV-color-neutral-300);

	padding: 0.5rem 0.75rem;
	border: 1px solid var(--input-border);
	border-radius: var(--DFV-radius-sm);
	background: var(--input-bg);
	color: var(--input-fg);
	font-size: 0.875rem;
	font-weight: 500;
	line-height: 1.2;
	transition:
		border-color var(--DFV-transition-fast),
		box-shadow var(--DFV-transition-fast),
		background-color var(--DFV-transition-fast);

	&::placeholder {
		color: var(--input-placeholder);
	}

	&:hover {
		border-color: var(--input-hover-border);
	}

	&:focus-visible {
		outline: none;
		border-color: var(--input-focus-border);
		box-shadow: 0 0 0 2px var(--input-focus-shadow);
	}

	&:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}
}
</style>
