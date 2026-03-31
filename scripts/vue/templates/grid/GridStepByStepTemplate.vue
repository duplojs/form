<script setup lang="ts">
import StepNextButton from "@V/designSystem/StepNextButton.vue";
import StepPreviousButton from "@V/designSystem/StepPreviousButton.vue";
import StepResetButton from "@V/designSystem/StepResetButton.vue";
import { type StepTemplateProperties } from "@V/layouts";
import { type VueComponent } from "@V/types";
import { type VNode } from "vue";

export type Props = (
	& StepTemplateProperties["props"]
	& {
		nextButton?: VueComponent | (() => VNode)[];
		previousButton?: VueComponent | (() => VNode)[];
		resetButton?: VueComponent | (() => VNode)[];
	}
);

const props = withDefaults(
	defineProps<Props>(),
	{
		nextButton: StepNextButton,
		previousButton: StepPreviousButton,
		resetButton: StepResetButton,
	},
);

const emit = defineEmits<StepTemplateProperties["emits"]>();

defineSlots<StepTemplateProperties["slots"]>();
</script>

<template>
	<div class="duplojs-form-vue-grid-self">
		<label>{{ props.getCurrentStep() + 1 }}/{{ props.stepQuantity }}</label>

		<div class="duplojs-form-vue-grid-container">
			<slot name="formField" />
		</div>

		{{ props.getErrorMessageNotAtLastStep() }}

		<component
			:is="props.previousButton"
			@click="emit('previousStep')"
		/>

		<component
			:is="props.resetButton"
			@click="emit('resetStep')"
		/>

		<component
			:is="props.nextButton"
			@click="emit('nextStep')"
		/>
	</div>
</template>
