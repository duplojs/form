<script setup lang="ts">
export interface Props {
	text: string;
}

defineProps<Props>();

const model = defineModel<string>();
</script>

<template>
	<input
		class="DFV-text-input"
		v-model="model"
		type="text"
	/>
</template>

<style lang="scss" scoped>
.DFV-text-input {
	--input-bg: var(--DFV-color-white);
	--input-fg: var(--DFV-color-text-strong);
	--input-border: var(--DFV-color-neutral-200);
	--input-hover-border: var(--DFV-color-neutral-300);
	--input-focus-border: var(--DFV-color-primary-500);
	--input-focus-shadow: var(--DFV-color-primary-focus);
	--input-placeholder: var(--DFV-color-neutral-300);

	padding: 0.5rem 0.75rem;
	border: 1px solid var(--input-border);
	border-radius: 0.5rem;
	background: var(--input-bg);
	color: var(--input-fg);
	font-size: 0.875rem;
	font-weight: 500;
	line-height: 1.2;
	transition:
		border-color 140ms ease,
		box-shadow 140ms ease,
		background-color 140ms ease;

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
