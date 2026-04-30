import { c } from "../../chunks/template-Dz0VDr0a.js";
import { defineComponent as v, computed as i, openBlock as l, createElementBlock as m, createElementVNode as d, normalizeStyle as p, renderSlot as y, toDisplayString as D, createCommentVNode as _, Fragment as x, renderList as E, createBlock as g, resolveDynamicComponent as F } from "vue";
const $ = /* @__PURE__ */ v({
  __name: "GridFormTemplate",
  props: {
    fieldKey: {},
    getCurrentValue: {},
    maxColumns: {},
    gap: {}
  },
  emits: ["submit"],
  setup(s, { emit: t }) {
    const e = s, n = t;
    function r(a) {
      a.preventDefault(), a.stopPropagation(), a.stopImmediatePropagation(), n("submit");
    }
    const o = i(() => ({
      "--DFV-grid-max-columns": e.maxColumns,
      "--DFV-grid-gap": e.gap !== void 0 ? `${e.gap}px` : void 0
    }));
    return (a, V) => (l(), m("form", {
      onSubmit: r,
      class: "DFV-grid-form"
    }, [
      d("div", {
        class: "DFV-grid-container",
        style: p(o.value)
      }, [
        y(a.$slots, "formField")
      ], 4),
      y(a.$slots, "submitter")
    ], 32));
  }
}), k = ["for"], T = {
  key: 1,
  class: "DFV-grid-error"
}, h = /* @__PURE__ */ v({
  __name: "GridInputTemplate",
  props: {
    getLabel: { type: Function },
    getCurrentValue: { type: Function },
    getErrorMessage: { type: Function },
    fieldKey: {},
    columns: {},
    hideEmptyMessageError: { type: Boolean }
  },
  setup(s) {
    const t = s, e = i(() => ({
      "--DFV-grid-columns": t.columns
    }));
    return (n, r) => (l(), m("div", {
      class: "DFV-grid-element DFV-grid-input",
      style: p(e.value)
    }, [
      t.getLabel ? (l(), m("label", {
        key: 0,
        for: t.fieldKey
      }, D(t.getLabel()), 9, k)) : _("", !0),
      y(n.$slots, "input"),
      t.getErrorMessage && (t.getErrorMessage() !== null || t.hideEmptyMessageError !== !0) ? (l(), m("small", T, D(t.getErrorMessage()), 1)) : _("", !0)
    ], 4));
  }
}), B = /* @__PURE__ */ v({
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
      "--DFV-grid-max-columns": t.maxColumns,
      "--DFV-grid-gap": t.gap !== void 0 ? `${t.gap}px` : void 0,
      "--DFV-grid-columns": t.columns
    }));
    return (n, r) => (l(), m("div", {
      class: "DFV-grid-container DFV-grid-element",
      style: p(e.value)
    }, [
      y(n.$slots, "formField")
    ], 4));
  }
}), L = {
  key: 0,
  class: "DFV-grid-error"
}, M = /* @__PURE__ */ v({
  __name: "GridCheckTemplate",
  props: {
    fieldKey: {},
    getCurrentValue: { type: Function },
    getErrorMessage: { type: Function },
    maxColumns: {},
    gap: {},
    columns: {},
    hideEmptyMessageError: { type: Boolean }
  },
  setup(s) {
    const t = s, e = i(() => ({
      "--DFV-grid-columns": t.columns,
      "--DFV-grid-gap": t.gap !== void 0 ? `${t.gap}px` : void 0
    })), n = i(() => ({
      "--DFV-grid-max-columns": t.maxColumns,
      "--DFV-grid-gap": t.gap !== void 0 ? `${t.gap}px` : void 0
    }));
    return (r, o) => (l(), m("div", {
      class: "DFV-grid-element",
      style: p(e.value)
    }, [
      d("div", {
        class: "DFV-grid-container",
        style: p(n.value)
      }, [
        y(r.$slots, "formField")
      ], 4),
      t.getErrorMessage() !== null || t.hideEmptyMessageError !== !0 ? (l(), m("small", L, D(t.getErrorMessage()), 1)) : _("", !0)
    ], 4));
  }
}), G = { class: "DFV-grid-repeat-actions" }, K = { class: "DFV-grid-repeat-add" }, I = /* @__PURE__ */ v({
  __name: "GridRepeatTemplate",
  props: {
    fieldKey: {},
    max: {},
    min: {},
    getFormFieldsQuantity: {},
    getCurrentValue: {},
    getFormFields: {},
    maxColumns: {},
    gap: {},
    columns: {},
    repeatElementColumn: {},
    repeatElementMaxColumn: {},
    removeButton: {},
    removeLabel: { default: "Remove" },
    addButton: {},
    addLabel: { default: "Add" },
    resetButton: {},
    resetLabel: { default: "Reset" }
  },
  emits: ["addElement", "removeElement", "resetElement"],
  setup(s, { emit: t }) {
    const e = s, n = t, r = i(() => ({
      "--DFV-grid-columns": e.columns
    })), o = i(() => ({
      "--DFV-grid-max-columns": e.maxColumns,
      "--DFV-grid-gap": e.gap !== void 0 ? `${e.gap}px` : void 0
    })), a = i(() => ({
      "--DFV-grid-columns": e.repeatElementColumn
    })), V = i(() => ({
      "--DFV-grid-max-columns": e.repeatElementMaxColumn
    }));
    return (u, f) => (l(), m("div", {
      class: "DFV-grid-element",
      style: p(r.value)
    }, [
      d("div", {
        class: "DFV-grid-container",
        style: p(o.value)
      }, [
        (l(!0), m(x, null, E(s.getFormFields(), (b, C) => (l(), m("div", {
          class: "DFV-grid-element DFV-grid-repeat-element",
          key: C,
          style: p(a.value)
        }, [
          d("div", G, [
            (l(), g(F(e.resetButton), {
              label: e.resetLabel,
              onClick: (S) => n("resetElement", C)
            }, null, 8, ["label", "onClick"])),
            (l(), g(F(e.removeButton), {
              label: e.removeLabel,
              disabled: e.min === e.getFormFieldsQuantity(),
              onClick: (S) => n("removeElement", C)
            }, null, 8, ["label", "disabled", "onClick"]))
          ]),
          d("div", {
            class: "DFV-grid-container DFV-grid-repeat-container",
            style: p(V.value)
          }, [
            (l(), g(F(b)))
          ], 4)
        ], 4))), 128))
      ], 4),
      d("div", K, [
        (l(), g(F(e.addButton), {
          label: e.addLabel,
          disabled: e.max === e.getFormFieldsQuantity(),
          onClick: f[0] || (f[0] = (b) => n("addElement"))
        }, null, 8, ["label", "disabled"]))
      ])
    ], 4));
  }
}), N = { class: "DFV-grid-union-select" }, R = /* @__PURE__ */ v({
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
    selectInputKind: {}
  },
  emits: ["changeKind"],
  setup(s, { emit: t }) {
    const e = s, n = t, r = i(
      () => e.kinds.map(
        (u) => ({
          value: u,
          label: e.labels?.[u] ?? u
        })
      )
    ), o = i({
      get: () => e.getCurrentKind(),
      set: (u) => {
        n("changeKind", u);
      }
    }), a = i(() => ({
      "--DFV-grid-max-columns": e.maxColumns,
      "--DFV-grid-gap": e.gap !== void 0 ? `${e.gap}px` : void 0
    })), V = i(() => ({
      "--DFV-grid-columns": e.columns
    }));
    return (u, f) => (l(), m("div", {
      class: "DFV-grid-element",
      style: p(V.value)
    }, [
      d("div", N, [
        (l(), g(F(e.selectInputKind), {
          "field-key": e.fieldKey,
          options: r.value,
          modelValue: o.value,
          "onUpdate:modelValue": f[0] || (f[0] = (b) => o.value = b)
        }, null, 8, ["field-key", "options", "modelValue"]))
      ]),
      d("div", {
        class: "DFV-grid-container",
        style: p(a.value)
      }, [
        y(u.$slots, "formField")
      ], 4)
    ], 4));
  }
}), A = { class: "DFV-grid-element DFV-step-root" }, Q = { class: "DFV-step-content" }, U = {
  key: 0,
  class: "DFV-step-error"
}, P = { class: "DFV-step-actions" }, z = /* @__PURE__ */ v({
  __name: "GridStepByStepTemplate",
  props: {
    fieldKey: {},
    stepQuantity: {},
    isLastStep: {},
    getFormFields: {},
    getCurrentValue: {},
    getCurrentStep: {},
    getErrorMessageNotAtLastStep: {},
    nextButton: {},
    nextLabel: { default: "Next" },
    previousButton: {},
    previousLabel: { default: "Previous" },
    resetButton: {},
    resetLabel: {},
    hideEmptyMessageError: { type: Boolean }
  },
  emits: ["nextStep", "previousStep", "resetStep"],
  setup(s, { emit: t }) {
    const e = s, n = t;
    return (r, o) => (l(), m("div", A, [
      d("div", Q, [
        y(r.$slots, "formField")
      ]),
      e.getErrorMessageNotAtLastStep() || e.hideEmptyMessageError !== !0 ? (l(), m("small", U, D(e.getErrorMessageNotAtLastStep()), 1)) : _("", !0),
      d("div", P, [
        (l(), g(F(e.previousButton), {
          label: e.previousLabel,
          disabled: e.getCurrentStep() === 0,
          onClick: o[0] || (o[0] = (a) => n("previousStep"))
        }, null, 8, ["label", "disabled"])),
        (l(), g(F(e.resetButton), {
          label: e.resetLabel,
          onClick: o[1] || (o[1] = (a) => n("resetStep"))
        }, null, 8, ["label"])),
        (l(), g(F(e.nextButton), {
          label: e.nextLabel,
          disabled: e.isLastStep(),
          onClick: o[2] || (o[2] = (a) => n("nextStep"))
        }, null, 8, ["label", "disabled"]))
      ])
    ]));
  }
}), j = ["for"], q = /* @__PURE__ */ v({
  __name: "GridSectionTemplate",
  props: {
    fieldKey: {},
    getCurrentValue: { type: Function },
    title: {},
    maxColumns: {},
    gap: {},
    columns: {}
  },
  setup(s) {
    const t = s, e = i(() => ({
      "--DFV-grid-columns": t.columns
    })), n = i(() => ({
      "--DFV-grid-max-columns": t.maxColumns,
      "--DFV-grid-gap": t.gap !== void 0 ? `${t.gap}px` : void 0
    }));
    return (r, o) => (l(), m("div", {
      class: "DFV-grid-element",
      style: p(e.value)
    }, [
      t.title ? (l(), m("label", {
        key: 0,
        for: t.fieldKey
      }, D(t.title), 9, j)) : _("", !0),
      d("div", {
        class: "DFV-grid-container",
        style: p(n.value)
      }, [
        y(r.$slots, "formField")
      ], 4)
    ], 4));
  }
});
function J(s) {
  const t = c(
    "form",
    $,
    { props: s.form }
  ), e = c(
    "input",
    h,
    { props: s.input }
  ), n = c(
    "multi",
    B,
    { props: s.multi }
  ), r = c(
    "check",
    M,
    { props: s.check }
  ), o = c(
    "repeat",
    I,
    { props: s.repeat }
  ), a = c(
    "union",
    R,
    { props: s.union }
  ), V = c(
    "step",
    z,
    { props: s.step }
  ), u = c(
    "section",
    q,
    { props: s.section }
  );
  return {
    useFormTemplate: t,
    useInputTemplate: e,
    useMultiTemplate: n,
    useCheckTemplate: r,
    useRepeatTemplate: o,
    useUnionTemplate: a,
    useStepByStepTemplate: V,
    useSectionTemplate: u,
    useTemplates: () => ({
      check: r(),
      form: t(),
      input: e(),
      multi: n(),
      repeat: o(),
      section: u(),
      step: V(),
      union: a()
    })
  };
}
export {
  M as GridCheckTemplate,
  $ as GridFormTemplate,
  h as GridInputTemplate,
  B as GridMultiTemplate,
  I as GridRepeatTemplate,
  q as GridSectionTemplate,
  z as GridStepByStepTemplate,
  R as GridUnionTemplate,
  J as createGridTemplates
};
