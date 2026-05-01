<script setup lang="ts">
import { type CheckTemplateProperties } from "@form/v0/vue";
import { computed } from "vue";
import { type GridTemplateLayoutContainerProps } from "@form/v0/vueGrid";

type Props = (
	& CheckTemplateProperties["props"]
	& GridTemplateLayoutContainerProps
	& {
		hideEmptyMessageError?: boolean;
	}
);

const props = defineProps<Props>();
defineSlots<CheckTemplateProperties["slots"]>();

const selfStyles = computed(() => ({
	"--DFV-grid-columns": props.columns,
	"--DFV-grid-gap": props.gap !== undefined ? `${props.gap}px` : undefined,
}));

const containerStyles = computed(() => ({
	"--DFV-grid-max-columns": props.maxColumns,
	"--DFV-grid-gap": props.gap !== undefined ? `${props.gap}px` : undefined,
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
