<script setup lang="ts">
import * as EE from "@duplojs/utils/either";
import * as AA from "@duplojs/utils/array";
import "@duplojs/form/vueDesignSystem.css";
import "@duplojs/form/vueGrid.css";
import { createForm, useCheckLayout, useMultiLayout, useRepeatLayout, useSectionLayout, useStepLayout, useUnionLayout, type GetCheckedValue } from "@duplojs/form/vue";
import { createGridTemplates } from "@duplojs/form/vueGrid";
import { PrimaryButton, templateFormAddButton, templateFormNextButton, templateFormPreviousButton, templateFormRemoveButton, templateFormResetButton, templateFormSelect, useNumberInput, useTextInput } from "@duplojs/form/vueDesignSystem";
import { ref } from "vue";
import { DPE, innerPipe, isType, unwrap, when } from "@duplojs/utils";

const templatesGrid = createGridTemplates({
	repeat: {
		addLabel: "Add another item",
		removeLabel: "Remove this item",
		addButton: templateFormAddButton,
		removeButton: templateFormRemoveButton,
		resetButton: templateFormResetButton,
	},
	step: {
		nextLabel: "Continue",
		previousLabel: "Back",
		resetButton: templateFormResetButton,
		nextButton: templateFormNextButton,
		previousButton: templateFormPreviousButton,
	},
	union: { selectInputKind: templateFormSelect },
});

const useForm = createForm(templatesGrid.useTemplates());

const sameField = useMultiLayout({
	name: useTextInput({
		label: "Name",
		class: "grid-col-6",
		dataParser: DPE.string().min(3).max(20),
	}),
	price: useNumberInput({
		label: "Price",
		class: "grid-col-6",
		dataParser: DPE.number().min(1),
	}),
	fields: useSectionLayout(
		useCheckLayout(
			useRepeatLayout(
				useMultiLayout({
					fieldName: useTextInput({
						label: "Nom du champ",
						dataParser: DPE.string().min(3).max(20),
					}),
					fieldType: useUnionLayout(
						[
							[
								"text",
								useCheckLayout(
									useMultiLayout({
										min: useNumberInput({
											label: "Nombre Charactére minimum",
											defaultValue: 5,
											class: "grid-col-6",
										}),
										max: useNumberInput({
											label: "Nombre Charactére Maximum",
											defaultValue: 30,
											class: "grid-col-6",
										}),
									}),
									{
										refine: ({ min, max }) => min < max
											? EE.ok()
											: EE.error("Le minimum ne doit pas étre supérieur au maximum"),
									},
								),
							],
							[
								"select",
								useSectionLayout(
									useRepeatLayout(
										useMultiLayout({
											label: useTextInput({
												label: "Label",
												class: "grid-col-6",
												dataParser: DPE.string().min(3).max(20),
											}),
											value: useTextInput({
												label: "Valeur",
												class: "grid-col-6",
												dataParser: DPE.string().min(3).max(20),
											}),
										}),
										{
											min: 2,
											max: 10,
											class: "select-field-repeat",
											template: templatesGrid.useRepeatTemplate({
												addLabel: "Ajouter une valeur",
												resetLabel: "",
												removeLabel: "Delete",
											}),
										},
									),
									{ title: "Valeurs" },
								),

							],
						],
						{ defaultKind: "text" },
					),
				}),
				{
					min: 1,
					max: 10,
					class: "fields-repeat",
					template: templatesGrid.useRepeatTemplate({
						addLabel: "Ajouter un nouveaux champ",
					}),
				},
			),
			{
				refine: innerPipe(
					AA.select(
						({ element, select, skip, self, index }) => AA.findLastIndex(
							self,
							(reversElement) => reversElement.fieldName === element.fieldName,
						) === index
							? skip()
							: select(element.fieldName),
					),
					when(
						AA.minElements(1),
						(fieldNames) => EE.error(`Les noms de champ suivant sont utilisais en double : ${AA.join(fieldNames, ", ")}.`),
					),
					when(
						isType("array"),
						EE.ok,
					),
				),
			},
		),
		{
			title: "Champs :",
			class: "fields-section",
		},
	),

});

const { component: Form, currentValue, check } = useForm(
	useUnionLayout(
		[
			[
				"human",
				sameField,
			],
			[
				"AIAgent",
				useStepLayout(
					[
						sameField,
						useMultiLayout({
							route: useTextInput(),
							routePing: useTextInput(),
							key: useTextInput(),
						}),
					],
					{ errorMessageNotAtLastStep: "étape incompléte." },
				),
			],
		],
		{
			defaultKind: "human",
			template: templatesGrid.useUnionTemplate({
				labels: {
					human: "humain",
				},
			}),
		},
	),
);

const checkedValue = ref<GetCheckedValue<typeof check> | null>(null);

function submit() {
	const result = check();
	if (EE.isLeft(result)) {
		checkedValue.value = null;
		return;
	}

	checkedValue.value = unwrap(result);
}
</script>

<template>
	<div>
		<Form @submit="submit">
			<PrimaryButton
				type="submit"
				label="submit"
				:disabled="
					currentValue.kind === 'AIAgent'
						&& !AA.isLastIndex(currentValue.value.steps, currentValue.value.currentStep)
				"
			/>
		</Form>

		<div id="current-value">
			{{ currentValue }}
		</div>

		<div id="checked-value">
			{{ checkedValue }}
		</div>
	</div>
</template>

<style lang="scss">
.grid-col-6 {
	--DFV-grid-columns: 6
}

.fields-repeat > .DFV-grid-repeat-add {
	display: flex;
	justify-content: center;
}

.fields-section {
	> label {
		font-size: var(--DFV-font-size-xl);
	}
}
</style>
