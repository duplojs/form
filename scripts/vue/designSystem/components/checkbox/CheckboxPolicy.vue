<script setup lang="ts">
import * as EE from "@duplojs/utils/either";
import { type ExposeInputProperties } from "@V/input";
import { ref } from "vue";

export interface Props {
	id: string;
	name?: string;
	title?: string;
	description?: string;
	required?: boolean;
	errorMessage?: string;
}

const props = withDefaults(
	defineProps<Props>(),
	{
		errorMessage: "Required",
	},
);

const model = defineModel<boolean>({ default: false });

const currentErrorMessage = ref<string | null>(null);

defineExpose<ExposeInputProperties>({
	check: () => {
		if (
			!props.required
			|| model.value === true
		) {
			currentErrorMessage.value = null;
			return EE.success(model.value);
		}

		currentErrorMessage.value = props.errorMessage;
		return EE.error([{ key: props.id }]);
	},
	reset: () => {
		currentErrorMessage.value = null;
	},
});
</script>

<template>
	<div class="DFV-checkbox-policy">
		<label class="DFV-checkbox">
			<input
				class="DFV-checkbox-input"
				v-model="model"
				type="checkbox"
				:id="id"
				:name="name"
			/>

			<span class="DFV-checkbox-policy-title">
				{{ props.title }}
				<span
					v-if="props.required"
					class="DFV-checkbox-policy-required"
				>
					*
				</span>
			</span>
		</label>

		<p
			v-if="props.description"
			class="DFV-checkbox-policy-description"
		>
			{{ props.description }}
		</p>

		<small
			v-if="currentErrorMessage !== null"
			class="DFV-checkbox-policy-error"
		>
			{{ currentErrorMessage }}
		</small>
	</div>
</template>
