import { defineComponent as _, openBlock as e, createElementBlock as t, useModel as i, withDirectives as a, Fragment as p, renderList as d, toDisplayString as l, vModelSelect as m, mergeModels as f } from "vue";
const $ = { type: "button" }, R = /* @__PURE__ */ _({
  __name: "RepeatAddButton",
  setup(o) {
    return (n, s) => (e(), t("button", $, " + "));
  }
}), h = { type: "button" }, V = /* @__PURE__ */ _({
  __name: "RepeatRemoveButton",
  setup(o) {
    return (n, s) => (e(), t("button", h, " x "));
  }
}), y = { type: "button" }, M = /* @__PURE__ */ _({
  __name: "RepeatResetButton",
  setup(o) {
    return (n, s) => (e(), t("button", y, " reset "));
  }
}), b = ["id"], x = ["value"], g = /* @__PURE__ */ _({
  __name: "UnionSelectKind",
  props: /* @__PURE__ */ f({
    fieldKey: {},
    options: {}
  }, {
    modelValue: { required: !0 },
    modelModifiers: {}
  }),
  emits: ["update:modelValue"],
  setup(o) {
    const n = o, s = i(o, "modelValue");
    return (v, u) => a((e(), t("select", {
      "onUpdate:modelValue": u[0] || (u[0] = (r) => s.value = r),
      id: `select-union-${n.fieldKey}`
    }, [
      (e(!0), t(p, null, d(n.options, ({ value: r, label: c }) => (e(), t("option", {
        value: r,
        key: `${r}-${c}`
      }, l(c), 9, x))), 128))
    ], 8, b)), [
      [m, s.value]
    ]);
  }
});
export {
  R as _,
  V as a,
  M as b,
  g as c
};
