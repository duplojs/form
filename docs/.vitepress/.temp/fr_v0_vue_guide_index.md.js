import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"Introduction","description":"","frontmatter":{},"headers":[],"relativePath":"fr/v0/vue/guide/index.md","filePath":"fr/v0/vue/guide/index.md"}');
const _sfc_main = { name: "fr/v0/vue/guide/index.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="introduction" tabindex="-1">Introduction <a class="header-anchor" href="#introduction" aria-label="Permalink to “Introduction”">​</a></h1><p>La librairie <code>@duplojs/form</code> est structure-first. En imbriquant les différents layouts et inputs, vous construisez une structure de données logique, inspirée de structures possibles en TypeScript.</p><p>Pour customiser le design, il suffit de créer des templates pour chaque élément. Ces templates doivent être pensés de manière générique, ce qui permet, une fois utilisés, de ne penser qu&#39;uniquement à la structure.</p><p>Si vous rencontrez des cas spécifiques, il est toujours possible d&#39;utiliser des slots qui permettent de s&#39;insérer n&#39;importe où et également de définir des classes manuellement. Chaque champ est d&#39;ailleurs fourni avec des classes par défaut, ce qui permet de les cibler spécifiquement. Vous pouvez également rajouter des classes supplémentaires au besoin sur certains éléments précisément.</p></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("fr/v0/vue/guide/index.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  index as default
};
