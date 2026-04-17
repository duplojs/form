<script setup lang="ts">
import { type StepTemplateProperties } from "@V/layouts";
import { type VueComponent } from "@V/types";
import { computed } from "vue";
import { type FunctionButtonComponent, defaultStepNextButton, defaultStepPreviousButton, defaultStepResetButton } from "./templateButton";

export type Props = (
	& StepTemplateProperties["props"]
	& {
		nextButton?: VueComponent | FunctionButtonComponent;
		nextLabel?: string;
		previousButton?: VueComponent | FunctionButtonComponent;
		previousLabel?: string;
		resetButton?: VueComponent | FunctionButtonComponent;
	}
);

const props = withDefaults(
	defineProps<Props>(),
	{
		nextButton: defaultStepNextButton,
		nextLabel: "Next",
		previousButton: defaultStepPreviousButton,
		previousLabel: "Previous",
		resetButton: defaultStepResetButton,
	},
);

const emit = defineEmits<StepTemplateProperties["emits"]>();

defineSlots<StepTemplateProperties["slots"]>();

const currentStep = computed(() => props.getCurrentStep() + 1);

const progressPercent = computed(() => {
	if (props.stepQuantity <= 1) {
		return 100;
	}

	return Math.round((currentStep.value / props.stepQuantity) * 100);
});
</script>

<template>
	<div class="DFV-grid-element DFV-step-root">
		<div class="DFV-step-head">
			<div class="DFV-step-indicator">
				<div class="DFV-step-indicator-meta">
					<strong>Step {{ currentStep }}</strong>

					<span>on {{ props.stepQuantity }}</span>
				</div>

				<div class="DFV-step-indicator-track">
					<span
						class="DFV-step-indicator-fill"
						:style="{ width: `${progressPercent}%` }"
					/>
				</div>
			</div>
		</div>

		<div class="DFV-grid-container DFV-step-content">
			<slot name="formField" />
		</div>

		<small
			class="DFV-step-error"
			v-if="props.getErrorMessageNotAtLastStep()"
		>
			{{ props.getErrorMessageNotAtLastStep() }}
		</small>

		<div class="DFV-step-actions">
			<component
				:is="props.previousButton"
				:label="props.previousLabel"
				:disabled="props.getCurrentStep() === 0"
				@click="emit('previousStep')"
			/>

			<component
				:is="props.resetButton"
				@click="emit('resetStep')"
			/>

			<component
				:is="props.nextButton"
				:label="props.nextLabel"
				:disabled="props.isLastStep()"
				@click="emit('nextStep')"
			/>
		</div>
	</div>
</template>
