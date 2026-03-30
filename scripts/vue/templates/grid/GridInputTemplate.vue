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
		class="duplojs-form-vue-grid-self duplojs-form-vue-grid-input-container"
		:style="selfStyles"
	>
		<slot name="input" />
	</div>
</template>
