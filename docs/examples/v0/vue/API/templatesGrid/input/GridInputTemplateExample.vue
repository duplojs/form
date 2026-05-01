<script setup lang="ts">
import { type InputTemplateProperties } from "@duplojs/form/vue";
import { computed } from "vue";
import { type GridTemplateLayoutProps } from "@duplojs/form/vueGrid";

type Props = (
	& InputTemplateProperties["props"]
	& GridTemplateLayoutProps
	& {
		hideEmptyMessageError?: boolean;
	}
);

const props = defineProps<Props>();
defineSlots<InputTemplateProperties["slots"]>();

const selfStyles = computed(() => ({
	"--DFV-grid-columns": props.columns,
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

		<small
			v-if="
				props.getErrorMessage
					&& (
						props.getErrorMessage() !== null ||
						props.hideEmptyMessageError !== true
					)
			"
		>
			{{ props.getErrorMessage() }}
		</small>
	</div>
</template>
