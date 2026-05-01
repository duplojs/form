<script setup lang="ts">
import * as EE from "@duplojs/utils/either";
import { type ExposeInputProperties } from "@form/v0/vue";
import { ref } from "vue";

export interface Props {
	id: string;
	label: string;
	required?: boolean;
	errorMessage?: string;
}

const props = withDefaults(
	defineProps<Props>(),
	{
		required: false,
		errorMessage: "You must accept this condition.",
	},
);

const model = defineModel<boolean>({ default: false });

const currentError = ref<string | null>(null);

defineExpose<ExposeInputProperties>({
	check: () => {
		if (!props.required || model.value) {
			currentError.value = null;
			return EE.success(model.value);
		}

		currentError.value = props.errorMessage;

		return EE.error([{ key: props.id }]);
	},
	reset: () => {
		currentError.value = null;
	},
});
</script>

<template>
	<div>
		<label>
			<input
				v-model="model"
				type="checkbox"
				:id="props.id"
			/>
			{{ props.label }}
		</label>

		<small v-if="currentError">
			{{ currentError }}
		</small>
	</div>
</template>
