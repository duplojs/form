<script setup lang="ts">
import type * as DD from "@duplojs/utils/date";
import { IconMinus } from "../icons";
import DateInput from "./DateInput.vue";

export interface Props {
	min?: DD.TheDate | DD.SerializedTheDate;
	max?: DD.TheDate | DD.SerializedTheDate;
}

const props = defineProps<Props>();

export interface Model {
	to: DD.TheDate | DD.SerializedTheDate | null;
	from: DD.TheDate | DD.SerializedTheDate | null;
}

const model = defineModel<Model>({
	default: {
		from: null,
		to: null,
	},
});

</script>

<template>
	<div class="DFV-range-date-input">
		<DateInput
			v-model="model.from"
			:min="props.min"
			:max="model.to ?? props.max"
		/>

		<span class="DFV-range-date-input-separator">
			<IconMinus />
		</span>

		<DateInput
			v-model="model.to"
			:min="model.from ?? props.min"
			:max="props.max"
		/>
	</div>
</template>

<style lang="scss">
.DFV-range-date-input {
	--DFV-range-date-input-gap: var(--DFV-spacing-sm);
	--DFV-range-date-input-separator-color: var(--DFV-muted-foreground);

	display: grid;
	grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
	align-items: center;
	gap: var(--DFV-range-date-input-gap);

	.DFV-range-date-input-separator {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		color: var(--DFV-range-date-input-separator-color);
		line-height: 1;
	}
}
</style>
