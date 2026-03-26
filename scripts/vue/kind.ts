import { createKindNamespace } from "@duplojs/utils";

declare module "@duplojs/utils" {
	interface ReservedKindNamespace {
		DuplojsVueForm: true;
	}
}

export const createVueFormKind = createKindNamespace(
	// @ts-expect-error reserved kind namespace
	"DuplojsVueForm",
);
