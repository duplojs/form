<script setup lang="ts">
import { type MultiFieldTemplateProperties } from "@V/layouts";

export type Props = MultiFieldTemplateProperties["props"];

const props = defineProps<Props>();

defineSlots<MultiFieldTemplateProperties["slots"]>();
</script>

<template>
	<div>
		<slot name="formField" />
	</div>
</template>
