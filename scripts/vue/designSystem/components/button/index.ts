import { type FunctionButtonComponent } from "@V/templates/grid/components/types";
import { h } from "vue";

import PrimaryButton from "./PrimaryButton.vue";
import OutlineButton from "./OutlineButton.vue";
import DestructiveButton from "./DestructiveButton.vue";

export { default as TheButton } from "./TheButton.vue";
export type { Icon, IconPosition, Props as TheButtonProps, Size, Variant } from "./TheButton.vue";
export { default as PrimaryButton } from "./PrimaryButton.vue";
export { default as DestructiveButton } from "./DestructiveButton.vue";
export { default as GhostButton } from "./GhostButton.vue";
export { default as OutlineButton } from "./OutlineButton.vue";

export const templateAddButton: FunctionButtonComponent = ({ label, disabled }) => h(
	PrimaryButton,
	{
		label,
		disabled,
		size: "sm",
		iconSize: "lg",
		icon: "plus",
		iconPosition: "start",
	},
);

export const templateRemoveButton: FunctionButtonComponent = ({ label, disabled }) => h(
	OutlineButton,
	{
		label,
		disabled,
		size: "sm",
		iconSize: "lg",
		iconPosition: "start",
	},
);

export const templateResetButton: FunctionButtonComponent = ({ label, disabled }) => h(
	DestructiveButton,
	{
		label,
		disabled,
		size: "sm",
		icon: "reset",
		iconSize: "lg",
		iconPosition: "start",
	},
);

export const templateNextButton: FunctionButtonComponent = ({ label, disabled }) => h(
	PrimaryButton,
	{
		label,
		disabled,
		size: "sm",
		icon: "next",
		iconSize: "lg",
		iconPosition: "end",
	},
);

export const templatePreviousButton: FunctionButtonComponent = ({ label, disabled }) => h(
	OutlineButton,
	{
		label,
		disabled,
		size: "sm",
		icon: "previous",
		iconSize: "lg",
		iconPosition: "start",
	},
);

