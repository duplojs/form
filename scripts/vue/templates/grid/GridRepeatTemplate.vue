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
		removeLabel?: string;
		addButton?: VueComponent | (() => VNode);
		addLabel?: string;
		resetButton?: VueComponent | (() => VNode);
		resetLabel?: string;
	}
);

const props = withDefaults(
	defineProps<Props>(),
	{
		addButton: RepeatAddButton,
		addLabel: "Add",
		removeButton: RepeatRemoveButton,
		removeLabel: "Remove",
		resetButton: RepeatResetButton,
		resetLabel: "Reset",
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
				<div class="DFV-grid-repeat-actions">
					<component
						:is="props.resetButton"
						:label="props.resetLabel"
						@click="emit('resetElement', index)"
					/>

					<component
						:is="props.removeButton"
						:label="props.removeLabel"
						@click="emit('removeElement', index)"
					/>
				</div>

				<div
					class="DFV-grid-container DFV-grid-repeat-container"
					:style="repeatElementContainerStyles"
				>
					<component :is="formField" />
				</div>
			</div>
		</div>

		<div class="DFV-grid-repeat-add">
			<component
				:is="props.addButton"
				:label="props.addLabel"
				@click="emit('addElement')"
			/>
		</div>
	</div>
</template>
