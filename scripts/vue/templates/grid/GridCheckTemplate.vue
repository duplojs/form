<script setup lang="ts">
import { type CheckTemplateProperties } from "@V/layouts";
import { computed } from "vue";
import { type GridTemplateLayoutContainerProps } from "./types";

export type Props = (
	& CheckTemplateProperties["props"]
	& GridTemplateLayoutContainerProps
	& {
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
		class="DFV-grid-element"
		:style="selfStyles"
	>
		<div
			class="DFV-grid-container"
			:style="containerStyles"
		>
			<slot name="formField" />
		</div>

		<small v-if="props.getErrorMessage() !== null || props.hideEmptyMessageError !== true">
			{{ props.getErrorMessage() }}
		</small>
	</div>
</template>
