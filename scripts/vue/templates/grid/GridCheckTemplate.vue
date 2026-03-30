<script setup lang="ts">
import { type CheckTemplateProperties } from "@V/layouts";
import { computed } from "vue";
import { type GridTemplateLayoutContainerProps } from "./types";

export type Props = (
	& CheckTemplateProperties["props"]
	& GridTemplateLayoutContainerProps
	& {
		label?: string;
		hideEmptyMessageError?: boolean;
	}
);

const props = defineProps<Props>();

defineSlots<CheckTemplateProperties["slots"]>();

const selfStyles = computed(() => ({
	"--columns": props.columns,
}));

const containerStyles = computed(() => ({
	"--max-columns": props.maxColumns,
	"--gap": props.gap !== undefined ? `${props.gap}px` : undefined,
}));
</script>

<template>
	<div
		class="duplojs-form-vue-grid-self duplojs-form-vue-grid-check-container"
		:style="selfStyles"
	>
		<label
			v-if="props.label"
			:for="props.fieldKey"
			class="duplojs-form-vue-grid-check-label"
		>
			{{ props.label }}
		</label>

		<div
			class="duplojs-form-vue-grid-container"
			:style="containerStyles"
		>
			<slot name="formField" />
		</div>

		<small
			v-if="props.getErrorMessage() !== null || props.hideEmptyMessageError !== true"
			class="duplojs-form-vue-grid-check-small"
		>
			{{ props.getErrorMessage() }}
		</small>
	</div>
</template>
