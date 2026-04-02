<script setup lang="ts">
import { type UnionTemplateProperties } from "@V/layouts";
import { computed } from "vue";
import { type GridTemplateLayoutContainerProps } from "./types";
import { type VueComponent } from "@V/types";
import { UnionSelectKind } from "@V/designSystem";

export type Props = (
	& UnionTemplateProperties["props"]
	& GridTemplateLayoutContainerProps
	& {
		labels?: Record<string, string>;
		selectKind?: VueComponent<{
			props: {
				fieldKey: string;
				options: {
					value: string;
					label: string;
				}[];
				modelValue: string;
			};
			emits: {
				"update:modelValue"(value: string): any;
			};
		}>;
	}
);

const props = withDefaults(
	defineProps<Props>(),
	{
		selectKind: UnionSelectKind,
	},
);

const emit = defineEmits<UnionTemplateProperties["emits"]>();

defineSlots<UnionTemplateProperties["slots"]>();

const options = computed(
	() => props.kinds.map(
		(value) => ({
			value,
			label: props.labels?.[value] ?? value,
		}),
	),
);

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
		class="DFV-grid-element"
		:style="selfStyles"
	>
		<div class="duplojs-form-vue-grid-union-select">
			<component
				:is="props.selectKind"
				:field-key="props.fieldKey"
				:options
				v-model="modelValue"
			/>
		</div>

		<div
			class="DFV-grid-container"
			:style="containerStyles"
		>
			<slot name="formField" />
		</div>
	</div>
</template>
