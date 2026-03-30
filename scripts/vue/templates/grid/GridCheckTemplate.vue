<script setup lang="ts">
import { type CheckTemplateProperties } from "@V/layouts";
import { computed } from "vue";
import { type GridTemplateLayoutContainerProps } from "./types";

export type Props = (
	& CheckTemplateProperties["props"]
	& GridTemplateLayoutContainerProps
	& {
		label?: string;
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
		class="duplojs-form-vue-grid-self"
		:style="selfStyles"
	>
		<label
			v-if="label"
			:for="props.fieldKey"
			class="duplojs-form-vue-grid-check-label"
		>
			{{ label }}
		</label>

		<div
			class="duplojs-form-vue-grid-check-container"
			:style="containerStyles"
		>
			<slot name="formField" />
		</div>

		<small class="duplojs-form-vue-grid-check-small">
			{{ props.getErrorMessage() }}
		</small>
	</div>
</template>
