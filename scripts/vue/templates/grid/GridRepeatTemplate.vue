<script setup lang="ts">
import { type RepeatTemplateProperties } from "@V/layouts";

export type Props = RepeatTemplateProperties["props"];

defineProps<Props>();

const emit = defineEmits<RepeatTemplateProperties["emits"]>();

defineSlots<RepeatTemplateProperties["slots"]>();
</script>

<template>
	<div>
		<div
			v-for="(formField, index) in getFormFields()"
			:key="index"
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

			<component :is="formField" />
		</div>

		<button
			@click="emit('addElement')"
			type="button"
		>
			+
		</button>
	</div>
</template>
