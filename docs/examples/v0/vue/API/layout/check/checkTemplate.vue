<script setup lang="ts">
import { type CheckTemplateProperties } from "@duplojs/form/vue";

defineProps<CheckTemplateProperties["props"]>();
defineSlots<CheckTemplateProperties["slots"]>();
</script>

<template>
	<div>
		<slot name="formField" />

		<small v-if="getErrorMessage()">
			{{ getErrorMessage() }}
		</small>
	</div>
</template>
