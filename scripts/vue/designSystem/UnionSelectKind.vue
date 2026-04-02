<script setup lang="ts">
export interface Props {
	fieldKey: string;
	options: {
		value: string;
		label: string;
	}[];
}

const props = defineProps<Props>();

const modelValue = defineModel<string>({ required: true });
</script>

<template>
	<select
		class="duplo-union-select-kind"
		v-model="modelValue"
		:id="`select-union-${props.fieldKey}`"
	>
		<option
			v-for="{value, label} in props.options"
			:value="value"
			:key="`${value}-${label}`"
		>
			{{ label }}
		</option>
	</select>
</template>

<style lang="scss" scoped>
.duplo-union-select-kind {
	--select-bg: var(--duplo-color-white);
	--select-fg: var(--duplo-color-text-strong);
	--select-border: var(--duplo-color-neutral-200);
	--select-hover-border: var(--duplo-color-neutral-300);
	--select-focus-border: var(--duplo-color-primary-500);
	--select-focus-shadow: var(--duplo-color-primary-focus);
	--select-chevron: var(--duplo-color-neutral-300);

	min-height: 2.25rem;
	padding: 0.5rem 2.2rem 0.5rem 0.75rem;
	border: 1px solid var(--select-border);
	border-radius: var(--duplo-radius-sm);
	background-color: var(--select-bg);
	background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 20 20' fill='none'%3E%3Cpath d='M5 7.5L10 12.5L15 7.5' stroke='%2364748b' stroke-width='1.8' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
	background-repeat: no-repeat;
	background-position: right 0.7rem center;
	background-size: 1rem;
	color: var(--select-fg);
	font-size: 0.875rem;
	font-weight: 500;
	line-height: 1.2;
	appearance: none;
	transition:
		border-color var(--duplo-transition-fast),
		box-shadow var(--duplo-transition-fast),
		background-color var(--duplo-transition-fast);

	&:hover {
		border-color: var(--select-hover-border);
	}

	&:focus-visible {
		outline: none;
		border-color: var(--select-focus-border);
		box-shadow: 0 0 0 2px var(--select-focus-shadow);
	}

	&:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}
}
</style>
