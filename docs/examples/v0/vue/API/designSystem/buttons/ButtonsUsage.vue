<script setup lang="ts">
import {
	DestructiveButton,
	GhostButton,
	OutlineButton,
	PrimaryButton,
} from "@form/v0/vueDesignSystem";
</script>

<template>
	<div style="display: flex; gap: 8px; flex-wrap: wrap;">
		<PrimaryButton label="Save" />

		<OutlineButton label="Cancel" />

		<GhostButton label="Preview" />

		<DestructiveButton label="Delete" />
	</div>
</template>
