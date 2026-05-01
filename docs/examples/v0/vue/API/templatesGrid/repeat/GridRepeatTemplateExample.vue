<script setup lang="ts">
import { type RepeatTemplateProperties, type FunctionButtonComponent } from "@duplojs/form/vue";
import { computed } from "vue";
import { type GridTemplateLayoutContainerProps } from "@duplojs/form/vueGrid";

type Props = (
	& RepeatTemplateProperties["props"]
	& GridTemplateLayoutContainerProps
	& {
		repeatElementColumn?: number;
		repeatElementMaxColumn?: number;
		removeButton: FunctionButtonComponent;
		removeLabel?: string;
		addButton: FunctionButtonComponent;
		addLabel?: string;
		resetButton: FunctionButtonComponent;
		resetLabel?: string;
	}
);

const props = defineProps<Props>();
defineSlots<RepeatTemplateProperties["slots"]>();
defineEmits<RepeatTemplateProperties["emits"]>();

const selfStyles = computed(() => ({
	"--DFV-grid-columns": props.columns,
}));
</script>

<template>
	<div
		class="DFV-grid-element"
		:style="selfStyles"
	>
		<slot name="formField" />
	</div>
</template>
