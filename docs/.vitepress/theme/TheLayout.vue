<script setup lang="ts">
import { useData } from "vitepress";
import DefaultTheme, { VPHomeContent } from "vitepress/theme";
const { frontmatter } = useData();

const { Layout } = DefaultTheme;

</script>

<template>
	<Layout>
		<template #home-hero-after>
			<VPHomeContent v-if="frontmatter.heroAfter">
				<component :is="frontmatter.heroAfter" />
			</VPHomeContent>
		</template>
	</Layout>
</template>

