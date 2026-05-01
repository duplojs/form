<script setup lang="ts">
import { type MultiTemplateProperties } from "@duplojs/form/vue";

defineProps<MultiTemplateProperties["props"]>();
defineSlots<MultiTemplateProperties["slots"]>();
</script>

<template>
	<div class="multi-layout">
		<slot name="formField" />
	</div>
</template>
