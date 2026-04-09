<script setup lang="ts">
export interface Props {
	id: string;
	name: string;
	value: string;
	description?: string;
	disabled?: boolean;
}

const props = defineProps<Props>();

const model = defineModel<string | undefined>();
</script>

<template>
	<label
		class="DFV-radio"
		:class="{ 'is-disabled': props.disabled }"
	>
		<input
			class="DFV-radio-input"
			v-model="model"
			type="radio"
			:id="props.id"
			:name="props.name"
			:value="props.value"
			:disabled="props.disabled"
		/>

		<span
			v-if="$slots.default"
			class="DFV-radio-content"
		>
			<span class="DFV-radio-label">
				<slot />
			</span>

			<small
				v-if="props.description"
				class="DFV-radio-description"
			>
				{{ props.description }}
			</small>
		</span>
	</label>
</template>

<style lang="scss" scoped>
.DFV-radio {
	display: inline-flex;
	align-items: center;
	gap: 0.55rem;
	cursor: pointer;

	&.is-disabled {
		opacity: 0.55;
		cursor: not-allowed;
	}
}

.DFV-radio-input {
	appearance: none;
	width: 1rem;
	height: 1rem;
	margin: 0;
	border: 1px solid var(--DFV-color-neutral-300);
	border-radius: 999px;
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
		border-radius: 999px;
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

.DFV-radio-content {
	display: flex;
	flex-direction: column;
	gap: 0.15rem;
}

.DFV-radio-label {
	font-size: 0.875rem;
	line-height: 1.2;
	font-weight: 500;
	color: var(--DFV-color-text-strong);
}

.DFV-radio-description {
	font-size: 0.75rem;
	line-height: 1.2;
	color: var(--DFV-color-text-muted);
}
</style>
