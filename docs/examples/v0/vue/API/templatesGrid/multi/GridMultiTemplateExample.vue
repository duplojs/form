<script setup lang="ts">
import { type MultiTemplateProperties } from "@form/v0/vue";
import { computed } from "vue";
import { type GridTemplateLayoutContainerProps } from "@form/v0/vueGrid";

type Props = (
	& MultiTemplateProperties["props"]
	& GridTemplateLayoutContainerProps
);

const props = defineProps<Props>();
defineSlots<MultiTemplateProperties["slots"]>();

const containerStyles = computed(() => ({
	"--DFV-grid-max-columns": props.maxColumns,
	"--DFV-grid-gap": props.gap !== undefined ? `${props.gap}px` : undefined,
	"--DFV-grid-columns": props.columns,
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
