<script setup lang="ts">
import { type MultiTemplateProperties } from "@duplojs/form/vue";
import { computed } from "vue";
import { type GridTemplateLayoutContainerProps } from "@duplojs/form/vueGrid";

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
