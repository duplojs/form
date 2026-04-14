<script setup lang="ts">
import { type SectionTemplateProperties } from "@V/layouts";
import { type GridTemplateLayoutContainerProps } from "../types";
import { computed } from "vue";

type Props = (
	& SectionTemplateProperties["props"]
	& GridTemplateLayoutContainerProps
);

const props = defineProps<Props>();

defineSlots<SectionTemplateProperties["slots"]>();

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
		<label
			v-if="props.title"
			:for="props.fieldKey"
		>
			{{ props.title }}
		</label>

		<div
			class="DFV-grid-container"
			:style="containerStyles"
		>
			<slot name="formField" />
		</div>
	</div>
</template>
