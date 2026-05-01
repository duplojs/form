import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"API des layouts","description":"","frontmatter":{},"headers":[],"relativePath":"fr/v0/vue/API/layout/index.md","filePath":"fr/v0/vue/API/layout/index.md"}');
const _sfc_main = { name: "fr/v0/vue/API/layout/index.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="api-des-layouts" tabindex="-1">API des layouts <a class="header-anchor" href="#api-des-layouts" aria-label="Permalink to “API des layouts”">​</a></h1><p>Cette section documente les layouts fournis par <code>@duplojs/form/vue</code> comme des briques d&#39;API.</p><p>Ici, l&#39;objectif n&#39;est plus d&#39;expliquer la philosophie générale, mais de détailler :</p><ul><li>la signature de chaque layout ;</li><li>les paramètres attendus ;</li><li>la forme de valeur produite ;</li><li>le contrat de template associé ;</li><li>les cas d&#39;usage typiques.</li></ul><h2 id="ce-qu-est-un-layout-dans-l-api" tabindex="-1">Ce qu&#39;est un layout dans l&#39;API <a class="header-anchor" href="#ce-qu-est-un-layout-dans-l-api" aria-label="Permalink to “Ce qu&#39;est un layout dans l&#39;API”">​</a></h2><p>Dans cette librairie, un layout retourne lui aussi un <code>FormField</code>.</p><p>Cela signifie que :</p><ul><li>un layout peut être imbriqué dans un autre layout ;</li><li>un layout peut devenir la racine directe d&#39;un formulaire ;</li><li>un layout participe à la fois au rendu, à la validation et au calcul de la valeur finale.</li></ul><h2 id="pages-de-cette-section" tabindex="-1">Pages de cette section <a class="header-anchor" href="#pages-de-cette-section" aria-label="Permalink to “Pages de cette section”">​</a></h2><ul><li><a href="/fr/v0/vue/API/layout/form">Formulaire</a></li><li><a href="/fr/v0/vue/API/layout/input">Input</a></li><li><a href="/fr/v0/vue/API/layout/multi">useMultiLayout</a></li><li><a href="/fr/v0/vue/API/layout/repeat">useRepeatLayout</a></li><li><a href="/fr/v0/vue/API/layout/union">useUnionLayout</a></li><li><a href="/fr/v0/vue/API/layout/step">useStepLayout</a></li><li><a href="/fr/v0/vue/API/layout/section">useSectionLayout</a></li><li><a href="/fr/v0/vue/API/layout/slot">useSlotLayout</a></li><li><a href="/fr/v0/vue/API/layout/check">useCheckLayout</a></li><li><a href="/fr/v0/vue/API/layout/disabled">useDisabledLayout</a></li></ul><h2 id="rappel-utile" tabindex="-1">Rappel utile <a class="header-anchor" href="#rappel-utile" aria-label="Permalink to “Rappel utile”">​</a></h2><p>Un layout n&#39;impose pas de design.</p><p>Le design passe toujours par le template associé au type concerné :</p><ul><li><code>form</code></li><li><code>input</code></li><li><code>multi</code></li><li><code>repeat</code></li><li><code>union</code></li><li><code>step</code></li><li><code>section</code></li><li><code>check</code></li></ul><p>Les pages suivantes détaillent également, pour chaque layout, les props, slots et events attendus par son template dédié.</p></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("fr/v0/vue/API/layout/index.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  index as default
};
