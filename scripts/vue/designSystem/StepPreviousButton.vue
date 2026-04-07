<script setup lang="ts">
export interface Props {

}

defineProps<Props>();

</script>

<template>
	<button
		class="duplo-step-previous-button"
		type="button"
		aria-label="Previous step"
	>
		Previous
	</button>
</template>

<style lang="scss" scoped>
.duplo-step-previous-button {
	--button-bg: var(--duplo-color-neutral-50);
	--button-fg: var(--duplo-color-text-muted);
	--button-border: var(--duplo-color-neutral-200);
	--button-hover-bg: var(--duplo-color-neutral-100);
	--button-active-bg: var(--duplo-color-neutral-150);
	--button-focus: var(--duplo-color-neutral-300);

	display: inline-flex;
	align-items: center;
	justify-content: center;
	min-height: 2.25rem;
	padding: 0.5rem 1rem;
	border: 1px solid var(--button-border);
	border-radius: var(--duplo-radius-sm);
	background: var(--button-bg);
	color: var(--button-fg);
	font-size: 0.875rem;
	font-weight: 600;
	cursor: pointer;
	transition:
		background-color var(--duplo-transition-fast),
		border-color var(--duplo-transition-fast),
		box-shadow var(--duplo-transition-fast),
		transform var(--duplo-transition-fast);

	&:hover {
		background: var(--button-hover-bg);
		border-color: var(--duplo-color-neutral-300);
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
