<script setup lang="ts">
interface Props {
	test: string;
}

defineProps<Props>();
</script>

<template>
	<div>
		{{ test }}
	</div>
</template>
