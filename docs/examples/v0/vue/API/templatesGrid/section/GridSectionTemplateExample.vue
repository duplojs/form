<script setup lang="ts">
import { type SectionTemplateProperties } from "@duplojs/form/vue";
import { computed } from "vue";
import { type GridTemplateLayoutContainerProps } from "@duplojs/form/vueGrid";

type Props = (
	& SectionTemplateProperties["props"]
	& GridTemplateLayoutContainerProps
);

const props = defineProps<Props>();
defineSlots<SectionTemplateProperties["slots"]>();

const selfStyles = computed(() => ({
	"--DFV-grid-columns": props.columns,
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

		<slot name="formField" />
	</div>
</template>
