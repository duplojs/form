<script setup lang="ts">
import { StepNextButton } from "@V/designSystem";
import StepPreviousButton from "@V/designSystem/components/StepPreviousButton.vue";
import StepResetButton from "@V/designSystem/components/StepResetButton.vue";
import { type StepTemplateProperties } from "@V/layouts";
import { type VueComponent } from "@V/types";
import { computed, type VNode } from "vue";

export type Props = (
	& StepTemplateProperties["props"]
	& {
		nextButton?: VueComponent | (() => VNode)[];
		nextLabel?: string;
		previousButton?: VueComponent | (() => VNode)[];
		previousLabel?: string;
		resetButton?: VueComponent | (() => VNode)[];
	}
);

const props = withDefaults(
	defineProps<Props>(),
	{
		nextButton: StepNextButton,
		nextLabel: "Next",
		previousButton: StepPreviousButton,
		previousLabel: "Previous",
		resetButton: StepResetButton,
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
