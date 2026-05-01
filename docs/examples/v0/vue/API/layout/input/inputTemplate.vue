<script setup lang="ts">
import { type InputTemplateProperties } from "@duplojs/form/vue";

defineProps<InputTemplateProperties["props"]>();
defineSlots<InputTemplateProperties["slots"]>();
</script>

<template>
	<div>
		<label v-if="getLabel">
			{{ getLabel() }}
		</label>

		<slot name="input" />

		<small v-if="getErrorMessage">
			{{ getErrorMessage() }}
		</small>
	</div>
</template>
