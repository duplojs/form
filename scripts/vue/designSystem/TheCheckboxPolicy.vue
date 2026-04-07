<script setup lang="ts">
import Checkbox from "./TheCheckbox.vue";

export interface Props {
	title: string;
	description?: string;
	required?: boolean;
	disabled?: boolean;
}

const props = defineProps<Props>();

const model = defineModel<boolean>({ default: false });
</script>

<template>
	<div class="DFV-checkbox-policy">
		<Checkbox
			v-model="model"
			:disabled="props.disabled"
		>
			<span class="DFV-checkbox-policy-title">
				{{ props.title }}
				<span
					v-if="props.required"
					class="DFV-checkbox-policy-required"
				>
					*
				</span>
			</span>
		</Checkbox>

		<p
			v-if="props.description"
			class="DFV-checkbox-policy-description"
		>
			{{ props.description }}
		</p>

		<div
			v-if="$slots.default"
			class="DFV-checkbox-policy-content"
		>
			<slot />
		</div>
	</div>
</template>

<style lang="scss" scoped>
.DFV-checkbox-policy {
	display: flex;
	flex-direction: column;
	gap: 0.35rem;
	padding: 0.65rem 0.75rem;
	border: 1px solid var(--DFV-color-neutral-200);
	border-radius: var(--DFV-radius-sm);
	background: var(--DFV-color-white);
}

.DFV-checkbox-policy-title {
	font-weight: 600;
}

.DFV-checkbox-policy-required {
	margin-left: 0.2rem;
	color: var(--DFV-color-danger-600);
}

.DFV-checkbox-policy-description,
.DFV-checkbox-policy-content {
	margin: 0;
	font-size: 0.8rem;
	line-height: 1.3;
	color: var(--DFV-color-text-muted);
}
</style>
