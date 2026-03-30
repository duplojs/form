<script setup lang="ts">
import { type RepeatTemplateProperties } from "@V/layouts";
import { type GridTemplateLayoutContainerProps } from "./types";
import { computed, type VNode } from "vue";
import { type VueComponent } from "@V/types";
import { RepeatAddButton, RepeatRemoveButton, RepeatResetButton } from "../components";

export type Props = (
	& RepeatTemplateProperties["props"]
	& GridTemplateLayoutContainerProps
	& {
		elementColumn?: number;
		elementMaxColumn?: number;
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

const subElementSelfStyles = computed(() => ({
	"--columns": props.elementColumn,
}));

const subElementContainerStyles = computed(() => ({
	"--max-columns": props.elementMaxColumn,
}));
</script>

<template>
	<div
		class="duplojs-form-vue-grid-self"
		:style="selfStyles"
	>
		<div
			class="duplojs-form-vue-grid-container"
			:style="containerStyles"
		>
			<div
				class="duplojs-form-vue-grid-self"
				v-for="(formField, index) in getFormFields()"
				:key="index"
				:style="subElementSelfStyles"
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
					class="duplojs-form-vue-grid-container"
					:style="subElementContainerStyles"
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
