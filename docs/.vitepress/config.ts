import { defineConfig, type DefaultTheme, type UserConfig } from "vitepress";
import { transformerTwoslash } from "@shikijs/vitepress-twoslash";
import { ModuleDetectionKind, ModuleKind, ModuleResolutionKind } from "typescript";
import { groupIconMdPlugin, groupIconVitePlugin } from "vitepress-plugin-group-icons";
import { A, innerPipe, pipe, S, type AnyFunction } from "@duplojs/utils";
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
									`export * from "@form/v${namedGroups?.version ?? ""}/vueDesignSystem.css";`,

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
							types: ["@types/web"],
						},
					},
				}),
			],
			languages: ["js", "jsx", "ts", "tsx"],
		},
		vite: {
			plugins: [groupIconVitePlugin()],
		},
		locales: {
			fr: {
				label: "Français",
				lang: "fr",
				link: "/fr/",
			},
			root: {
				label: "English",
				lang: "en",
				link: "/en/",
				themeConfig: {
					nav: [],
					docFooter: {
						prev: "Previous page",
						next: "Next page",
					},
					sidebar: {},
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
