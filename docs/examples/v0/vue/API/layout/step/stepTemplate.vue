<script setup lang="ts">
import { type StepTemplateProperties } from "@duplojs/form/vue";

type Props = (
	& StepTemplateProperties["props"]
	& {
		nextLabel?: string;
		previousLabel?: string;
		resetLabel?: string;
	}
);

defineProps<Props>();
defineSlots<StepTemplateProperties["slots"]>();
defineEmits<StepTemplateProperties["emits"]>();
</script>

<template>
	<div>
		<slot name="formField" />

		<div>
			<button type="button" @click="$emit('previousStep')">
				Back
			</button>

			<button type="button" @click="$emit('resetStep')">
				Reset step
			</button>

			<button type="button" @click="$emit('nextStep')">
				Next
			</button>
		</div>
	</div>
</template>
