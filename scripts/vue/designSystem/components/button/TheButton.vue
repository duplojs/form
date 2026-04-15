<script setup lang="ts">
import { type HTMLAttributes, type ButtonHTMLAttributes, defineAsyncComponent } from "vue";
import type { DfvIconSize } from "../icons";

const iconMapper = {
	next: defineAsyncComponent(() => import("../icons/IconNext.vue")),
	previous: defineAsyncComponent(() => import("../icons/IconPrevious.vue")),
	plus: defineAsyncComponent(() => import("../icons/IconPlus.vue")),
	remove: defineAsyncComponent(() => import("../icons/IconRemove.vue")),
	reset: defineAsyncComponent(() => import("../icons/IconReset.vue")),
};

export type Icon = keyof typeof iconMapper;
export type Size = "sm" | "md" | "lg" | "xl" | "2xl";

export type Variant = "destructive" | "primary" | "ghost" | "outline";
export type IconPosition = "start" | "end";

export interface Props {
	label: string;
	className?: HTMLAttributes["class"];
	variant?: Variant;
	size?: Size;
	icon?: Icon;
	iconSize?: DfvIconSize;
	iconPosition?: IconPosition;
	disabled?: boolean;
	type?: ButtonHTMLAttributes["type"];
}

withDefaults(
	defineProps<Props>(),
	{
		size: "md",
		variant: "primary",
		iconPosition: "start",
		disabled: false,
		type: "button",
	},
);

</script>

<template>
	<button
		:class="[
			'DFV-button',
			`DFV-button-variant-${variant}`,
			`DFV-button-size-${size}`,
			className,
		]"
		:type="type"
		:aria-label="label"
		:disabled="disabled"
	>
		<component
			v-if="icon && iconPosition === 'start'"
			:is="iconMapper[icon]"
			:size="iconSize ?? size"
		/>

		<span>{{ label }}</span>

		<component
			v-if="icon && iconPosition === 'end'"
			:is="iconMapper[icon]"
			:size="iconSize ?? size"
		/>
	</button>
</template>
