<script setup lang="ts">
export interface Props {
	id: string;
	name: string;
	disabled?: boolean;
}

const props = defineProps<Props>();

const model = defineModel<boolean>({ default: false });
</script>

<template>
	<label
		class="DFV-checkbox"
		:class="{ 'is-disabled': props.disabled }"
	>
		<input
			class="DFV-checkbox-input"
			v-model="model"
			type="checkbox"
			:id="props.id"
			:name="props.name"
			:disabled="props.disabled"
		/>

		<span
			v-if="$slots.default"
			class="DFV-checkbox-label"
		>
			<slot />
		</span>
	</label>
</template>

<style lang="scss" scoped>
.DFV-checkbox {
	display: inline-flex;
	align-items: center;
	gap: 0.55rem;
	cursor: pointer;

	&.is-disabled {
		opacity: 0.55;
		cursor: not-allowed;
	}
}

.DFV-checkbox-input {
	appearance: none;
	width: 1rem;
	height: 1rem;
	margin: 0;
	border: 1px solid var(--DFV-color-neutral-300);
	border-radius: 0.25rem;
	background: var(--DFV-color-white);
	display: inline-grid;
	place-content: center;
	transition:
		background-color var(--DFV-transition-fast),
		border-color var(--DFV-transition-fast),
		box-shadow var(--DFV-transition-fast);

	&::after {
		content: "";
		width: 0.45rem;
		height: 0.45rem;
		border-radius: 0.1rem;
		transform: scale(0);
		transition: transform var(--DFV-transition-fast);
		background: var(--DFV-color-white);
	}

	&:hover:not(:disabled) {
		border-color: var(--DFV-color-neutral-600);
	}

	&:focus-visible {
		outline: none;
		box-shadow: 0 0 0 2px var(--DFV-color-neutral-focus);
	}

	&:checked {
		background: var(--DFV-color-neutral-500);
		border-color: var(--DFV-color-neutral-600);
	}

	&:checked::after {
		transform: scale(1);
	}

	&:disabled {
		cursor: not-allowed;
	}
}

.DFV-checkbox-label {
	font-size: 0.875rem;
	line-height: 1.2;
	font-weight: 500;
	color: var(--DFV-color-text-strong);
}
</style>
