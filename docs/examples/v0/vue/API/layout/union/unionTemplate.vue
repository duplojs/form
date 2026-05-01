<script setup lang="ts">
import { type UnionTemplateProperties } from "@duplojs/form/vue";

defineProps<UnionTemplateProperties["props"]>();
defineSlots<UnionTemplateProperties["slots"]>();
defineEmits<UnionTemplateProperties["emits"]>();
</script>

<template>
	<div>
		<select @change="$emit('changeKind', ($event.target as HTMLSelectElement).value)">
			<option
				v-for="kind in kinds"
				:key="kind"
				:selected="kind === getCurrentKind()"
				:value="kind"
			>
				{{ kind }}
			</option>
		</select>

		<slot name="formField" />
	</div>
</template>
