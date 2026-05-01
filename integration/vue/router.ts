import FormOne from "pages/FormOne.vue";
import { createRouter, createWebHistory } from "vue-router";

export const routes = [
	{
		path: "/form-one",
		component: FormOne,
	},
];

export const router = createRouter({
	history: createWebHistory(),
	routes,
});
