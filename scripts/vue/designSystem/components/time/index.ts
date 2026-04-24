import * as DD from "@duplojs/utils/date";
import { createInput } from "@V/input";
import RangeTimeInput from "./RangeTimeInput.vue";
import TimeInput from "./TimeInput.vue";

export { default as TimeInput } from "./TimeInput.vue";
export { default as RangeTimeInput } from "./RangeTimeInput.vue";

export const useTimeInput = createInput(
	TimeInput,
	{
		defaultValue: () => DD.createTime(0, "second"),
	},
);

export const useRangeTimeInput = createInput(
	RangeTimeInput,
	{
		defaultValue: () => ({
			from: DD.createTime(0, "second"),
			to: DD.createTime(0, "second"),
		}),
	},
);
