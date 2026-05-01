import { useSlotLayout } from "@duplojs/form/vue";
import { useTextareaInput } from "@duplojs/form/vueDesignSystem";

export const message = useSlotLayout(
	"customMessage",
	useTextareaInput({ label: "Message" }),
);
