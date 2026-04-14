<script setup lang="ts">
export interface Props {
	accept?: string;
	multiple?: boolean;
	disabled?: boolean;
}

const props = withDefaults(
	defineProps<Props>(),
	{
		multiple: false,
		disabled: false,
	},
);

const model = defineModel<File[] | null>();

function handleChange(event: Event) {
	const target = event.target as HTMLInputElement;
	const files = target.files;

	if (!files || files.length === 0) {
		model.value = undefined;
		return;
	}

	model.value = Array.from(files);
}
</script>

<template>
	<input
		class="DFV-file-input"
		type="file"
		:accept="props.accept"
		:multiple="props.multiple"
		:disabled="props.disabled"
		@change="handleChange"
	/>
</template>
