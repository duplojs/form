<script setup lang="ts">
import { type InputTemplateProperties } from "@V/input";
import { type GridTemplateLayoutProps } from "./types";
import { computed } from "vue";

type Props = (
	& InputTemplateProperties["props"]
	& GridTemplateLayoutProps
);

const props = defineProps<Props>();

defineSlots<InputTemplateProperties["slots"]>();

const selfStyles = computed(() => ({
	"--columns": props.columns,
}));
</script>

<template>
	<div
		class="DFV-grid-element DFV-grid-input"
		:style="selfStyles"
	>
		<label
			v-if="props.getLabel"
			:for="props.fieldKey"
		>
			{{ props.getLabel() }}
		</label>

		<slot name="input" />
	</div>
</template>
