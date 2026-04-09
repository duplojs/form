<script setup lang="ts">
export interface Props {
	label?: string;
	disabled?: boolean;
}

const props = withDefaults(
	defineProps<Props>(),
	{
		label: "Submit",
		disabled: false,
	},
);
</script>

<template>
	<button
		class="DFV-submit-button"
		type="submit"
		:aria-label="props.label"
		:disabled="props.disabled"
	>
		{{ props.label }}
	</button>
</template>

<style lang="scss" scoped>
.DFV-submit-button {
	--button-bg: var(--DFV-color-neutral-500);
	--button-fg: var(--DFV-color-white);
	--button-border: var(--DFV-color-neutral-600);
	--button-hover-bg: var(--DFV-color-neutral-400);
	--button-active-bg: var(--DFV-color-neutral-700);
	--button-focus: var(--DFV-color-neutral-focus);

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
	line-height: 1.1;
	cursor: pointer;
	transition:
		background-color var(--DFV-transition-fast),
		border-color var(--DFV-transition-fast),
		box-shadow var(--DFV-transition-fast),
		transform var(--DFV-transition-fast);

	&:hover {
		background: var(--button-hover-bg);
		border-color: var(--button-border);
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
