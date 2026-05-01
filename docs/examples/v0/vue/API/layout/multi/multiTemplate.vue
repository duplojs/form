<script setup lang="ts">
import { type MultiTemplateProperties } from "@form/v0/vue";

defineProps<MultiTemplateProperties["props"]>();
defineSlots<MultiTemplateProperties["slots"]>();
</script>

<template>
	<div class="multi-layout">
		<slot name="formField" />
	</div>
</template>
