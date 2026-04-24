import * as DD from "@duplojs/utils/date";
import { createInput } from "@V/input";
import DateInput from "./DateInput.vue";
import RangeDateInput from "./RangeDateInput.vue";

export { default as DateInput } from "./DateInput.vue";
export { default as RangeDateInput } from "./RangeDateInput.vue";

export const useDateInput = createInput(
	DateInput,
	{ defaultValue: () => DD.now() },
);

export const useRangeDateInput = createInput(
	RangeDateInput,
	{
		defaultValue: () => ({
			from: DD.now(),
			to: DD.addDays(DD.now(), 1),
		}),
	},
);
