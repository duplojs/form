<script setup lang="ts">
export interface Props {
	name?: string;
	options: {
		value: string;
		label: string;
		description?: string;
	}[];
	disabled?: boolean;
}

const props = defineProps<Props>();

const model = defineModel<string | null>();
</script>

<template>
	<div
		class="DFV-radio-group"
		role="radiogroup"
	>
		<label
			v-for="(option, index) in props.options"
			:key="option.value"
			class="DFV-radio"
			:class="{ 'is-disabled': props.disabled }"
		>
			<input
				class="DFV-radio-input"
				v-model="model"
				type="radio"
				:id="`${props.name}-${index}`"
				:name="props.name"
				:value="option.value"
				:disabled="props.disabled"
			/>

			<span class="DFV-radio-content">
				<span class="DFV-radio-label">
					{{ option.label }}
				</span>

				<small
					v-if="option.description"
					class="DFV-radio-description"
				>
					{{ option.description }}
				</small>
			</span>
		</label>
	</div>
</template>
