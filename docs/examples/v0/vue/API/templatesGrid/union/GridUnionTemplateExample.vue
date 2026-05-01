<script setup lang="ts">
import { type UnionTemplateProperties, type FunctionSelectInputComponent } from "@duplojs/form/vue";
import { computed } from "vue";
import { type GridTemplateLayoutContainerProps } from "@duplojs/form/vueGrid";

type Props = (
	& UnionTemplateProperties["props"]
	& GridTemplateLayoutContainerProps
	& {
		labels?: Record<string, string>;
		selectInputKind: FunctionSelectInputComponent;
	}
);

const props = defineProps<Props>();
defineSlots<UnionTemplateProperties["slots"]>();
defineEmits<UnionTemplateProperties["emits"]>();

const options = computed(
	() => props.kinds.map(
		(value) => ({
			value,
			label: props.labels?.[value] ?? value,
		}),
	),
);
</script>

<template>
	<div class="DFV-grid-element">
		<component
			:is="props.selectInputKind"
			:field-key="props.fieldKey"
			:options
			:model-value="props.getCurrentKind()"
		/>

		<slot name="formField" />
	</div>
</template>
