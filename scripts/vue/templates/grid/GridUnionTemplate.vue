<script setup lang="ts">
import { type UnionTemplateProperties } from "@V/layouts";
import { computed } from "vue";

export type Props = UnionTemplateProperties["props"];

const props = defineProps<Props>();

const emit = defineEmits<UnionTemplateProperties["emits"]>();

defineSlots<UnionTemplateProperties["slots"]>();

const modelValue = computed({
	get: () => props.getCurrentKind(),
	set: (value) => {
		emit("changeKind", value);
	},
});
</script>

<template>
	<div>
		<select v-model="modelValue">
			<option
				v-for="kind in kinds"
				:value="kind"
				:key="kind"
			>
				{{ kind }}
			</option>
		</select>

		<slot name="formField" />
	</div>
</template>
