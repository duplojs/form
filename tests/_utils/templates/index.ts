import { createTemplate, type Templates } from "@V/template";
import CheckTemplate from "./CheckTemplate.vue";
import FormTemplate from "./FormTemplate.vue";
import InputTemplate from "./InputTemplate.vue";
import MultiTemplate from "./MultiTemplate.vue";
import RepeatTemplate from "./RepeatTemplate.vue";
import StepTemplate from "./StepTemplate.vue";
import UnionTemplate from "./UnionTemplate.vue";

export const testTemplates: Templates = {
	check: createTemplate(CheckTemplate)(),
	form: createTemplate(FormTemplate)(),
	input: createTemplate(InputTemplate)(),
	multi: createTemplate(MultiTemplate)(),
	repeat: createTemplate(RepeatTemplate)(),
	step: createTemplate(StepTemplate)(),
	union: createTemplate(UnionTemplate)(),
};
