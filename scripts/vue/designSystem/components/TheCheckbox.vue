<script setup lang="ts">
export interface Props {
	id: string;
	name?: string;
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
