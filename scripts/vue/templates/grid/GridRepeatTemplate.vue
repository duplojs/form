<script setup lang="ts">
import { type RepeatTemplateProperties } from "@V/layouts";
import { type GridTemplateLayoutContainerProps } from "./types";
import { computed, type VNode } from "vue";
import { type VueComponent } from "@V/types";
import { RepeatAddButton, RepeatRemoveButton, RepeatResetButton } from "@V/designSystem";

export type Props = (
	& RepeatTemplateProperties["props"]
	& GridTemplateLayoutContainerProps
	& {
		repeatElementColumn?: number;
		repeatElementMaxColumn?: number;
		removeButton?: VueComponent | (() => VNode);
		addButton?: VueComponent | (() => VNode);
		resetButton?: VueComponent | (() => VNode);
	}
);

const props = withDefaults(
	defineProps<Props>(),
	{
		addButton: RepeatAddButton,
		removeButton: RepeatRemoveButton,
		resetButton: RepeatResetButton,
	},
);

const emit = defineEmits<RepeatTemplateProperties["emits"]>();

defineSlots<RepeatTemplateProperties["slots"]>();

const selfStyles = computed(() => ({
	"--columns": props.columns,
}));

const containerStyles = computed(() => ({
	"--max-columns": props.maxColumns,
	"--gap": props.gap !== undefined ? `${props.gap}px` : undefined,
}));

const repeatElementStyles = computed(() => ({
	"--columns": props.repeatElementColumn,
}));

const repeatElementContainerStyles = computed(() => ({
	"--max-columns": props.repeatElementMaxColumn,
}));
</script>

<template>
	<div
		class="DFV-grid-element"
		:style="selfStyles"
	>
		<div
			class="DFV-grid-container"
			:style="containerStyles"
		>
			<div
				class="DFV-grid-element DFV-grid-repeat-element"
				v-for="(formField, index) in getFormFields()"
				:key="index"
				:style="repeatElementStyles"
			>
				<component
					:is="props.resetButton"
					@click="emit('resetElement', index)"
				/>

				<component
					:is="props.removeButton"
					@click="emit('removeElement', index)"
				/>

				<div
					class="DFV-grid-container DFV-grid-repeat-container"
					:style="repeatElementContainerStyles"
				>
					<component :is="formField" />
				</div>
			</div>
		</div>

		<component
			:is="props.addButton"
			@click="emit('addElement')"
		/>
	</div>
</template>
