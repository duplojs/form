<script setup lang="ts">
import { type RepeatTemplateProperties } from "@V/layouts";
import { type GridTemplateLayoutContainerProps } from "../types";
import { computed } from "vue";
import { type VueComponent } from "@V/types";
import { type FunctionButtonComponent, defaultAddButton, defaultRemoveButton, defaultResetButton } from "./templateButton";

export type Props = (
	& RepeatTemplateProperties["props"]
	& GridTemplateLayoutContainerProps
	& {
		repeatElementColumn?: number;
		repeatElementMaxColumn?: number;
		removeButton?: VueComponent | FunctionButtonComponent;
		removeLabel?: string;
		addButton?: VueComponent | FunctionButtonComponent;
		addLabel?: string;
		resetButton?: VueComponent | FunctionButtonComponent;
		resetLabel?: string;
	}
);

const props = withDefaults(
	defineProps<Props>(),
	{
		addButton: defaultAddButton,
		addLabel: "Add",
		removeButton: defaultRemoveButton,
		removeLabel: "Remove",
		resetButton: defaultResetButton,
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
						:disabled="props.min === props.getFormFieldsQuantity()"
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
				:disabled="props.max === props.getFormFieldsQuantity()"
				@click="emit('addElement')"
			/>
		</div>
	</div>
</template>
