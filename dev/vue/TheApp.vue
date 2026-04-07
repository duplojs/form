<script setup lang="ts">
import { createInput, useDisabledLayout, createForm, useMultiLayout, useCheckLayout, useRepeatLayout, useUnionLayout, useStepLayout } from "@V";
import { useGridFormTemplate, useGridCheckTemplate, useGridRepeatTemplate, useGridUnionTemplate, useGridMultiTemplate, useGridInputTemplate, useGridStepByStepTemplate } from "@V/templates/grid";
import { TheCheckbox, TheCheckboxPolicy, TheNumberInput, TheTextArea, TheTextInput } from "@V/designSystem";
import { ref } from "vue";
import { DPE } from "@duplojs/utils";

const useInput = createInput(
	TheTextInput,
	{
		defaultValue: () => "Default value",
	},
);

const disabled = ref(false);
const demoText = ref("Design system text");
const demoNumber = ref<number | undefined>(42);
const demoMessage = ref("Hello from TextArea");
const demoCheckbox = ref(true);
const demoPolicy = ref(false);

const useForm = createForm({
	form: useGridFormTemplate(),
	input: useGridInputTemplate(),
	multi: useGridMultiTemplate(),
	check: useGridCheckTemplate(),
	repeat: useGridRepeatTemplate(),
	union: useGridUnionTemplate(),
	step: useGridStepByStepTemplate({
		nextLabel: "Continue",
		previousLabel: "Back",
	}),
});

const { component: Form, currentValue, check } = useForm(
	useStepLayout(
		[
			useDisabledLayout(
				useUnionLayout(
					[
						[
							"one",
							useMultiLayout({
								name: useRepeatLayout(
									useInput({
										label: "Name",
										defaultValue: "Default value",
									}),
									{
										max: 10,
										min: 2,
									},
								),
								age: useCheckLayout(
									useInput({
										label: "Age",
										defaultValue: "26",
									}),
									{
										dataParser: DPE.coerce.number(),
										template: useGridCheckTemplate({
											columns: 2,
											hideEmptyMessageError: true,
										}),
									},
								),
							}),
						],
						[
							"two",
							useInput({ defaultValue: "Another default value" }),
						],
					],
					{ defaultKind: "one" },
				),
				{ isDisabled: () => disabled.value },
			),
			useInput({ defaultValue: "Step 2" }),
		],
		{ errorMessageNotAtLastStep: "Form not fully completed" },
	),
);
</script>

<template>
	<div class="playground">
		<Form @submit="console.log(check())">
			<button
				type="submit"
				class="playground-submit"
			>
				Submit
			</button>
		</Form>

		<button
			class="playground-disabled-toggle"
			@click="disabled = !disabled"
		>
			{{ disabled ? "Enable" : "Disable" }}
		</button>

		<section class="playground-demo">
			<h3 class="playground-demo-title">
				Design System Demo
			</h3>

			<div class="playground-demo-grid">
				<TheTextInput v-model="demoText" />

				<TheNumberInput
					v-model="demoNumber"
					placeholder="Your age"
					:min="0"
					:max="120"
				/>

				<TheTextArea
					v-model="demoMessage"
					placeholder="Write something..."
				/>

				<TheCheckbox v-model="demoCheckbox">
					Receive newsletters
				</TheCheckbox>

				<TheCheckboxPolicy
					v-model="demoPolicy"
					title="I accept the privacy policy"
					description="You can revoke your consent at any time."
					required
				/>
			</div>
		</section>

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

.playground-submit,
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

.playground-submit {
	border: 1px solid #b38f1f;
	background: #d4ac24;
	color: #ffffff;

	&:hover {
		background: #e1bc3f;
	}

	&:focus-visible {
		outline: none;
		box-shadow: 0 0 0 2px #f2dc92;
	}

	&:active {
		background: #c29b1d;
		transform: translateY(1px);
	}
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

.playground-demo {
	display: flex;
	flex-direction: column;
	gap: 0.6rem;
	padding: 0.75rem;
	border: 1px solid #e2e8f0;
	border-radius: 0.5rem;
	background: #ffffff;
}

.playground-demo-title {
	margin: 0;
	font-size: 0.9rem;
	font-weight: 700;
	color: #334155;
}

.playground-demo-grid {
	display: grid;
	grid-template-columns: repeat(2, minmax(0, 1fr));
	gap: 0.6rem;

	> :nth-child(3),
	> :nth-child(5) {
		grid-column: 1 / -1;
	}
}

@media (max-width: 640px) {
	.playground-demo-grid {
		grid-template-columns: 1fr;

		> * {
			grid-column: 1 / -1;
		}
	}
}
</style>
