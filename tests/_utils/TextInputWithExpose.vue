<script setup lang="ts">
import { E } from "@duplojs/utils";
import { type InputTemplateProperties } from "@V/input";
import { ref, useTemplateRef } from "vue";

interface Props {
	id?: string;
}

defineProps<Props>();

const model = defineModel<string>();
const isDisposed = ref(false);
const inputElement = useTemplateRef("inputElement");

defineExpose<InputTemplateProperties["expose"]>({
	check: () => E.success("test"),
	reset: () => {
		setTimeout(
			() => {
				model.value = "reset";
			},
		);
	},
	dispose: () => {
		if (inputElement.value) {
			isDisposed.value = true;
		}

		model.value = "dispose";
	},
});

</script>

<template>
	<input
		id="test-text-input"
		ref="inputElement"
		v-model="model"
	/>

	<small
		v-if="isDisposed"
		id="text-input-with-expose-disposed"
	>
		disposed
	</small>
</template>
