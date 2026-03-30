<script setup lang="ts">
import { type UnionTemplateProperties } from "@V/layouts";
import { computed } from "vue";
import { type GridTemplateLayoutContainerProps } from "./types";

export type Props = (
	& UnionTemplateProperties["props"]
	& GridTemplateLayoutContainerProps
);

const props = withDefaults(
	defineProps<Props>(),
	{
	},
);

const emit = defineEmits<UnionTemplateProperties["emits"]>();

defineSlots<UnionTemplateProperties["slots"]>();

const modelValue = computed({
	get: () => props.getCurrentKind(),
	set: (value) => {
		emit("changeKind", value);
	},
});

const containerStyles = computed(() => ({
	"--max-columns": props.maxColumns,
	"--gap": props.gap !== undefined ? `${props.gap}px` : undefined,
}));

const selfStyles = computed(() => ({
	"--columns": props.columns,
}));
</script>

<template>
	<div
		class="duplojs-form-vue-grid-self"
		:style="selfStyles"
	>
		<select
			v-model="modelValue"
			:id="`select-union-${props.fieldKey}`"
		>
			<option
				v-for="kind in props.kinds"
				:value="kind"
				:key="kind"
			>
				{{ kind }}
			</option>
		</select>

		<div
			class="duplojs-form-vue-grid-container"
			:style="containerStyles"
		>
			<slot name="formField" />
		</div>
	</div>
</template>
