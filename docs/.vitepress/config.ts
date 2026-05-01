import { defineConfig, type DefaultTheme, type UserConfig } from "vitepress";
import { transformerTwoslash } from "@shikijs/vitepress-twoslash";
import { ModuleDetectionKind, ModuleKind, ModuleResolutionKind } from "typescript";
import { groupIconMdPlugin, groupIconVitePlugin } from "vitepress-plugin-group-icons";
import { A, innerPipe, Path, pipe, S, type AnyFunction } from "@duplojs/utils";
import { withMermaid } from "vitepress-plugin-mermaid";

const hostname = "https://form.duplojs.dev";
const ogImage = new URL("/images/ogImage.png", hostname).toString();

export default pipe(
	{
		title: "@duplojs/form",
		base: "/",
		cleanUrls: true,
		sitemap: {
			hostname,
		},
		head: [
			[
				"link",
				{
					rel: "icon",
					href: "/images/logo.ico",
				},
			],
			[
				"meta",
				{
					property: "og:type",
					content: "website",
				},
			],
			[
				"meta",
				{
					property: "og:image",
					content: ogImage,
				},
			],
			[
				"meta",
				{
					name: "twitter:card",
					content: "summary_large_image",
				},
			],
			[
				"meta",
				{
					name: "twitter:image",
					content: ogImage,
				},
			],
		],
		themeConfig: {
			logo: "/images/logo.png",
			wip: {
				title: "WIP",
				button: "Request this page",
			},
			socialLinks: [
				{
					icon: "github",
					link: "https://github.com/duplojs/form",
				},
				{
					icon: "npm",
					link: "https://www.npmjs.com/package/@duplojs/form",
				},
				{
					icon: "linkedin",
					link: "https://linkedin.com/company/duplojs",
				},
				{
					icon: "discord",
					link: "https://discord.gg/5d6Ze5Wuqm",
				},
			],
			search: {
				provider: "local",
			},
		},
		markdown: {
			config: (md) => {
				md.use(groupIconMdPlugin);
			},
			codeTransformers: [
				{
					name: "duplo-version-transformer",
					preprocess: innerPipe(
						S.replace(
							/\/\/ @version: (?<version>[0-9]+)/,
							({ namedGroups }) => A.join(
								[
									"// @filename: @duplojs/form/vue.ts",
									`export * from "@form/v${namedGroups?.version ?? ""}/vue";`,

									"// @filename: @duplojs/form/vueGrid.ts",
									`export * from "@form/v${namedGroups?.version ?? ""}/vueGrid";`,

									"// @filename: @duplojs/form/vueGrid.css.ts",
									`export * from "@form/v${namedGroups?.version ?? ""}/vueGrid";`,

									"// @filename: @duplojs/form/vueDesignSystem.ts",
									`export * from "@form/v${namedGroups?.version ?? ""}/vueDesignSystem";`,

									"// @filename: @duplojs/form/vueDesignSystem.css.ts",
									`export * from "@form/v${namedGroups?.version ?? ""}/vueDesignSystem";`,

									"// @filename: index.ts",
									"// ---cut---",
								],
								"\n",
							),
						),
						S.replace(
							/ ?@ts-expect-error/g,
							"",
						),
					),
				},
				transformerTwoslash({
					twoslashOptions: {
						compilerOptions: {
							module: ModuleKind.ESNext,
							moduleResolution: ModuleResolutionKind.Bundler,
							moduleDetection: ModuleDetectionKind.Force,
							types: ["@types/web", "vue"],
							allowArbitraryExtensions: true,
						},
					},
				}),
			],
			languages: ["js", "jsx", "ts", "tsx", "vue", "css"],
		},
		vite: {
			plugins: [groupIconVitePlugin()],
			resolve: {
				alias: {
					"@": Path.resolveRelative([import.meta.dirname, ".."]),
				},
			},
		},
		locales: {
			fr: {
				label: "Français",
				lang: "fr",
				link: "/fr/",
				themeConfig: {
					nav: [
						{
							text: "Guide",
							link: "/fr/v0/vue/guide",
						},
						{
							text: "API",
							items: [
								{
									text: "Layouts",
									link: "/fr/v0/vue/API/layout",
								},
								{
									text: "Templates Grid",
									link: "/fr/v0/vue/API/templatesGrid",
								},
								{
									text: "Design system",
									link: "/fr/v0/vue/API/designSystem",
								},
							],
						},
						{
							text: "v0.x (LTS)",
							items: [
								{
									text: "v0.x (LTS)",
									link: "/fr/v0/vue/guide/",
								},
							],
						},
					],
					sidebar: {
						"/fr/v0/vue/guide": [
							{
								text: "Commencer",
								items: [
									{
										text: "Introduction",
										link: "/fr/v0/vue/guide/",
									},
									{
										text: "Démarrage rapide",
										link: "/fr/v0/vue/guide/quickStart",
									},
								],
							},
							{
								text: "Les Bases",
								items: [
									{
										text: "Initialiser un formulaire",
										link: "/fr/v0/vue/guide/form",
									},
									{
										text: "Création d'un input",
										link: "/fr/v0/vue/guide/input",
									},
									{
										text: "Les layouts",
										link: "/fr/v0/vue/guide/layout",
									},
									{
										text: "Les templates",
										link: "/fr/v0/vue/guide/template",
									},
								],
							},
							{
								text: "Composants par défaut",
								items: [
									{
										text: "Templates Grid",
										link: "/fr/v0/vue/guide/templatesGrid",
									},
									{
										text: "Design system",
										link: "/fr/v0/vue/guide/designSystem",
									},
								],
							},
						],
						"/fr/v0/vue/API/layout": [
							{
								text: "API Layout",
								items: [
									{
										text: "Introduction",
										link: "/fr/v0/vue/API/layout/",
									},
									{
										text: "Formulaire",
										link: "/fr/v0/vue/API/layout/form",
									},
									{
										text: "Input",
										link: "/fr/v0/vue/API/layout/input",
									},
									{
										text: "useMultiLayout",
										link: "/fr/v0/vue/API/layout/multi",
									},
									{
										text: "useRepeatLayout",
										link: "/fr/v0/vue/API/layout/repeat",
									},
									{
										text: "useUnionLayout",
										link: "/fr/v0/vue/API/layout/union",
									},
									{
										text: "useStepLayout",
										link: "/fr/v0/vue/API/layout/step",
									},
									{
										text: "useSectionLayout",
										link: "/fr/v0/vue/API/layout/section",
									},
									{
										text: "useSlotLayout",
										link: "/fr/v0/vue/API/layout/slot",
									},
									{
										text: "useCheckLayout",
										link: "/fr/v0/vue/API/layout/check",
									},
									{
										text: "useDisabledLayout",
										link: "/fr/v0/vue/API/layout/disabled",
									},
								],
							},
						],
						"/fr/v0/vue/API/templatesGrid": [
							{
								text: "API Templates Grid",
								items: [
									{
										text: "Introduction",
										link: "/fr/v0/vue/API/templatesGrid/",
									},
									{
										text: "createGridTemplates",
										link: "/fr/v0/vue/API/templatesGrid/createGridTemplates",
									},
									{
										text: "GridFormTemplate",
										link: "/fr/v0/vue/API/templatesGrid/form",
									},
									{
										text: "GridInputTemplate",
										link: "/fr/v0/vue/API/templatesGrid/input",
									},
									{
										text: "GridMultiTemplate",
										link: "/fr/v0/vue/API/templatesGrid/multi",
									},
									{
										text: "GridCheckTemplate",
										link: "/fr/v0/vue/API/templatesGrid/check",
									},
									{
										text: "GridRepeatTemplate",
										link: "/fr/v0/vue/API/templatesGrid/repeat",
									},
									{
										text: "GridUnionTemplate",
										link: "/fr/v0/vue/API/templatesGrid/union",
									},
									{
										text: "GridStepByStepTemplate",
										link: "/fr/v0/vue/API/templatesGrid/step",
									},
									{
										text: "GridSectionTemplate",
										link: "/fr/v0/vue/API/templatesGrid/section",
									},
								],
							},
						],
						"/fr/v0/vue/API/designSystem": [
							{
								text: "API Design System",
								items: [
									{
										text: "Introduction",
										link: "/fr/v0/vue/API/designSystem/",
									},
									{
										text: "Tokens et thème",
										link: "/fr/v0/vue/API/designSystem/theme",
									},
									{
										text: "Boutons",
										link: "/fr/v0/vue/API/designSystem/buttons",
									},
									{
										text: "Texte et nombre",
										link: "/fr/v0/vue/API/designSystem/text",
									},
									{
										text: "Select et radio",
										link: "/fr/v0/vue/API/designSystem/selectRadio",
									},
									{
										text: "Checkbox",
										link: "/fr/v0/vue/API/designSystem/checkbox",
									},
									{
										text: "Date",
										link: "/fr/v0/vue/API/designSystem/date",
									},
									{
										text: "Heure",
										link: "/fr/v0/vue/API/designSystem/time",
									},
									{
										text: "Range",
										link: "/fr/v0/vue/API/designSystem/range",
									},
									{
										text: "Fichier",
										link: "/fr/v0/vue/API/designSystem/file",
									},
									{
										text: "Helpers",
										link: "/fr/v0/vue/API/designSystem/helpers",
									},
								],
							},
						],
					},
				},
			},
			root: {
				label: "English",
				lang: "en",
				link: "/en/",
				themeConfig: {
					nav: [
						{
							text: "Guide",
							link: "/en/v0/vue/guide",
						},
						{
							text: "API",
							items: [
								{
									text: "Layouts",
									link: "/en/v0/vue/API/layout",
								},
								{
									text: "Templates Grid",
									link: "/en/v0/vue/API/templatesGrid",
								},
								{
									text: "Design system",
									link: "/en/v0/vue/API/designSystem",
								},
							],
						},
						{
							text: "v0.x (LTS)",
							items: [
								{
									text: "v0.x (LTS)",
									link: "/en/v0/vue/guide/",
								},
							],
						},
					],
					docFooter: {
						prev: "Previous page",
						next: "Next page",
					},
					sidebar: {
						"/en/v0/vue/guide": [
							{
								text: "Getting Started",
								items: [
									{
										text: "Introduction",
										link: "/en/v0/vue/guide/",
									},
									{
										text: "Quick start",
										link: "/en/v0/vue/guide/quickStart",
									},
								],
							},
							{
								text: "Fundamentals",
								items: [
									{
										text: "Initialize a form",
										link: "/en/v0/vue/guide/form",
									},
									{
										text: "Create an input",
										link: "/en/v0/vue/guide/input",
									},
									{
										text: "Layouts",
										link: "/en/v0/vue/guide/layout",
									},
									{
										text: "Templates",
										link: "/en/v0/vue/guide/template",
									},
								],
							},
							{
								text: "Default components",
								items: [
									{
										text: "Templates Grid",
										link: "/en/v0/vue/guide/templatesGrid",
									},
									{
										text: "Design system",
										link: "/en/v0/vue/guide/designSystem",
									},
								],
							},
						],
						"/en/v0/vue/API/layout": [
							{
								text: "Layout API",
								items: [
									{
										text: "Introduction",
										link: "/en/v0/vue/API/layout/",
									},
									{
										text: "Form",
										link: "/en/v0/vue/API/layout/form",
									},
									{
										text: "Input",
										link: "/en/v0/vue/API/layout/input",
									},
									{
										text: "useMultiLayout",
										link: "/en/v0/vue/API/layout/multi",
									},
									{
										text: "useRepeatLayout",
										link: "/en/v0/vue/API/layout/repeat",
									},
									{
										text: "useUnionLayout",
										link: "/en/v0/vue/API/layout/union",
									},
									{
										text: "useStepLayout",
										link: "/en/v0/vue/API/layout/step",
									},
									{
										text: "useSectionLayout",
										link: "/en/v0/vue/API/layout/section",
									},
									{
										text: "useSlotLayout",
										link: "/en/v0/vue/API/layout/slot",
									},
									{
										text: "useCheckLayout",
										link: "/en/v0/vue/API/layout/check",
									},
									{
										text: "useDisabledLayout",
										link: "/en/v0/vue/API/layout/disabled",
									},
								],
							},
						],
						"/en/v0/vue/API/templatesGrid": [
							{
								text: "Templates Grid API",
								items: [
									{
										text: "Introduction",
										link: "/en/v0/vue/API/templatesGrid/",
									},
									{
										text: "createGridTemplates",
										link: "/en/v0/vue/API/templatesGrid/createGridTemplates",
									},
									{
										text: "GridFormTemplate",
										link: "/en/v0/vue/API/templatesGrid/form",
									},
									{
										text: "GridInputTemplate",
										link: "/en/v0/vue/API/templatesGrid/input",
									},
									{
										text: "GridMultiTemplate",
										link: "/en/v0/vue/API/templatesGrid/multi",
									},
									{
										text: "GridCheckTemplate",
										link: "/en/v0/vue/API/templatesGrid/check",
									},
									{
										text: "GridRepeatTemplate",
										link: "/en/v0/vue/API/templatesGrid/repeat",
									},
									{
										text: "GridUnionTemplate",
										link: "/en/v0/vue/API/templatesGrid/union",
									},
									{
										text: "GridStepByStepTemplate",
										link: "/en/v0/vue/API/templatesGrid/step",
									},
									{
										text: "GridSectionTemplate",
										link: "/en/v0/vue/API/templatesGrid/section",
									},
								],
							},
						],
						"/en/v0/vue/API/designSystem": [
							{
								text: "Design system API",
								items: [
									{
										text: "Introduction",
										link: "/en/v0/vue/API/designSystem/",
									},
									{
										text: "Tokens and theme",
										link: "/en/v0/vue/API/designSystem/theme",
									},
									{
										text: "Buttons",
										link: "/en/v0/vue/API/designSystem/buttons",
									},
									{
										text: "Text and number inputs",
										link: "/en/v0/vue/API/designSystem/text",
									},
									{
										text: "Select and radio",
										link: "/en/v0/vue/API/designSystem/selectRadio",
									},
									{
										text: "Checkbox",
										link: "/en/v0/vue/API/designSystem/checkbox",
									},
									{
										text: "Date",
										link: "/en/v0/vue/API/designSystem/date",
									},
									{
										text: "Time",
										link: "/en/v0/vue/API/designSystem/time",
									},
									{
										text: "Range",
										link: "/en/v0/vue/API/designSystem/range",
									},
									{
										text: "File",
										link: "/en/v0/vue/API/designSystem/file",
									},
									{
										text: "Helpers",
										link: "/en/v0/vue/API/designSystem/helpers",
									},
								],
							},
						],
					},
					outline: { label: "On this page" },
					returnToTopLabel: "Return to top",
					darkModeSwitchLabel: "Dark mode",
					footer: {
						copyright: "Copyright © 2025-present DuploJS contributors",
						message: "Released under the MIT License.",
					},
				},
			},
		},
	} satisfies UserConfig<DefaultTheme.Config>,
	defineConfig,
	// wait vitepress v2 compatibility,
	withMermaid as AnyFunction,
);
