<script setup lang="ts">
import { type CheckTemplateProperties } from "@V/layouts";

export type Props = CheckTemplateProperties["props"];

defineProps<Props>();

defineSlots<CheckTemplateProperties["slots"]>();
</script>

<template>
	<div>
		<slot name="formField" />

		{{ getErrorMessage() }}
	</div>
</template>
