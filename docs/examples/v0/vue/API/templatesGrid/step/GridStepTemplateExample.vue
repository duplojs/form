<script setup lang="ts">
import { type StepTemplateProperties, type FunctionButtonComponent } from "@duplojs/form/vue";

type Props = (
	& StepTemplateProperties["props"]
	& {
		nextButton: FunctionButtonComponent;
		nextLabel?: string;
		previousButton: FunctionButtonComponent;
		previousLabel?: string;
		resetButton: FunctionButtonComponent;
		resetLabel?: string;
		hideEmptyMessageError?: boolean;
	}
);

const props = defineProps<Props>();
defineSlots<StepTemplateProperties["slots"]>();
defineEmits<StepTemplateProperties["emits"]>();
</script>

<template>
	<div class="DFV-step-root">
		<div class="DFV-step-content">
			<slot name="formField" />
		</div>

		<small v-if="props.getErrorMessageNotAtLastStep() || props.hideEmptyMessageError !== true">
			{{ props.getErrorMessageNotAtLastStep() }}
		</small>
	</div>
</template>
