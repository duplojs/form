import { createApp } from "vue";
import TheApp from "./TheApp.vue";
import { router } from "./router";

createApp(TheApp)
	.use(router)
	.mount("#app");
