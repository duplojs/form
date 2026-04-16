<script setup lang="ts">
import * as EE from "@duplojs/utils/either";
import { type ExposeInputProperties } from "@V/input";
import { ref } from "vue";
import TheCheckbox from "./TheCheckbox.vue";

export interface Props {
	id: string;
	name?: string;
	title?: string;
	description?: string;
	required?: boolean;
	disabled?: boolean;
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
		<TheCheckbox
			v-model="model"
			:id="props.id"
			:name="props.name"
			:disabled="props.disabled"
		>
			<span class="DFV-checkbox-policy-title">
				{{ props.title }}
				<span
					v-if="props.required"
					class="DFV-checkbox-policy-required"
				>
					*
				</span>
			</span>
		</TheCheckbox>

		<p
			v-if="props.description"
			class="DFV-checkbox-policy-description"
		>
			{{ props.description }}
		</p>

		<div
			v-if="$slots.default"
			class="DFV-checkbox-policy-content"
		>
			<slot />
		</div>

		<small
			v-if="currentErrorMessage !== null"
			class="DFV-checkbox-policy-error"
		>
			{{ currentErrorMessage }}
		</small>
	</div>
</template>
