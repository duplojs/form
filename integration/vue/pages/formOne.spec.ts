import { Actions, Assertions, createComponent, createPage } from "@duplojs/playwright";
import { testClient } from "@testClient";

testClient.describe("form one", () => {
	const HumanForm = createComponent("humanForm", {
		getMainElement: ({ body }) => body.locator(".DFV-deep_FRM_UNI-human_MUL"),
		getElements: ({ mainElement }) => ({
			nameField: mainElement.locator("#FRM_UNI-human_MUL-name_INP"),
			errorNameField: mainElement.locator(".DFV-deep_FRM_UNI-human_MUL-name_INP > .DFV-grid-error"),

			priceField: mainElement.locator("#FRM_UNI-human_MUL-price_INP"),
			errorPriceField: mainElement.locator(".DFV-deep_FRM_UNI-human_MUL-price_INP > .DFV-grid-error"),

			errorFields: mainElement.locator(".DFV-deep_FRM_UNI-human_MUL-fields_SEC_CHK > .DFV-grid-error"),

			nameOfFirstField: mainElement.locator(".DFV-deep_FRM_UNI-human_MUL-fields_SEC_CHK_REP-0_MUL-fieldName_INP > input"),
			errorNameOfFirstField: mainElement.locator(".DFV-deep_FRM_UNI-human_MUL-fields_SEC_CHK_REP-0_MUL-fieldName_INP > .DFV-grid-error"),
			maxCharOfFirstField: mainElement.locator("#FRM_UNI-human_MUL-fields_SEC_CHK_REP-0_MUL-fieldType_UNI-text_CHK_MUL-max_INP"),

			nameOfSecondField: mainElement.locator(".DFV-deep_FRM_UNI-human_MUL-fields_SEC_CHK_REP-1_MUL-fieldName_INP > input"),
			selectTypeOnSecondField: mainElement.locator("#select-FRM_UNI-human_MUL-fields_SEC_CHK_REP-1_MUL-fieldType_UNI"),
			firstLabelOnSecondField: mainElement.locator("#FRM_UNI-human_MUL-fields_SEC_CHK_REP-1_MUL-fieldType_UNI-select_SEC_REP-0_MUL-label_INP"),
			firstValueOnSecondField: mainElement.locator("#FRM_UNI-human_MUL-fields_SEC_CHK_REP-1_MUL-fieldType_UNI-select_SEC_REP-0_MUL-value_INP"),
			secondLabelOnSecondField: mainElement.locator("#FRM_UNI-human_MUL-fields_SEC_CHK_REP-1_MUL-fieldType_UNI-select_SEC_REP-1_MUL-label_INP"),
			secondValueOnSecondField: mainElement.locator("#FRM_UNI-human_MUL-fields_SEC_CHK_REP-1_MUL-fieldType_UNI-select_SEC_REP-1_MUL-value_INP"),

			addFieldButton: mainElement.locator(".DFV-deep_FRM_UNI-human_MUL-fields_SEC_CHK_REP > .DFV-grid-repeat-add > button"),
		}),
	});

	const AIAgentForm = createComponent("aIAgentForm", {
		getMainElement: ({ body }) => body.locator(".DFV-deep_FRM_UNI-AIAgent_STP"),
		getElements: ({ mainElement }) => ({
			nameField: mainElement.locator("#FRM_UNI-AIAgent_STP-0_MUL-name_INP"),
		}),
	});

	const FormOnePage = createPage("formOne", {
		makePath: () => "form-one",
		getMainElement: ({ body }) => body.getByTestId("form-one"),
		getElements: ({ mainElement }) => ({
			submitButton: mainElement.getByTestId("submit-button"),
			selectInputTypeForm: mainElement.locator("#select-FRM_UNI"),
			currentValue: mainElement.locator("#current-value"),
			checkedValue: mainElement.locator("#checked-value"),
		}),
		components: [HumanForm, AIAgentForm],
	});

	testClient("define name on human form and switch form and return on human form and see defined value on name", async({ website }) => {
		const page = await website.iNavigateTo(FormOnePage);

		await Assertions.toBeVisible(page, "submitButton");
		await Assertions.toBeVisible(page, "selectInputTypeForm");

		const humanForm = await page.iWantToSeeComponent("humanForm");

		await Assertions.toContainText(page, "currentValue", JSON.stringify({
			kind: "human",
			value: {
				name: "",
				price: 0,
				fields: [
					{
						fieldName: "",
						fieldType: {
							kind: "text",
							value: {
								min: 5,
								max: 30,
							},
						},
					},
				],
			},
		}));

		await Actions.fill(humanForm, "nameField", "superName");

		await Actions.selectOption(page, "selectInputTypeForm", "AIAgent");

		await Assertions.toContainText(page, "currentValue", JSON.stringify({
			kind: "AIAgent",
			value: {
				currentStep: 0,
				steps: [
					{
						name: "",
						price: 0,
						fields: [
							{
								fieldName: "",
								fieldType: {
									kind: "text",
									value: {
										min: 5,
										max: 30,
									},
								},
							},
						],
					},
					{
						route: "",
						routePing: "",
						key: "",
					},
				],
			},
		}));

		await page.iWantToSeeComponent("aIAgentForm");

		await Actions.selectOption(page, "selectInputTypeForm", "human");

		await page.iWantToSeeComponent("humanForm");

		await Assertions.toHaveValue(humanForm, "nameField", "superName");

		await Assertions.toContainText(page, "currentValue", JSON.stringify({
			kind: "human",
			value: {
				name: "superName",
				price: 0,
				fields: [
					{
						fieldName: "",
						fieldType: {
							kind: "text",
							value: {
								min: 5,
								max: 30,
							},
						},
					},
				],
			},
		}));
	});

	testClient("submit human form and see error field", async({ website }) => {
		const page = await website.iNavigateTo(FormOnePage);
		await Assertions.toContainText(page, "checkedValue", "");

		const humanForm = await page.iWantToSeeComponent("humanForm");

		await Actions.click(page, "submitButton");

		await Assertions.toContainText(humanForm, "errorNameField", "Nom trop cours");
		await Assertions.toContainText(humanForm, "errorPriceField", "Prix invalide");
		await Assertions.toContainText(humanForm, "errorNameOfFirstField", "Nom de champ trop cours");
		await Assertions.toContainText(page, "checkedValue", "");
	});

	testClient("submit human form with a text field and a select field", async({ website }) => {
		const page = await website.iNavigateTo(FormOnePage);

		const humanForm = await page.iWantToSeeComponent("humanForm");

		await Actions.fill(humanForm, "nameField", "test");
		await Actions.fill(humanForm, "priceField", "12");
		await Actions.fill(humanForm, "nameOfFirstField", "field1");
		await Actions.fill(humanForm, "maxCharOfFirstField", "20");

		await Actions.click(humanForm, "addFieldButton");

		await Actions.fill(humanForm, "nameOfSecondField", "field1");
		await Actions.selectOption(humanForm, "selectTypeOnSecondField", "select");
		await Actions.fill(humanForm, "firstLabelOnSecondField", "toto");
		await Actions.fill(humanForm, "firstValueOnSecondField", "yoyo");
		await Actions.fill(humanForm, "secondLabelOnSecondField", "tata");
		await Actions.fill(humanForm, "secondValueOnSecondField", "ploplo");

		await Actions.click(page, "submitButton");

		await Assertions.toContainText(humanForm, "errorFields", "Les noms de champ suivant sont utilisais en double : field1.");

		await Actions.fill(humanForm, "nameOfSecondField", "field2");

		await Actions.click(page, "submitButton");

		await Assertions.toContainText(page, "checkedValue", JSON.stringify({
			kind: "human",
			value: {
				name: "test",
				price: 12,
				fields: [
					{
						fieldName: "field1",
						fieldType: {
							kind: "text",
							value: {
								min: 5,
								max: 20,
							},
						},
					},
					{
						fieldName: "field2",
						fieldType: {
							kind: "select",
							value: [
								{
									label: "toto",
									value: "yoyo",
								},
								{
									label: "tata",
									value: "ploplo",
								},
							],
						},
					},
				],
			},
		}));
	});
});
