<script setup lang="ts">
import { type SectionTemplateProperties } from "@form/v0/vue";

defineProps<SectionTemplateProperties["props"]>();
defineSlots<SectionTemplateProperties["slots"]>();
</script>

<template>
	<section>
		<h2 v-if="title">
			{{ title }}
		</h2>

		<slot name="formField" />
	</section>
</template>
