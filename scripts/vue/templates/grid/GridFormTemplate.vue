<script setup lang="ts">
import { type FormTemplateProperties } from "@V/form";
import { computed } from "vue";
import { type GridTemplateContainerProps } from "./types";

export type Props = (
	& FormTemplateProperties["props"]
	& GridTemplateContainerProps
);

const props = withDefaults(
	defineProps<Props>(),
	{},
);

defineSlots<FormTemplateProperties["slots"]>();

const emit = defineEmits<FormTemplateProperties["emits"]>();

function submit(event: SubmitEvent) {
	event.preventDefault();
	event.stopPropagation();
	event.stopImmediatePropagation();
	emit("submit");
}

const containerStyles = computed(() => ({
	"--max-columns": props.maxColumns,
	"--gap": props.gap !== undefined ? `${props.gap}px` : undefined,
}));
</script>

<template>
	<form
		@submit="submit"
		class="duplojs-form-vue-grid-form"
	>
		<div
			class="duplojs-form-vue-grid-container"
			:style="containerStyles"
		>
			<slot name="formField" />
		</div>

		<slot name="submitter" />
	</form>
</template>
