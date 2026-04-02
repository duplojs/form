<script setup lang="ts">
export interface Props {

}

defineProps<Props>();

</script>

<template>
	<button
		class="duplo-repeat-remove-button"
		type="button"
		aria-label="Supprimer un element"
	>
		×
	</button>
</template>

<style lang="scss" scoped>
.duplo-repeat-remove-button {
	--button-bg: var(--duplo-color-danger-600);
	--button-fg: var(--duplo-color-white);
	--button-border: var(--duplo-color-danger-700);
	--button-hover-bg: var(--duplo-color-danger-700);
	--button-active-bg: var(--duplo-color-danger-800);
	--button-focus: var(--duplo-color-danger-focus);

	display: inline-flex;
	align-items: center;
	justify-content: center;
	width: 2rem;
	height: 2rem;
	padding: 0;
	border: 1px solid var(--button-border);
	border-radius: var(--duplo-radius-sm);
	background: var(--button-bg);
	color: var(--button-fg);
	font-size: 1rem;
	font-weight: 600;
	line-height: 1;
	cursor: pointer;
	transition:
		background-color var(--duplo-transition-fast),
		border-color var(--duplo-transition-fast),
		box-shadow var(--duplo-transition-fast),
		transform var(--duplo-transition-fast);

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
