<script setup lang="ts">
export interface Props {
	accept?: string;
	multiple?: boolean;
	disabled?: boolean;
}

const props = withDefaults(
	defineProps<Props>(),
	{
		multiple: false,
		disabled: false,
	},
);

const model = defineModel<File[] | undefined>();

function handleChange(event: Event) {
	const target = event.target as HTMLInputElement;
	const files = target.files;

	if (!files || files.length === 0) {
		model.value = undefined;
		return;
	}

	model.value = Array.from(files);
}
</script>

<template>
	<input
		class="DFV-file-input"
		type="file"
		:accept="props.accept"
		:multiple="props.multiple"
		:disabled="props.disabled"
		@change="handleChange"
	/>
</template>

<style lang="scss" scoped>
.DFV-file-input {
	--input-bg: var(--DFV-color-white);
	--input-fg: var(--DFV-color-text-strong);
	--input-border: var(--DFV-color-neutral-200);
	--input-hover-border: var(--DFV-color-neutral-300);
	--input-focus-border: var(--DFV-color-neutral-500);
	--input-focus-shadow: var(--DFV-color-neutral-focus);
	--button-bg: var(--DFV-color-neutral-50);
	--button-border: var(--DFV-color-neutral-200);
	--button-hover-bg: var(--DFV-color-neutral-100);
	--button-fg: var(--DFV-color-neutral-400);

	padding: 0.35rem;
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

	&::file-selector-button {
		margin-right: 0.65rem;
		padding: 0.45rem 0.7rem;
		border: 1px solid var(--button-border);
		border-radius: calc(var(--DFV-radius-sm) - 2px);
		background: var(--button-bg);
		color: var(--button-fg);
		font-size: 0.8rem;
		font-weight: 600;
		cursor: pointer;
		transition:
			background-color var(--DFV-transition-fast),
			border-color var(--DFV-transition-fast);
	}

	&:hover::file-selector-button {
		background: var(--button-hover-bg);
		border-color: var(--input-hover-border);
	}
}
</style>
