<script setup lang="ts">
import { type InputTemplateProperties } from "@duplojs/form/vue";

type Props = (
	& InputTemplateProperties["props"]
	& {
		tone?: "default" | "accent";
	}
);

const props = withDefaults(
	defineProps<Props>(),
	{
		tone: "default",
	},
);

defineSlots<InputTemplateProperties["slots"]>();
</script>

<template>
	<div
		class="hero-input-template"
		:data-tone="props.tone"
	>
		<div class="hero-input-template__head">
			<small class="hero-input-template__key">
				{{ props.fieldKey }}
			</small>

			<label
				v-if="props.getLabel"
				:for="props.fieldKey"
				class="hero-input-template__label"
			>
				{{ props.getLabel() }}
			</label>
		</div>

		<div class="hero-input-template__body">
			<slot name="input" />
		</div>

		<small
			v-if="props.getErrorMessage"
			class="hero-input-template__error"
		>
			{{ props.getErrorMessage() }}
		</small>
	</div>
</template>

<style scoped>
.hero-input-template {
	grid-column: span 6;
	display: flex;
	flex-direction: column;
	gap: 0.45rem;
	padding: 0.9rem;
	border: 1px solid #d4d4d8;
	border-radius: 16px;
	background: #fafaf9;
}

.hero-input-template[data-tone="accent"] {
	border-color: #0f766e;
	background: linear-gradient(180deg, #f0fdfa 0%, #ffffff 100%);
}

.hero-input-template__head {
	display: flex;
	flex-direction: column;
	gap: 0.15rem;
}

.hero-input-template__key {
	color: #78716c;
	font-size: 0.7rem;
}

.hero-input-template__label {
	font-weight: 600;
}

.hero-input-template__error {
	min-height: 1rem;
	color: #dc2626;
	font-size: 0.75rem;
}
</style>
