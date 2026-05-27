<script setup lang="ts">
import { PrimaryButton } from "@form/v0/vueDesignSystem";
import { useSlotForm } from "./slotForm";

const { SlotForm, checkSlotForm } = useSlotForm();
</script>

<template>
	<SlotForm @submit="console.log(checkSlotForm())">
		<PrimaryButton
			type="submit"
			label="Submit"
		/>

		<template #customMessage="params">
			Custom message
			<component :is="params.formField" />
		</template>

		<template #customNickname="{ value, update }">
			<input
				type="text"
				:model-value="value"
				@update:model-value="(value: string) => update(value)"
			/>
		</template>
	</SlotForm>
</template>
