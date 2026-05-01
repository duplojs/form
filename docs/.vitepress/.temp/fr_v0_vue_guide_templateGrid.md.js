import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"les templates grid","description":"","frontmatter":{},"headers":[],"relativePath":"fr/v0/vue/guide/templateGrid.md","filePath":"fr/v0/vue/guide/templateGrid.md"}');
const _sfc_main = { name: "fr/v0/vue/guide/templateGrid.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="les-templates-grid" tabindex="-1">les templates grid <a class="header-anchor" href="#les-templates-grid" aria-label="Permalink to “les templates grid”">​</a></h1></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("fr/v0/vue/guide/templateGrid.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const templateGrid = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  templateGrid as default
};
