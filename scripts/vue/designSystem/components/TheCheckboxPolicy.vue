<script setup lang="ts">
import * as EE from "@duplojs/utils/either";
import { type ExposeInputProperties } from "@V/input";
import TheCheckbox from "./TheCheckbox.vue";

export interface Props {
	id: string;
	name?: string;
	title?: string;
	description?: string;
	required?: boolean;
	disabled?: boolean;
}

const props = defineProps<Props>();

const model = defineModel<boolean>({ default: false });

defineExpose<ExposeInputProperties>({
	check: () => {
		if (
			!props.required
			|| model.value === true
		) {
			return EE.success(model.value);
		}

		return EE.error([{ key: props.id }]);
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
	</div>
</template>
