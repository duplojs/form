import { createInput } from "@V/input";
import { TheCheckbox, CheckboxPolicy, DateInput, FileInput, NumberInput, RadioGroup, RangeInput, TextareaInput, TextInput, TimeInput, DualRangeInput, RangeDateInput, RangeTimeInput } from "./components";

import "./designSystem.scss";

export * from "./components";

export const useTextInput = createInput(
	TextInput,
	{ defaultValue: "" },
);

export const useNumberInput = createInput(
	NumberInput,
	{ defaultValue: 0 },
);

export const useCheckBoxInput = createInput(
	TheCheckbox,
	{ defaultValue: false },
);

export const useCheckBoxPolicyInput = createInput(
	CheckboxPolicy,
	{ defaultValue: false },
);

export const useDateInput = createInput(
	DateInput,
	{ defaultValue: null },
);

export const useRangeDateInput = createInput(
	RangeDateInput,
	{
		defaultValue: () => ({
			to: null,
			from: null,
		}),
	},
);

export const useTextareaInput = createInput(
	TextareaInput,
	{ defaultValue: "" },
);

export const useTimeInput = createInput(
	TimeInput,
	{ defaultValue: null },
);

export const useRangeTimeInput = createInput(
	RangeTimeInput,
	{
		defaultValue: () => ({
			to: null,
			from: null,
		}),
	},
);

export const useFileInput = createInput(
	FileInput,
	{ defaultValue: null },
);

export const useRadioGroupInput = createInput(
	RadioGroup,
	{
		defaultValue: null,
		props: { options: [] },
	},
);

export const useRangeInput = createInput(
	RangeInput,
	{ defaultValue: 0 },
);

export const useDualRangeInput = createInput(
	DualRangeInput,
	{
		defaultValue: () => ({
			start: 0,
			end: 100,
		}),
	},
);
