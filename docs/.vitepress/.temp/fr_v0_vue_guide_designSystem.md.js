import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"Le désigne systéme","description":"","frontmatter":{},"headers":[],"relativePath":"fr/v0/vue/guide/designSystem.md","filePath":"fr/v0/vue/guide/designSystem.md"}');
const _sfc_main = { name: "fr/v0/vue/guide/designSystem.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="le-designe-systeme" tabindex="-1">Le désigne systéme <a class="header-anchor" href="#le-designe-systeme" aria-label="Permalink to “Le désigne systéme”">​</a></h1></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("fr/v0/vue/guide/designSystem.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const designSystem = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  designSystem as default
};
