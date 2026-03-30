<script setup lang="ts">
import { type RepeatTemplateProperties } from "@V/layouts";
import { type GridTemplateLayoutContainerProps } from "./types";
import { computed } from "vue";

export type Props = (
	& RepeatTemplateProperties["props"]
	& GridTemplateLayoutContainerProps
	& {
		elementColumn?: number;
		elementMaxColumn?: number;
	}
);

const props = withDefaults(
	defineProps<Props>(),
	{
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
				<button
					@click="emit('resetElement', index)"
					type="button"
				>
					reset
				</button>

				<button
					@click="emit('removeElement', index)"
					type="button"
				>
					x
				</button>

				<div
					class="duplojs-form-vue-grid-container"
					:style="subElementContainerStyles"
				>
					<component :is="formField" />
				</div>
			</div>
		</div>

		<button
			@click="emit('addElement')"
			type="button"
		>
			+
		</button>
	</div>
</template>
