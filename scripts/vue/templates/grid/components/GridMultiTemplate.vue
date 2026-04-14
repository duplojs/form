<script setup lang="ts">
import { type MultiTemplateProperties } from "@V/layouts";
import { type GridTemplateLayoutContainerProps } from "../types";
import { computed } from "vue";

export type Props = (
	& MultiTemplateProperties["props"]
	& GridTemplateLayoutContainerProps
);

const props = withDefaults(
	defineProps<Props>(),
	{
	},
);

defineSlots<MultiTemplateProperties["slots"]>();

const containerStyles = computed(() => ({
	"--max-columns": props.maxColumns,
	"--gap": props.gap !== undefined ? `${props.gap}px` : undefined,
	"--columns": props.columns,
}));
</script>

<template>
	<div
		class="DFV-grid-container DFV-grid-element"
		:style="containerStyles"
	>
		<slot name="formField" />
	</div>
</template>
