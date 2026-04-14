<script setup lang="ts">
import { createInput, useDisabledLayout, createForm, useMultiLayout, useCheckLayout, useRepeatLayout, useUnionLayout, useStepLayout, useSectionLayout } from "@V";
import { useGridFormTemplate, useGridCheckTemplate, useGridRepeatTemplate, useGridUnionTemplate, useGridMultiTemplate, useGridInputTemplate, useGridStepByStepTemplate, useGridSectionTemplate } from "@V/templates/grid";
import { TheCheckbox, TheCheckboxPolicy, TheDateInput, TheFileInput, TheNumberInput, TheRadioGroup, TheRange, TheSubmitButton, TheTextArea, TheTextInput, TheTimeInput } from "@V/designSystem";
import { ref } from "vue";
import { D, DPE } from "@duplojs/utils";

const useTextInput = createInput(
	TheTextInput,
	{
		defaultValue: () => "Default value",
	},
);

const useNumberInput = createInput(
	TheNumberInput,
	{
		defaultValue: () => 42,
	},
);

const useTextArea = createInput(
	TheTextArea,
	{
		defaultValue: () => "Default value",
	},
);

const useCheckbox = createInput(
	TheCheckbox,
	{
		defaultValue: () => false,
		props: {
			name: "newsletter",
		},
	},
);

const useCheckboxPolicy = createInput(
	TheCheckboxPolicy,
	{
		defaultValue: () => false,
		props: {
			title: "I accept the terms",
			description: "Required to continue the process.",
			name: "policy",
			required: true,
		},
	},
);

const useRadioGroup = createInput(
	TheRadioGroup,
	{
		defaultValue: () => "weekly",
		props: {
			name: "frequency",
			options: [
				{
					value: "daily",
					label: "Daily updates",
					description: "Immediate notifications",
				},
				{
					value: "weekly",
					label: "Weekly digest",
					description: "One summary per week",
				},
				{
					value: "never",
					label: "No notifications",
					description: "Only essential account emails",
				},
			],
		},
	},
);

const useRangeInput = createInput(
	TheRange,
	{
		defaultValue: () => 35,
		props: {
			min: 0,
			max: 100,
			step: 5,
		},
	},
);

const useDateInput = createInput(
	TheDateInput,
	{
		defaultValue: () => D.now(),
		props: {
			min: D.create("1900-01-01"),
			max: D.create("2100-12-31"),
		},
	},
);

const useTimeInput = createInput(
	TheTimeInput,
	{
		defaultValue: () => D.createTime(9.5, "hour"),
		props: {
			min: D.createTime(8, "hour"),
			max: D.createTime(20, "hour"),
			step: 300,
		},
	},
);

const useFileInput = createInput(
	TheFileInput,
	{
		defaultValue: () => [] as File[],
		props: {
			accept: ".pdf,.png,.jpg",
			multiple: true,
		},
	},
);

const disabled = ref(false);

const useForm = createForm({
	form: useGridFormTemplate(),
	input: useGridInputTemplate(),
	multi: useGridMultiTemplate(),
	check: useGridCheckTemplate(),
	section: useGridSectionTemplate(),
	repeat: useGridRepeatTemplate({
		addLabel: "Add another item",
		removeLabel: "Remove this item",
	}),
	union: useGridUnionTemplate(),
	step: useGridStepByStepTemplate({
		nextLabel: "Continue",
		previousLabel: "Back",
	}),
});

const { component: Form, currentValue, check } = useForm(
	useStepLayout(
		[
			useSectionLayout(
				useDisabledLayout(
					useUnionLayout(
						[
							[
								"Choice one",
								useMultiLayout({
									name: useRepeatLayout(
										useTextInput({
											label: "Name",
											defaultValue: "Default value",
										}),
										{
											max: 10,
											min: 2,
										},
									),
									age: useCheckLayout(
										useNumberInput({
											label: "Age",
											defaultValue: 26,
										}),
										{
											dataParser: DPE.coerce.number(),
											template: useGridCheckTemplate({
												columns: 2,
												hideEmptyMessageError: true,
											}),
										},
									),
									bio: useTextArea({
										label: "Bio",
									}),
									score: useRangeInput({
										label: "Score",
									}),
								}),
							],
							[
								"Choice two",
								useMultiLayout({
									comment: useTextArea({
										label: "Comment",
										defaultValue: "Another default value",
									}),
									subscribe: useCheckbox({
										label: "Newsletter",
									}),
									policy: useCheckboxPolicy({
										label: "Policy",
									}),
									notificationFrequency: useRadioGroup({
										label: "Frequency",
									}),
									attachments: useFileInput({
										label: "Attachments",
									}),
								}),
							],
						],
						{ defaultKind: "Choice one" },
					),
					{ isDisabled: () => disabled.value },
				),
				{ title: "Profile details" },
			),
			useSectionLayout(
				useMultiLayout({
					stepTitle: useTextInput({
						label: "Step title",
						defaultValue: "Step 2",
					}),
					stepDate: useDateInput({
						label: "Step date",
					}),
					stepTime: useTimeInput({
						label: "Step time",
					}),
					stepLevel: useNumberInput({
						label: "Priority",
						defaultValue: 2,
					}),
				}),
				{ title: "Scheduling" },
			),
		],
		{ errorMessageNotAtLastStep: "Form not fully completed" },
	),
);
</script>

<template>
	<div class="playground">
		<Form @submit="console.log(check())">
			<TheSubmitButton label="Submit" />
		</Form>

		<button
			class="playground-disabled-toggle"
			@click="disabled = !disabled"
		>
			{{ disabled ? "Enable" : "Disable" }}
		</button>

		<pre class="playground-output">{{ currentValue }}</pre>
	</div>
</template>

<style lang="scss" scoped>
.playground {
	display: flex;
	flex-direction: column;
	gap: 0.75rem;
	padding: 1rem;
}

.playground-disabled-toggle {
	display: inline-flex;
	align-items: center;
	justify-content: center;
	min-height: 2.25rem;
	padding: 0.5rem 1rem;
	border-radius: 0.5rem;
	font-size: 0.875rem;
	font-weight: 600;
	line-height: 1.1;
	cursor: pointer;
	transition:
		background-color 140ms ease,
		border-color 140ms ease,
		box-shadow 140ms ease,
		transform 140ms ease;
}
.playground-disabled-toggle {
	border: 1px solid #cbd5e1;
	background: #f8fafc;
	color: #334155;

	&:hover {
		background: #f1f5f9;
		border-color: #94a3b8;
	}

	&:focus-visible {
		outline: none;
		box-shadow: 0 0 0 2px #cbd5e1;
	}

	&:active {
		background: #e2e8f0;
		transform: translateY(1px);
	}
}

.playground-output {
	margin: 0;
	padding: 0.65rem 0.75rem;
	border: 1px solid #e2e8f0;
	border-radius: 0.5rem;
	background: #ffffff;
	font-size: 0.8rem;
	line-height: 1.25;
	white-space: pre-wrap;
	word-break: break-word;
}
</style>
