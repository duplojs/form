import { createInput } from "@V/input";
import { TheCheckbox, TheCheckboxPolicy, TheDateInput, TheFileInput, TheNumberInput, TheRadioGroup, TheRange, TheTextArea, TheTextInput, TheTimeInput } from "./components";

import "./designSystem.scss";

export * from "./components";

export const useTextInput = createInput(
	TheTextInput,
	{ defaultValue: "" },
);

export const useNumberInput = createInput(
	TheNumberInput,
	{ defaultValue: 0 },
);

export const useCheckBoxInput = createInput(
	TheCheckbox,
	{ defaultValue: false },
);

export const useCheckBoxPolicyInput = createInput(
	TheCheckboxPolicy,
	{ defaultValue: false },
);

export const useDateInput = createInput(
	TheDateInput,
	{ defaultValue: null },
);

export const useTextAreaInput = createInput(
	TheTextArea,
	{ defaultValue: "" },
);

export const useTimeInput = createInput(
	TheTimeInput,
	{ defaultValue: null },
);

export const useFileInput = createInput(
	TheFileInput,
	{ defaultValue: null },
);

export const useRadioGroupInput = createInput(
	TheRadioGroup,
	{
		defaultValue: null,
		props: { options: [] },
	},
);

export const useRangeInput = createInput(
	TheRange,
	{ defaultValue: 0 },
);
