import { useSlotLayout } from "@form/v0/vue";
import { useTextareaInput } from "@form/v0/vueDesignSystem";

export const message = useSlotLayout(
	"customMessage",
	useTextareaInput({ label: "Message" }),
);
