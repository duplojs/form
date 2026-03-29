<script setup lang="ts">
import { type MultiTemplateProperties } from "@V/layouts";

export type Props = MultiTemplateProperties["props"];

const props = defineProps<Props>();

defineSlots<MultiTemplateProperties["slots"]>();
</script>

<template>
	<div>
		<slot name="formField" />
	</div>
</template>
