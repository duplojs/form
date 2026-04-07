<script setup lang="ts">
export interface Props {
	label?: string;
}

defineProps<Props>();
</script>

<template>
	<button
		class="DFV-step-previous-button"
		type="button"
		:aria-label="label"
	>
		{{ label }}
	</button>
</template>

<style lang="scss" scoped>
.DFV-step-previous-button {
	--button-bg: var(--DFV-color-neutral-50);
	--button-fg: var(--DFV-color-text-muted);
	--button-border: var(--DFV-color-neutral-200);
	--button-hover-bg: var(--DFV-color-neutral-100);
	--button-active-bg: var(--DFV-color-neutral-150);
	--button-focus: var(--DFV-color-neutral-300);

	display: inline-flex;
	align-items: center;
	justify-content: center;
	min-height: 2.25rem;
	padding: 0.5rem 1rem;
	border: 1px solid var(--button-border);
	border-radius: var(--DFV-radius-sm);
	background: var(--button-bg);
	color: var(--button-fg);
	font-size: 0.875rem;
	font-weight: 600;
	cursor: pointer;
	transition:
		background-color var(--DFV-transition-fast),
		border-color var(--DFV-transition-fast),
		box-shadow var(--DFV-transition-fast),
		transform var(--DFV-transition-fast);

	&:hover {
		background: var(--button-hover-bg);
		border-color: var(--DFV-color-neutral-300);
	}

	&:focus-visible {
		outline: none;
		box-shadow: 0 0 0 2px var(--button-focus);
	}

	&:active {
		background: var(--button-active-bg);
		transform: translateY(1px);
	}

	&:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}
}
</style>
