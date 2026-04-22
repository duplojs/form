import { createRouter, createWebHistory } from "vue-router";
import FormAView from "./views/FormAView.vue";
import FormBView from "./views/FormBView.vue";

export const routes = [
	{
		path: "/",
		redirect: "/form-a",
	},
	{
		path: "/form-a",
		name: "form-a",
		component: FormAView,
	},
	{
		path: "/form-b",
		name: "form-b",
		component: FormBView,
	},
];

export const router = createRouter({
	history: createWebHistory(),
	routes,
});
