import { c as f } from "./template-CsT6QvVe.js";
import { defineComponent as p, computed as i, openBlock as n, createElementBlock as r, createElementVNode as _, normalizeStyle as u, renderSlot as y, toDisplayString as F, createCommentVNode as x, Fragment as T, renderList as k, createBlock as d, resolveDynamicComponent as g, createTextVNode as E } from "vue";
import { b as B, _ as G, a as b, c as D } from "./UnionSelectKind.vue_vue_type_script_setup_true_lang-e7H1hkYl.js";
const h = /* @__PURE__ */ p({
  __name: "GridFormTemplate",
  props: {
    fieldKey: {},
    getCurrentValue: {},
    maxColumns: {},
    gap: {}
  },
  emits: ["submit"],
  setup(s, { emit: t }) {
    const e = s, o = t;
    function m(a) {
      a.preventDefault(), a.stopPropagation(), a.stopImmediatePropagation(), o("submit");
    }
    const l = i(() => ({
      "--max-columns": e.maxColumns,
      "--gap": e.gap !== void 0 ? `${e.gap}px` : void 0
    }));
    return (a, C) => (n(), r("form", {
      onSubmit: m,
      class: "DFV-grid-form"
    }, [
      _("div", {
        class: "DFV-grid-container",
        style: u(l.value)
      }, [
        y(a.$slots, "formField")
      ], 4),
      y(a.$slots, "submitter")
    ], 32));
  }
}), K = /* @__PURE__ */ p({
  __name: "GridInputTemplate",
  props: {
    getCurrentValue: { type: Function },
    columns: {}
  },
  setup(s) {
    const t = s, e = i(() => ({
      "--columns": t.columns
    }));
    return (o, m) => (n(), r("div", {
      class: "DFV-grid-element DFV-grid-input",
      style: u(e.value)
    }, [
      y(o.$slots, "input")
    ], 4));
  }
}), M = /* @__PURE__ */ p({
  __name: "GridMultiTemplate",
  props: {
    fieldKey: {},
    getCurrentValue: {},
    getFormFields: {},
    maxColumns: {},
    gap: {},
    columns: {}
  },
  setup(s) {
    const t = s, e = i(() => ({
      "--max-columns": t.maxColumns,
      "--gap": t.gap !== void 0 ? `${t.gap}px` : void 0,
      "--columns": t.columns
    }));
    return (o, m) => (n(), r("div", {
      class: "DFV-grid-container DFV-grid-element",
      style: u(e.value)
    }, [
      y(o.$slots, "formField")
    ], 4));
  }
}), N = ["for"], I = { key: 1 }, L = /* @__PURE__ */ p({
  __name: "GridCheckTemplate",
  props: {
    fieldKey: {},
    getCurrentValue: { type: Function },
    getErrorMessage: { type: Function },
    maxColumns: {},
    gap: {},
    columns: {},
    label: {},
    hideEmptyMessageError: { type: Boolean }
  },
  setup(s) {
    const t = s, e = i(() => ({
      "--columns": t.columns
    })), o = i(() => ({
      "--max-columns": t.maxColumns,
      "--gap": t.gap !== void 0 ? `${t.gap}px` : void 0
    }));
    return (m, l) => (n(), r("div", {
      class: "DFV-grid-element",
      style: u(e.value)
    }, [
      t.label ? (n(), r("label", {
        key: 0,
        for: t.fieldKey
      }, F(t.label), 9, N)) : x("", !0),
      _("div", {
        class: "DFV-grid-container",
        style: u(o.value)
      }, [
        y(m.$slots, "formField")
      ], 4),
      t.getErrorMessage() !== null || t.hideEmptyMessageError !== !0 ? (n(), r("small", I, F(t.getErrorMessage()), 1)) : x("", !0)
    ], 4));
  }
}), R = /* @__PURE__ */ p({
  __name: "GridRepeatTemplate",
  props: {
    fieldKey: {},
    max: {},
    min: {},
    getCurrentValue: {},
    getFormFields: {},
    maxColumns: {},
    gap: {},
    columns: {},
    repeatElementColumn: {},
    repeatElementMaxColumn: {},
    removeButton: { type: Function, default: b },
    addButton: { type: Function, default: G },
    resetButton: { type: Function, default: B }
  },
  emits: ["addElement", "removeElement", "resetElement"],
  setup(s, { emit: t }) {
    const e = s, o = t, m = i(() => ({
      "--columns": e.columns
    })), l = i(() => ({
      "--max-columns": e.maxColumns,
      "--gap": e.gap !== void 0 ? `${e.gap}px` : void 0
    })), a = i(() => ({
      "--columns": e.repeatElementColumn
    })), C = i(() => ({
      "--max-columns": e.repeatElementMaxColumn
    }));
    return (c, v) => (n(), r("div", {
      class: "DFV-grid-element",
      style: u(m.value)
    }, [
      _("div", {
        class: "DFV-grid-container",
        style: u(l.value)
      }, [
        (n(!0), r(T, null, k(s.getFormFields(), ($, S) => (n(), r("div", {
          class: "DFV-grid-element DFV-grid-repeat-element",
          key: S,
          style: u(a.value)
        }, [
          (n(), d(g(e.resetButton), {
            onClick: (V) => o("resetElement", S)
          }, null, 8, ["onClick"])),
          (n(), d(g(e.removeButton), {
            onClick: (V) => o("removeElement", S)
          }, null, 8, ["onClick"])),
          _("div", {
            class: "DFV-grid-container DFV-grid-repeat-container",
            style: u(C.value)
          }, [
            (n(), d(g($)))
          ], 4)
        ], 4))), 128))
      ], 4),
      (n(), d(g(e.addButton), {
        onClick: v[0] || (v[0] = ($) => o("addElement"))
      }))
    ], 4));
  }
}), U = /* @__PURE__ */ p({
  __name: "GridUnionTemplate",
  props: {
    fieldKey: {},
    kinds: {},
    getCurrentValue: {},
    getCurrentKind: {},
    maxColumns: {},
    gap: {},
    columns: {},
    labels: {},
    selectKind: { default: D }
  },
  emits: ["changeKind"],
  setup(s, { emit: t }) {
    const e = s, o = t, m = i(
      () => e.kinds.map(
        (c) => ({
          value: c,
          label: e.labels?.[c] ?? c
        })
      )
    ), l = i({
      get: () => e.getCurrentKind(),
      set: (c) => {
        o("changeKind", c);
      }
    }), a = i(() => ({
      "--max-columns": e.maxColumns,
      "--gap": e.gap !== void 0 ? `${e.gap}px` : void 0
    })), C = i(() => ({
      "--columns": e.columns
    }));
    return (c, v) => (n(), r("div", {
      class: "DFV-grid-element",
      style: u(C.value)
    }, [
      (n(), d(g(e.selectKind), {
        "field-key": e.fieldKey,
        options: m.value,
        modelValue: l.value,
        "onUpdate:modelValue": v[0] || (v[0] = ($) => l.value = $)
      }, null, 8, ["field-key", "options", "modelValue"])),
      _("div", {
        class: "DFV-grid-container",
        style: u(a.value)
      }, [
        y(c.$slots, "formField")
      ], 4)
    ], 4));
  }
}), P = { type: "button" }, A = /* @__PURE__ */ p({
  __name: "StepNextButton",
  setup(s) {
    return (t, e) => (n(), r("button", P, " next "));
  }
}), Q = { type: "button" }, z = /* @__PURE__ */ p({
  __name: "StepPreviousButton",
  setup(s) {
    return (t, e) => (n(), r("button", Q, " previous "));
  }
}), j = { type: "button" }, q = /* @__PURE__ */ p({
  __name: "StepResetButton",
  setup(s) {
    return (t, e) => (n(), r("button", j, " reset "));
  }
}), w = { class: "DFV-grid-element" }, H = { class: "DFV-grid-container" }, J = /* @__PURE__ */ p({
  __name: "GridStepByStepTemplate",
  props: {
    fieldKey: {},
    stepQuantity: {},
    isLastStep: {},
    getFormFields: {},
    getCurrentValue: {},
    getCurrentStep: {},
    getErrorMessageNotAtLastStep: {},
    nextButton: { default: A },
    previousButton: { default: z },
    resetButton: { default: q }
  },
  emits: ["nextStep", "previousStep", "resetStep"],
  setup(s, { emit: t }) {
    const e = s, o = t;
    return (m, l) => (n(), r("div", w, [
      _("label", null, F(e.getCurrentStep() + 1) + "/" + F(e.stepQuantity), 1),
      _("div", H, [
        y(m.$slots, "formField")
      ]),
      E(" " + F(e.getErrorMessageNotAtLastStep()) + " ", 1),
      (n(), d(g(e.previousButton), {
        onClick: l[0] || (l[0] = (a) => o("previousStep"))
      })),
      (n(), d(g(e.resetButton), {
        onClick: l[1] || (l[1] = (a) => o("resetStep"))
      })),
      (n(), d(g(e.nextButton), {
        onClick: l[2] || (l[2] = (a) => o("nextStep"))
      }))
    ]));
  }
}), O = f(
  "form",
  h
), W = f(
  "input",
  K
), X = f(
  "multi",
  M
), Y = f(
  "check",
  L
), Z = f(
  "repeat",
  R
), ee = f(
  "union",
  U
), te = f(
  "step",
  J
), le = {
  check: Y(),
  form: O(),
  input: W(),
  multi: X(),
  repeat: Z(),
  step: te(),
  union: ee()
};
export {
  L as GridCheckTemplate,
  h as GridFormTemplate,
  K as GridInputTemplate,
  M as GridMultiTemplate,
  R as GridRepeatTemplate,
  J as GridStepByStepTemplate,
  U as GridUnionTemplate,
  le as defaultGridTemplates,
  Y as useGridCheckTemplate,
  O as useGridFormTemplate,
  W as useGridInputTemplate,
  X as useGridMultiTemplate,
  Z as useGridRepeatTemplate,
  te as useGridStepByStepTemplate,
  ee as useGridUnionTemplate
};
