<script setup lang="ts">
import { type FormTemplateProperties } from "@duplojs/form/vue";
import { computed } from "vue";
import { type GridTemplateContainerProps } from "@duplojs/form/vueGrid";

type Props = (
	& FormTemplateProperties["props"]
	& GridTemplateContainerProps
);

const props = defineProps<Props>();
defineSlots<FormTemplateProperties["slots"]>();
defineEmits<FormTemplateProperties["emits"]>();

const containerStyles = computed(() => ({
	"--DFV-grid-max-columns": props.maxColumns,
	"--DFV-grid-gap": props.gap !== undefined ? `${props.gap}px` : undefined,
}));
</script>

<template>
	<form class="DFV-grid-form">
		<div
			class="DFV-grid-container"
			:style="containerStyles"
		>
			<slot name="formField" />
		</div>

		<slot name="submitter" />
	</form>
</template>
