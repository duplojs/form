import { DestructiveButton, OutlineButton, PrimaryButton } from "@V/designSystem";
import { h, type VNode } from "vue";

export type FunctionButtonComponent = (props: {
	label?: string;
	disabled?: boolean;
}) => VNode;

export const defaultAddButton: FunctionButtonComponent = ({ label, disabled }) => h(
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

export const defaultRemoveButton: FunctionButtonComponent = ({ label, disabled }) => h(
	OutlineButton,
	{
		label,
		disabled,
		size: "sm",
		iconSize: "lg",
		iconPosition: "start",
	},
);

export const defaultResetButton: FunctionButtonComponent = ({ label, disabled }) => h(
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

export const defaultStepNextButton: FunctionButtonComponent = ({ label, disabled }) => h(
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

export const defaultStepPreviousButton: FunctionButtonComponent = ({ label, disabled }) => h(
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

export const defaultStepResetButton: FunctionButtonComponent = ({ label, disabled }) => h(
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
