import { ref, effectScope, watch, h as h$1, normalizeClass, computed, defineComponent, openBlock, createElementBlock, createElementVNode, normalizeStyle, renderSlot, toDisplayString, createCommentVNode, Fragment, renderList, createBlock, resolveDynamicComponent, defineAsyncComponent, mergeProps, unref, useModel, withDirectives, vModelText, mergeModels, vModelSelect, createVNode } from "vue";
import { createKindNamespace, unwrap, simpleClone } from "@duplojs/utils";
const r = createKindNamespace(
  // @ts-expect-error reserved kind namespace
  "DuplojsVueForm"
);
const U$2 = r("form-field");
function W(e, n) {
  return U$2.setTo(
    {
      new: e,
      defaultValue: n
    },
    {}
  );
}
const q$1 = "@duplojs/utils/kind/";
function j$1(e) {
  const n = `${q$1}${e}`;
  return {
    definition: {
      name: e,
      value: null
    },
    runTimeKey: n,
    addTo(t, o = null) {
      return {
        ...t,
        [n]: o
      };
    },
    setTo(t, o = null) {
      return t[n] = o, t;
    },
    has(t) {
      return t && (typeof t == "object" || typeof t == "function") && n in t;
    },
    getValue(t) {
      return t[n];
    }
  };
}
function A$1(e) {
  return (n) => j$1(`@${e}/${n}`);
}
function ne$1(e, n, t) {
  const o = j$1(e), u = n instanceof Array ? n : [n], c = t ?? class {
  }, i2 = class extends c {
    constructor(r2 = {}, l = []) {
      super(...l);
      for (const f of u)
        this[f.runTimeKey] = r2[f.definition.name] ?? null;
    }
    static [Symbol.hasInstance](r2) {
      if (!o.has(r2))
        return false;
      for (const l of u)
        if (!l.has(r2))
          return false;
      return true;
    }
  };
  return u.forEach((r2) => {
    i2.prototype[r2.runTimeKey] = null;
  }), i2.prototype[o.runTimeKey] = null, i2;
}
const a = A$1(
  // @ts-expect-error reserved kind namespace
  "DuplojsUtilsEither"
), K$1 = a("information"), m = "@duplojs/utils/value";
function $$1(e) {
  return {
    [m]: e
  };
}
function _(e) {
  return !!e && typeof e == "object" && m in e;
}
const w = a("left");
function z$1(e, n = void 0) {
  return w.setTo(K$1.setTo($$1(n), e));
}
function N$1(e) {
  return w.has(e) && K$1.has(e) && _(e);
}
const B$2 = a("right");
function G$1(e, n = void 0) {
  return B$2.setTo(K$1.setTo($$1(n), e));
}
const J$1 = a("error");
function O(e) {
  return J$1.setTo(z$1("error", e));
}
const Q$1 = a("success");
function X(e) {
  return Q$1.setTo(G$1("success", e));
}
function re$2(e, n) {
  return (t = {}) => {
    const o = t.defaultValue !== void 0 ? typeof t.defaultValue == "function" ? t.defaultValue() : t.defaultValue : typeof n.defaultValue == "function" ? n.defaultValue() : n.defaultValue, u = typeof t.props == "function" ? t.props : () => t.props, c = t.label, i2 = typeof c == "string" ? () => c : c;
    return W(
      (r2, l, f) => {
        const d2 = `${l}_INP`, x = t?.template ?? n.template ?? f.input;
        let V = false;
        const p = ref(null), v = effectScope(), { errorMessage: g } = v.run(() => {
          const s = ref(null);
          return watch(
            r2,
            () => {
              s.value !== null && T2();
            },
            { flush: "post" }
          ), {
            errorMessage: s
          };
        }), T2 = () => {
          const s = p.value?.check?.() || X(r2.value);
          if (t.dataParser === void 0 || N$1(s))
            return s;
          const C2 = unwrap(s), h2 = t.dataParser.parse(C2);
          if (N$1(h2)) {
            const k2 = unwrap(h2);
            return g.value = k2.issues[0]?.message ?? "Error", O(
              [
                {
                  key: d2,
                  dataParserError: k2
                }
              ]
            );
          }
          return g.value = null, h2;
        }, F = () => {
          p.value?.reset?.(), g.value = null;
        }, I2 = () => {
          v.stop(), V = true, p.value?.dispose?.();
        }, L2 = () => r2.value, M2 = h$1(
          () => h$1(
            e,
            {
              ...n.props,
              ...u(),
              modelValue: r2.value,
              "onUpdate:modelValue": (s) => {
                V || (r2.value = s);
              },
              id: d2,
              key: d2,
              ref: p
            }
          )
        ), P2 = () => M2, H = t.dataParser && (() => g.value);
        return {
          check: T2,
          reset: F,
          dispose: I2,
          getVNode: () => h$1(
            () => x.getVNode(
              {
                getLabel: i2,
                fieldKey: d2,
                getCurrentValue: L2,
                getErrorMessage: H,
                class: t.class
              },
              {
                input: P2
              }
            )
          )
        };
      },
      o
    );
  };
}
const i = r("template");
function d(a2, o, t) {
  return (s) => i.setTo(
    {
      getVNode: (e, c) => h$1(
        o,
        {
          ...t?.props,
          ...s,
          ...e,
          class: normalizeClass([
            t?.props?.class,
            s?.class,
            e.class,
            `DFV-template_${a2} DFV-deep_${e.fieldKey}`
          ])
        },
        c
      )
    }
  );
}
function Y(r2) {
  return (s, e = {}) => {
    const t = e.template ?? r2.form, d2 = ref(simpleClone(s.defaultValue)), i2 = ref(null), l = s.new(
      d2,
      "FRM",
      r2,
      (m2, S) => i2.value?.[m2]?.(S) ?? null
    ), c = () => l.check(), v = () => {
      l.reset(), d2.value = simpleClone(s.defaultValue);
    }, o = () => {
      l.dispose();
    }, a2 = () => d2.value, g = l.getVNode();
    return {
      currentValue: d2,
      component: (m2, { slots: S }) => (i2.value = S, h$1(
        () => t.getVNode(
          {
            ...m2,
            class: normalizeClass([m2.class, e.class]),
            fieldKey: "FRM",
            onSubmit: () => {
            },
            getCurrentValue: a2
          },
          {
            submitter: S.default ?? (() => null),
            formField: () => g
          }
        )
      )),
      reset: v,
      dispose: o,
      check: c
    };
  };
}
function U$1(...r2) {
  if (r2.length === 1) {
    const [u] = r2;
    return (t) => U$1(t, u);
  }
  const [s, e] = r2;
  return s.length >= e;
}
function Z(r2, s) {
  const e = r2 instanceof Array ? r2 : Object.entries(r2);
  return W(
    (u, t, d2, i2) => {
      const l = `${t}_MUL`, c = d2.multi, v = effectScope(), { formFieldInstanceEntries: o } = v.run(() => ({
        formFieldInstanceEntries: e.map(
          ([p, y]) => [
            p,
            y.new(
              computed({
                get: () => u.value[p],
                set: (E) => {
                  u.value[p] = E;
                }
              }),
              `${l}-${p}`,
              d2,
              i2
            )
          ]
        )
      })), a2 = () => {
        const F = {}, p = [];
        for (let y = 0; y < o.length; y++) {
          const [E, L2] = o[y], $2 = L2.check();
          N$1($2) ? p.push(...unwrap($2)) : F[E] = unwrap($2);
        }
        return U$1(p, 1) ? O(p) : X(F);
      }, g = () => {
        o.forEach(
          ([, F]) => {
            F.reset();
          }
        );
      }, h2 = () => {
        v.stop(), o.forEach(
          ([, F]) => {
            F.dispose();
          }
        );
      }, m2 = () => u.value, S = o.map(
        (F) => F[1].getVNode()
      ), V = () => S;
      return {
        check: a2,
        reset: g,
        dispose: h2,
        getVNode: () => h$1(
          () => c.getVNode(
            {
              fieldKey: l,
              getFormFields: V,
              getCurrentValue: m2,
              class: s?.class
            },
            {
              formField: V
            }
          )
        )
      };
    },
    e.reduce(
      (u, t) => (u[t[0]] = t[1].defaultValue, u),
      {}
    )
  );
}
function te(r2, s) {
  const e = s.min ?? 0, u = s.max;
  return W(
    (t, d2, i2, l) => {
      const c = `${d2}_REP`, v = s?.template ?? i2.repeat, o = {}, a2 = (n) => (o[n] === void 0 && (o[n] = r2.new(
        computed({
          get: () => n in t.value ? t.value[n] : r2.defaultValue,
          set: (k2) => {
            n >= t.value.length || (t.value[n] = k2);
          }
        }),
        `${c}-${n}`,
        i2,
        l
      )), o[n]), g = effectScope(), {
        formFieldInstances: h2
      } = g.run(() => {
        const n = ref([]);
        return watch(
          () => t.value.length,
          (k2) => {
            n.value = Array.from({ length: k2 }).map(
              (f, I2) => a2(I2)
            );
          },
          { immediate: true }
        ), {
          formFieldInstances: n
        };
      }), m2 = () => {
        const n = [], k2 = [];
        for (let f = 0; f < h2.value.length; f++) {
          const C2 = h2.value[f].check();
          N$1(C2) ? k2.push(...unwrap(C2)) : n.push(unwrap(C2));
        }
        return U$1(k2, 1) ? O(k2) : X(n);
      }, S = () => {
        Object.entries(o).forEach(
          ([, n]) => {
            n.reset();
          }
        );
      }, V = () => {
        g.stop(), Object.entries(o).forEach(
          ([, n]) => {
            n.dispose();
          }
        );
      }, M2 = () => t.value, F = {}, p = () => h2.value.map(
        (n, k2) => (F[k2] === void 0 && (F[k2] = n.getVNode()), F[k2])
      ), y = () => h2.value.length, E = () => {
        t.value.length >= u || t.value.push(
          simpleClone(r2.defaultValue)
        );
      }, L2 = (n) => {
        t.value.length <= e || t.value.splice(n, 1);
      }, $2 = (n) => {
        n in t.value && (h2.value[n]?.reset(), t.value[n] = simpleClone(r2.defaultValue));
      };
      return {
        check: m2,
        reset: S,
        dispose: V,
        getVNode: () => h$1(
          () => v.getVNode(
            {
              fieldKey: c,
              getFormFields: p,
              getFormFieldsQuantity: y,
              getCurrentValue: M2,
              max: u,
              min: e,
              onAddElement: E,
              onRemoveElement: L2,
              onResetElement: $2,
              class: s.class
            },
            {
              formField: p
            }
          )
        )
      };
    },
    Array.from({ length: e }).fill(r2.defaultValue)
  );
}
function ne(r2, s) {
  const e = Object.fromEntries(r2), u = Object.keys(e);
  return W(
    (t, d2, i2, l) => {
      const c = `${d2}_UNI`, v = s?.template ?? i2.union;
      let o = {};
      const a2 = {}, g = effectScope(), {
        formFieldInstances: h2
      } = g.run(() => (watch(
        t,
        () => {
          t.value.updateKind = (n, ...k2) => {
            o[t.value.kind] = t.value.value;
            const f = k2.length === 1 ? k2[0] : n in o ? o[n] : simpleClone(
              e[n].defaultValue
            );
            t.value.kind = n, t.value.value = f;
          }, o = {};
        },
        {
          immediate: true
        }
      ), {
        formFieldInstances: Object.fromEntries(
          r2.map(
            ([n, k2]) => [
              n,
              () => (a2[n] === void 0 && (a2[n] = k2.new(
                computed({
                  get: () => n === t.value.kind ? t.value.value : e[n].defaultValue,
                  set: (f) => {
                    n === t.value.kind && (t.value.value = f);
                  }
                }),
                `${c}-${n}`,
                i2,
                l
              )), a2[n])
            ]
          )
        )
      })), m2 = () => {
        const N2 = h2[t.value.kind]().check();
        return N$1(N2) ? N2 : X({
          kind: t.value.kind,
          value: unwrap(N2)
        });
      }, S = () => {
        o = {}, Object.entries(a2).forEach(
          ([, N2]) => {
            N2.reset();
          }
        );
      }, V = () => {
        g.stop(), Object.entries(a2).forEach(
          ([, N2]) => {
            N2.dispose();
          }
        );
      }, M2 = () => t.value, F = {}, p = Object.fromEntries(
        Object.entries(h2).map(
          ([N2, n]) => [
            N2,
            () => (F[N2] === void 0 && (F[N2] = n().getVNode()), F[N2])
          ]
        )
      ), y = () => p[t.value.kind](), E = () => t.value.kind, L2 = (N2) => {
        e[N2] !== void 0 && t.value.updateKind(N2);
      };
      return {
        check: m2,
        reset: S,
        dispose: V,
        getVNode: () => h$1(
          () => v.getVNode(
            {
              fieldKey: c,
              kinds: u,
              getCurrentValue: M2,
              getCurrentKind: E,
              onChangeKind: L2,
              class: s.class
            },
            {
              formField: y
            }
          )
        )
      };
    },
    {
      kind: s.defaultKind,
      value: e[s.defaultKind].defaultValue,
      updateKind: () => {
      }
    }
  );
}
function re$1(r2, s) {
  return W(
    (e, u, t, d2) => {
      const i2 = `${u}_SEC`, l = s?.template ?? t.section, c = r2.new(
        e,
        i2,
        t,
        d2
      ), v = () => c.check(), o = () => {
        c.reset();
      }, a2 = () => {
        c.dispose();
      }, g = c.getVNode(), h2 = () => g, m2 = () => e.value;
      return {
        check: v,
        reset: o,
        dispose: a2,
        getVNode: () => h$1(
          () => l.getVNode(
            {
              fieldKey: i2,
              getCurrentValue: m2,
              title: s?.title,
              class: s?.class
            },
            {
              formField: h2
            }
          )
        )
      };
    },
    r2.defaultValue
  );
}
function oe(r2, s) {
  if (U$2.has(s)) {
    const e = s;
    return W(
      (u, t, d2, i2) => {
        const l = `${t}_SLT`, c = e.new(
          u,
          l,
          d2,
          i2
        ), v = () => c.check(), o = () => {
          c.reset();
        }, a2 = () => {
          c.dispose();
        }, g = c.getVNode(), h2 = () => g, m2 = (V) => {
          u.value = V;
        };
        return {
          check: v,
          reset: o,
          dispose: a2,
          getVNode: () => h$1(
            () => i2(
              r2,
              {
                fieldKey: l,
                get value() {
                  return u.value;
                },
                update: m2,
                formField: h2
              }
            )
          )
        };
      },
      e.defaultValue
    );
  }
  return W(
    (e, u, t, d2) => {
      const i2 = `${u}_SLT`, l = () => X(e.value), c = () => {
      }, v = () => {
      }, o = (g) => {
        e.value = g;
      };
      return {
        check: l,
        reset: c,
        dispose: v,
        getVNode: () => h$1(
          () => d2(
            r2,
            {
              fieldKey: i2,
              get value() {
                return e.value;
              },
              update: o
            }
          )
        )
      };
    },
    typeof s.defaultValue == "function" ? s.defaultValue() : s.defaultValue
  );
}
const $ = /* @__PURE__ */ defineComponent({
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
    function r2(a2) {
      a2.preventDefault(), a2.stopPropagation(), a2.stopImmediatePropagation(), n("submit");
    }
    const o = computed(() => ({
      "--DFV-grid-max-columns": e.maxColumns,
      "--DFV-grid-gap": e.gap !== void 0 ? `${e.gap}px` : void 0
    }));
    return (a2, V) => (openBlock(), createElementBlock("form", {
      onSubmit: r2,
      class: "DFV-grid-form"
    }, [
      createElementVNode("div", {
        class: "DFV-grid-container",
        style: normalizeStyle(o.value)
      }, [
        renderSlot(a2.$slots, "formField")
      ], 4),
      renderSlot(a2.$slots, "submitter")
    ], 32));
  }
}), k = ["for"], T = {
  key: 1,
  class: "DFV-grid-error"
}, h = /* @__PURE__ */ defineComponent({
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
    const t = s, e = computed(() => ({
      "--DFV-grid-columns": t.columns
    }));
    return (n, r2) => (openBlock(), createElementBlock("div", {
      class: "DFV-grid-element DFV-grid-input",
      style: normalizeStyle(e.value)
    }, [
      t.getLabel ? (openBlock(), createElementBlock("label", {
        key: 0,
        for: t.fieldKey
      }, toDisplayString(t.getLabel()), 9, k)) : createCommentVNode("", true),
      renderSlot(n.$slots, "input"),
      t.getErrorMessage && (t.getErrorMessage() !== null || t.hideEmptyMessageError !== true) ? (openBlock(), createElementBlock("small", T, toDisplayString(t.getErrorMessage()), 1)) : createCommentVNode("", true)
    ], 4));
  }
}), B$1 = /* @__PURE__ */ defineComponent({
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
    const t = s, e = computed(() => ({
      "--DFV-grid-max-columns": t.maxColumns,
      "--DFV-grid-gap": t.gap !== void 0 ? `${t.gap}px` : void 0,
      "--DFV-grid-columns": t.columns
    }));
    return (n, r2) => (openBlock(), createElementBlock("div", {
      class: "DFV-grid-container DFV-grid-element",
      style: normalizeStyle(e.value)
    }, [
      renderSlot(n.$slots, "formField")
    ], 4));
  }
}), L = {
  key: 0,
  class: "DFV-grid-error"
}, M = /* @__PURE__ */ defineComponent({
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
    const t = s, e = computed(() => ({
      "--DFV-grid-columns": t.columns,
      "--DFV-grid-gap": t.gap !== void 0 ? `${t.gap}px` : void 0
    })), n = computed(() => ({
      "--DFV-grid-max-columns": t.maxColumns,
      "--DFV-grid-gap": t.gap !== void 0 ? `${t.gap}px` : void 0
    }));
    return (r2, o) => (openBlock(), createElementBlock("div", {
      class: "DFV-grid-element",
      style: normalizeStyle(e.value)
    }, [
      createElementVNode("div", {
        class: "DFV-grid-container",
        style: normalizeStyle(n.value)
      }, [
        renderSlot(r2.$slots, "formField")
      ], 4),
      t.getErrorMessage() !== null || t.hideEmptyMessageError !== true ? (openBlock(), createElementBlock("small", L, toDisplayString(t.getErrorMessage()), 1)) : createCommentVNode("", true)
    ], 4));
  }
}), G = { class: "DFV-grid-repeat-actions" }, K = { class: "DFV-grid-repeat-add" }, I = /* @__PURE__ */ defineComponent({
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
    const e = s, n = t, r2 = computed(() => ({
      "--DFV-grid-columns": e.columns
    })), o = computed(() => ({
      "--DFV-grid-max-columns": e.maxColumns,
      "--DFV-grid-gap": e.gap !== void 0 ? `${e.gap}px` : void 0
    })), a2 = computed(() => ({
      "--DFV-grid-columns": e.repeatElementColumn
    })), V = computed(() => ({
      "--DFV-grid-max-columns": e.repeatElementMaxColumn
    }));
    return (u, f) => (openBlock(), createElementBlock("div", {
      class: "DFV-grid-element",
      style: normalizeStyle(r2.value)
    }, [
      createElementVNode("div", {
        class: "DFV-grid-container",
        style: normalizeStyle(o.value)
      }, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(s.getFormFields(), (b2, C2) => (openBlock(), createElementBlock("div", {
          class: "DFV-grid-element DFV-grid-repeat-element",
          key: C2,
          style: normalizeStyle(a2.value)
        }, [
          createElementVNode("div", G, [
            (openBlock(), createBlock(resolveDynamicComponent(e.resetButton), {
              label: e.resetLabel,
              onClick: (S) => n("resetElement", C2)
            }, null, 8, ["label", "onClick"])),
            (openBlock(), createBlock(resolveDynamicComponent(e.removeButton), {
              label: e.removeLabel,
              disabled: e.min === e.getFormFieldsQuantity(),
              onClick: (S) => n("removeElement", C2)
            }, null, 8, ["label", "disabled", "onClick"]))
          ]),
          createElementVNode("div", {
            class: "DFV-grid-container DFV-grid-repeat-container",
            style: normalizeStyle(V.value)
          }, [
            (openBlock(), createBlock(resolveDynamicComponent(b2)))
          ], 4)
        ], 4))), 128))
      ], 4),
      createElementVNode("div", K, [
        (openBlock(), createBlock(resolveDynamicComponent(e.addButton), {
          label: e.addLabel,
          disabled: e.max === e.getFormFieldsQuantity(),
          onClick: f[0] || (f[0] = (b2) => n("addElement"))
        }, null, 8, ["label", "disabled"]))
      ])
    ], 4));
  }
}), N = { class: "DFV-grid-union-select" }, R = /* @__PURE__ */ defineComponent({
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
    const e = s, n = t, r2 = computed(
      () => e.kinds.map(
        (u) => ({
          value: u,
          label: e.labels?.[u] ?? u
        })
      )
    ), o = computed({
      get: () => e.getCurrentKind(),
      set: (u) => {
        n("changeKind", u);
      }
    }), a2 = computed(() => ({
      "--DFV-grid-max-columns": e.maxColumns,
      "--DFV-grid-gap": e.gap !== void 0 ? `${e.gap}px` : void 0
    })), V = computed(() => ({
      "--DFV-grid-columns": e.columns
    }));
    return (u, f) => (openBlock(), createElementBlock("div", {
      class: "DFV-grid-element",
      style: normalizeStyle(V.value)
    }, [
      createElementVNode("div", N, [
        (openBlock(), createBlock(resolveDynamicComponent(e.selectInputKind), {
          "field-key": e.fieldKey,
          options: r2.value,
          modelValue: o.value,
          "onUpdate:modelValue": f[0] || (f[0] = (b2) => o.value = b2)
        }, null, 8, ["field-key", "options", "modelValue"]))
      ]),
      createElementVNode("div", {
        class: "DFV-grid-container",
        style: normalizeStyle(a2.value)
      }, [
        renderSlot(u.$slots, "formField")
      ], 4)
    ], 4));
  }
}), A = { class: "DFV-grid-element DFV-step-root" }, Q = { class: "DFV-step-content" }, U = {
  key: 0,
  class: "DFV-step-error"
}, P = { class: "DFV-step-actions" }, z = /* @__PURE__ */ defineComponent({
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
    return (r2, o) => (openBlock(), createElementBlock("div", A, [
      createElementVNode("div", Q, [
        renderSlot(r2.$slots, "formField")
      ]),
      e.getErrorMessageNotAtLastStep() || e.hideEmptyMessageError !== true ? (openBlock(), createElementBlock("small", U, toDisplayString(e.getErrorMessageNotAtLastStep()), 1)) : createCommentVNode("", true),
      createElementVNode("div", P, [
        (openBlock(), createBlock(resolveDynamicComponent(e.previousButton), {
          label: e.previousLabel,
          disabled: e.getCurrentStep() === 0,
          onClick: o[0] || (o[0] = (a2) => n("previousStep"))
        }, null, 8, ["label", "disabled"])),
        (openBlock(), createBlock(resolveDynamicComponent(e.resetButton), {
          label: e.resetLabel,
          onClick: o[1] || (o[1] = (a2) => n("resetStep"))
        }, null, 8, ["label"])),
        (openBlock(), createBlock(resolveDynamicComponent(e.nextButton), {
          label: e.nextLabel,
          disabled: e.isLastStep(),
          onClick: o[2] || (o[2] = (a2) => n("nextStep"))
        }, null, 8, ["label", "disabled"]))
      ])
    ]));
  }
}), j = ["for"], q = /* @__PURE__ */ defineComponent({
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
    const t = s, e = computed(() => ({
      "--DFV-grid-columns": t.columns
    })), n = computed(() => ({
      "--DFV-grid-max-columns": t.maxColumns,
      "--DFV-grid-gap": t.gap !== void 0 ? `${t.gap}px` : void 0
    }));
    return (r2, o) => (openBlock(), createElementBlock("div", {
      class: "DFV-grid-element",
      style: normalizeStyle(e.value)
    }, [
      t.title ? (openBlock(), createElementBlock("label", {
        key: 0,
        for: t.fieldKey
      }, toDisplayString(t.title), 9, j)) : createCommentVNode("", true),
      createElementVNode("div", {
        class: "DFV-grid-container",
        style: normalizeStyle(n.value)
      }, [
        renderSlot(r2.$slots, "formField")
      ], 4)
    ], 4));
  }
});
function J(s) {
  const t = d(
    "form",
    $,
    { props: s.form }
  ), e = d(
    "input",
    h,
    { props: s.input }
  ), n = d(
    "multi",
    B$1,
    { props: s.multi }
  ), r2 = d(
    "check",
    M,
    { props: s.check }
  ), o = d(
    "repeat",
    I,
    { props: s.repeat }
  ), a2 = d(
    "union",
    R,
    { props: s.union }
  ), V = d(
    "step",
    z,
    { props: s.step }
  ), u = d(
    "section",
    q,
    { props: s.section }
  );
  return {
    useFormTemplate: t,
    useInputTemplate: e,
    useMultiTemplate: n,
    useCheckTemplate: r2,
    useRepeatTemplate: o,
    useUnionTemplate: a2,
    useStepByStepTemplate: V,
    useSectionTemplate: u,
    useTemplates: () => ({
      check: r2(),
      form: t(),
      input: e(),
      multi: n(),
      repeat: o(),
      section: u(),
      step: V(),
      union: a2()
    })
  };
}
const Ae = A$1(
  // @ts-expect-error - reserved kind namespace
  "DuplojsUtilsDate"
), ve = -864e13, he = 864e13, ge = -9007199254740991, Ve = 9007199254740991;
function Je(e) {
  return Number.isNaN(e) ? 0 : e > he ? he : e < ve ? ve : Number.isInteger(e) ? e : Math.round(e);
}
function re(e) {
  if (e instanceof b) {
    const n = e.getTime();
    return `date${Math.abs(n)}${n > 0 ? "+" : "-"}`;
  }
  const t = e.toNative();
  return `time${Math.abs(t)}${t > 0 ? "+" : "-"}`;
}
const bt = {};
class b extends ne$1("the-date", Ae("the-date"), Date) {
  constructor(t) {
    super(bt, [t]);
  }
  toNative() {
    return new Date(this.getTime());
  }
  toString() {
    return re(this);
  }
  toJSON() {
    return re(this);
  }
  /**
   * @deprecated this method does not work on ImmutableDate
   */
  setDate(t) {
    return this.getTime();
  }
  /**
   * @deprecated this method does not work on ImmutableDate
   */
  setFullYear(t, n, o) {
    return this.getTime();
  }
  /**
   * @deprecated this method does not work on ImmutableDate
   */
  setHours(t, n, o, s) {
    return this.getTime();
  }
  /**
   * @deprecated this method does not work on ImmutableDate
   */
  setMilliseconds(t) {
    return this.getTime();
  }
  /**
   * @deprecated this method does not work on ImmutableDate
   */
  setMinutes(t, n, o) {
    return this.getTime();
  }
  /**
   * @deprecated this method does not work on ImmutableDate
   */
  setMonth(t, n) {
    return this.getTime();
  }
  /**
   * @deprecated this method does not work on ImmutableDate
   */
  setSeconds(t, n) {
    return this.getTime();
  }
  /**
   * @deprecated this method does not work on ImmutableDate
   */
  setTime(t) {
    return this.getTime();
  }
  /**
   * @deprecated this method does not work on ImmutableDate
   */
  setUTCDate(t) {
    return this.getTime();
  }
  /**
   * @deprecated this method does not work on ImmutableDate
   */
  setUTCFullYear(t, n, o) {
    return this.getTime();
  }
  /**
   * @deprecated this method does not work on ImmutableDate
   */
  setUTCHours(t, n, o, s) {
    return this.getTime();
  }
  /**
   * @deprecated this method does not work on ImmutableDate
   */
  setUTCMilliseconds(t) {
    return this.getTime();
  }
  /**
   * @deprecated this method does not work on ImmutableDate
   */
  setUTCMinutes(t, n, o) {
    return this.getTime();
  }
  /**
   * @deprecated this method does not work on ImmutableDate
   */
  setUTCMonth(t, n) {
    return this.getTime();
  }
  /**
   * @deprecated this method does not work on ImmutableDate
   */
  setUTCSeconds(t, n) {
    return this.getTime();
  }
  /**
   * @internal
   * @deprecated use DDate.create | DDate.createOrThrow function
   */
  static new(t) {
    return new b(Je(t));
  }
}
function Qe(e) {
  return Number.isNaN(e) ? 0 : e > Ve ? Ve : e < ge ? ge : Number.isInteger(e) ? e : Math.round(e);
}
const $t = {};
class C extends ne$1("the-time", Ae("the-time")) {
  timeValue;
  constructor(t) {
    super($t), this.timeValue = t;
  }
  toNative() {
    return this.timeValue;
  }
  toString() {
    return re(this);
  }
  toJSON() {
    return re(this);
  }
  /**
   * @internal
   * @deprecated use DDate.createTime | DDate.createTimeOrThrow function
   */
  static new(t) {
    return new C(Qe(t));
  }
}
const Mt = ["stroke-width"], wt = /* @__PURE__ */ defineComponent({
  __name: "IconChevronDown",
  props: {
    size: { default: "md" },
    strokeWidth: { default: 1.8 }
  },
  setup(e) {
    const t = e, n = computed(() => ({
      "--DFV-icon-size": B[t.size]
    }));
    return (o, s) => (openBlock(), createElementBlock("svg", {
      class: "DFV-icon-svg",
      "data-dfv-icon": "chevron-down",
      style: normalizeStyle(n.value),
      viewBox: "0 0 20 20",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    }, [
      createElementVNode("path", {
        d: "M5 7.5L10 12.5L15 7.5",
        stroke: "currentColor",
        "stroke-width": e.strokeWidth,
        "stroke-linecap": "round",
        "stroke-linejoin": "round"
      }, null, 8, Mt)
    ], 4));
  }
}), St = ["stroke-width"], Xe = /* @__PURE__ */ defineComponent({
  __name: "IconMinus",
  props: {
    size: { default: "md" },
    strokeWidth: { default: 1.7 }
  },
  setup(e) {
    const t = e, n = computed(() => ({
      "--DFV-icon-size": B[t.size]
    }));
    return (o, s) => (openBlock(), createElementBlock("svg", {
      class: "DFV-icon-svg",
      "data-dfv-icon": "minus",
      style: normalizeStyle(n.value),
      viewBox: "0 0 20 20",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    }, [
      createElementVNode("path", {
        d: "M5 10H15",
        stroke: "currentColor",
        "stroke-width": e.strokeWidth,
        "stroke-linecap": "round",
        "stroke-linejoin": "round"
      }, null, 8, St)
    ], 4));
  }
}), Ft = ["stroke-width"], Gn = /* @__PURE__ */ defineComponent({
  __name: "IconNext",
  props: {
    size: { default: "md" },
    strokeWidth: { default: 1.7 }
  },
  setup(e) {
    const t = e, n = computed(() => ({
      "--DFV-icon-size": B[t.size]
    }));
    return (o, s) => (openBlock(), createElementBlock("svg", {
      class: "DFV-icon-svg",
      "data-dfv-icon": "next",
      style: normalizeStyle(n.value),
      viewBox: "0 0 20 20",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    }, [
      createElementVNode("path", {
        d: "M7 5L13 10L7 15",
        stroke: "currentColor",
        "stroke-width": e.strokeWidth,
        "stroke-linecap": "round",
        "stroke-linejoin": "round"
      }, null, 8, Ft)
    ], 4));
  }
}), zt = ["stroke-width"], It = ["stroke-width"], Jn = /* @__PURE__ */ defineComponent({
  __name: "IconPlus",
  props: {
    size: { default: "md" },
    strokeWidth: { default: 1.7 }
  },
  setup(e) {
    const t = e, n = computed(() => ({
      "--DFV-icon-size": B[t.size]
    }));
    return (o, s) => (openBlock(), createElementBlock("svg", {
      class: "DFV-icon-svg",
      "data-dfv-icon": "plus",
      style: normalizeStyle(n.value),
      viewBox: "0 0 20 20",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    }, [
      createElementVNode("path", {
        d: "M10 4V16",
        stroke: "currentColor",
        "stroke-width": e.strokeWidth,
        "stroke-linecap": "round",
        "stroke-linejoin": "round"
      }, null, 8, zt),
      createElementVNode("path", {
        d: "M4 10H16",
        stroke: "currentColor",
        "stroke-width": e.strokeWidth,
        "stroke-linecap": "round",
        "stroke-linejoin": "round"
      }, null, 8, It)
    ], 4));
  }
}), Nt = ["stroke-width"], Qn = /* @__PURE__ */ defineComponent({
  __name: "IconPrevious",
  props: {
    size: { default: "md" },
    strokeWidth: { default: 1.7 }
  },
  setup(e) {
    const t = e, n = computed(() => ({
      "--DFV-icon-size": B[t.size]
    }));
    return (o, s) => (openBlock(), createElementBlock("svg", {
      class: "DFV-icon-svg",
      "data-dfv-icon": "previous",
      style: normalizeStyle(n.value),
      viewBox: "0 0 20 20",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    }, [
      createElementVNode("path", {
        d: "M13 5L7 10L13 15",
        stroke: "currentColor",
        "stroke-width": e.strokeWidth,
        "stroke-linecap": "round",
        "stroke-linejoin": "round"
      }, null, 8, Nt)
    ], 4));
  }
}), Ut = ["stroke-width"], Ct = ["stroke-width"], Xn = /* @__PURE__ */ defineComponent({
  __name: "IconRemove",
  props: {
    size: { default: "md" },
    strokeWidth: { default: 1.7 }
  },
  setup(e) {
    const t = e, n = computed(() => ({
      "--DFV-icon-size": B[t.size]
    }));
    return (o, s) => (openBlock(), createElementBlock("svg", {
      class: "DFV-icon-svg",
      "data-dfv-icon": "remove",
      style: normalizeStyle(n.value),
      viewBox: "0 0 20 20",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    }, [
      createElementVNode("path", {
        d: "M5 5L15 15",
        stroke: "currentColor",
        "stroke-width": e.strokeWidth,
        "stroke-linecap": "round",
        "stroke-linejoin": "round"
      }, null, 8, Ut),
      createElementVNode("path", {
        d: "M15 5L5 15",
        stroke: "currentColor",
        "stroke-width": e.strokeWidth,
        "stroke-linecap": "round",
        "stroke-linejoin": "round"
      }, null, 8, Ct)
    ], 4));
  }
}), Bt = ["stroke-width"], Pt = ["stroke-width"], eo = /* @__PURE__ */ defineComponent({
  __name: "IconReset",
  props: {
    size: { default: "md" },
    strokeWidth: { default: 1.7 }
  },
  setup(e) {
    const t = e, n = computed(() => ({
      "--DFV-icon-size": B[t.size]
    }));
    return (o, s) => (openBlock(), createElementBlock("svg", {
      class: "DFV-icon-svg",
      "data-dfv-icon": "reset",
      style: normalizeStyle(n.value),
      viewBox: "0 0 20 20",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    }, [
      createElementVNode("path", {
        d: "M4 10a6 6 0 1 0 1.9-4.35",
        stroke: "currentColor",
        "stroke-width": e.strokeWidth,
        "stroke-linecap": "round",
        "stroke-linejoin": "round"
      }, null, 8, Bt),
      createElementVNode("path", {
        d: "M4 4v3.5h3.5",
        stroke: "currentColor",
        "stroke-width": e.strokeWidth,
        "stroke-linecap": "round",
        "stroke-linejoin": "round"
      }, null, 8, Pt)
    ], 4));
  }
}), B = {
  sm: "0.875rem",
  md: "1rem",
  lg: "1.125rem",
  xl: "1.25rem",
  "2xl": "1.5rem"
}, Rt = { class: "DFV-select-input-root" }, Wt = ["id"], jt = ["value"], Yt = { class: "DFV-select-input-icon" }, et = /* @__PURE__ */ defineComponent({
  __name: "SelectInput",
  props: /* @__PURE__ */ mergeModels({
    fieldKey: { default: "default" },
    options: {}
  }, {
    modelValue: { default: null },
    modelModifiers: {}
  }),
  emits: ["update:modelValue"],
  setup(e) {
    const t = e, n = useModel(e, "modelValue");
    return (o, s) => (openBlock(), createElementBlock("div", Rt, [
      withDirectives(createElementVNode("select", {
        class: "DFV-select-input",
        "onUpdate:modelValue": s[0] || (s[0] = (a2) => n.value = a2),
        id: `select-${t.fieldKey}`
      }, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(t.options, ({ value: a2, label: r2 }) => (openBlock(), createElementBlock("option", {
          value: a2,
          key: `${a2}-${r2}`
        }, toDisplayString(r2), 9, jt))), 128))
      ], 8, Wt), [
        [vModelSelect, n.value]
      ]),
      createElementVNode("span", Yt, [
        createVNode(unref(wt))
      ])
    ]));
  }
}), Et = ["value", "placeholder", "min", "max", "step"], le = /* @__PURE__ */ defineComponent({
  __name: "NumberInput",
  props: /* @__PURE__ */ mergeModels({
    placeholder: {},
    min: {},
    max: {},
    step: {}
  }, {
    modelValue: { required: true },
    modelModifiers: {}
  }),
  emits: ["update:modelValue"],
  setup(e) {
    const t = e, n = useModel(e, "modelValue");
    function o(s) {
      const a2 = s.target;
      a2.value !== "" ? (n.value = Number(a2.value), a2.value = n.value.toString()) : (n.value = t.min ?? 0, a2.value = t.min?.toString() ?? "0");
    }
    return (s, a2) => (openBlock(), createElementBlock("input", {
      class: "DFV-number-input",
      type: "number",
      onInput: o,
      value: n.value,
      placeholder: t.placeholder,
      min: t.min,
      max: t.max,
      step: t.step
    }, null, 40, Et));
  }
}), Jt = ["placeholder"], Qt = /* @__PURE__ */ defineComponent({
  __name: "TextareaInput",
  props: /* @__PURE__ */ mergeModels({
    placeholder: {}
  }, {
    modelValue: {},
    modelModifiers: {}
  }),
  emits: ["update:modelValue"],
  setup(e) {
    const t = e, n = useModel(e, "modelValue");
    return (o, s) => withDirectives((openBlock(), createElementBlock("textarea", {
      class: "DFV-text-area",
      "onUpdate:modelValue": s[0] || (s[0] = (a2) => n.value = a2),
      placeholder: t.placeholder
    }, null, 8, Jt)), [
      [vModelText, n.value]
    ]);
  }
}), Xt = ["placeholder"], en = /* @__PURE__ */ defineComponent({
  __name: "TextInput",
  props: /* @__PURE__ */ mergeModels({
    placeholder: {}
  }, {
    modelValue: {},
    modelModifiers: {}
  }),
  emits: ["update:modelValue"],
  setup(e) {
    const t = e, n = useModel(e, "modelValue");
    return (o, s) => withDirectives((openBlock(), createElementBlock("input", {
      class: "DFV-text-input",
      "onUpdate:modelValue": s[0] || (s[0] = (a2) => n.value = a2),
      type: "text",
      placeholder: t.placeholder
    }, null, 8, Xt)), [
      [vModelText, n.value]
    ]);
  }
}), Ne = {
  next: defineAsyncComponent(() => import("./IconNext-DWcbCcMC.D8Zn30yx.js")),
  previous: defineAsyncComponent(() => import("./IconPrevious-C2I1ed3T.BDdGIN3Z.js")),
  plus: defineAsyncComponent(() => import("./IconPlus-Mh8q9NA-.nGlY3Cc2.js")),
  remove: defineAsyncComponent(() => import("./IconRemove-3pSdlNrw.CSWWSyak.js")),
  reset: defineAsyncComponent(() => import("./IconReset-m0GqtUg0.sz5sjruK.js")),
  minus: defineAsyncComponent(() => import("./IconMinus-BaCGHO36.D80Zkf1-.js"))
}, tn = ["type", "disabled"], nn = { key: 1 }, de = /* @__PURE__ */ defineComponent({
  __name: "TheButton",
  props: {
    label: {},
    variant: { default: "primary" },
    size: { default: "md" },
    icon: {},
    iconSize: {},
    iconPosition: { default: "start" },
    type: { default: "button" },
    disabled: { type: Boolean, default: false }
  },
  setup(e) {
    return (t, n) => (openBlock(), createElementBlock("button", {
      class: normalizeClass([
        "DFV-button",
        `DFV-button-variant-${e.variant}`,
        `DFV-button-size-${e.size}`
      ]),
      type: e.type,
      disabled: e.disabled
    }, [
      e.icon && e.iconPosition === "start" ? (openBlock(), createBlock(resolveDynamicComponent(unref(Ne)[e.icon]), {
        key: 0,
        size: e.iconSize ?? e.size
      }, null, 8, ["size"])) : createCommentVNode("", true),
      e.label ? (openBlock(), createElementBlock("span", nn, toDisplayString(e.label), 1)) : createCommentVNode("", true),
      e.icon && e.iconPosition === "end" ? (openBlock(), createBlock(resolveDynamicComponent(unref(Ne)[e.icon]), {
        key: 2,
        size: e.iconSize ?? e.size
      }, null, 8, ["size"])) : createCommentVNode("", true)
    ], 10, tn));
  }
}), tt = /* @__PURE__ */ defineComponent({
  __name: "PrimaryButton",
  props: {
    label: {},
    size: {},
    icon: {},
    iconPosition: {},
    iconSize: {},
    type: {},
    disabled: { type: Boolean }
  },
  setup(e) {
    const t = e;
    return (n, o) => (openBlock(), createBlock(de, mergeProps({ variant: "primary" }, t), null, 16));
  }
}), nt = /* @__PURE__ */ defineComponent({
  __name: "OutlineButton",
  props: {
    label: {},
    size: {},
    icon: {},
    iconPosition: {},
    iconSize: {},
    type: {},
    disabled: { type: Boolean }
  },
  setup(e) {
    const t = e;
    return (n, o) => (openBlock(), createBlock(de, mergeProps({ variant: "outline" }, t), null, 16));
  }
}), on = /* @__PURE__ */ defineComponent({
  __name: "DestructiveButton",
  props: {
    label: {},
    size: {},
    icon: {},
    iconPosition: {},
    iconSize: {},
    type: {},
    disabled: { type: Boolean }
  },
  setup(e) {
    const t = e;
    return (n, o) => (openBlock(), createBlock(de, mergeProps({ variant: "destructive" }, t), null, 16));
  }
}), no = ({ label: e, disabled: t }) => h$1(
  tt,
  {
    label: e,
    disabled: t,
    size: "sm",
    iconSize: "lg",
    icon: "plus",
    iconPosition: "start"
  }
), oo = ({ label: e, disabled: t }) => h$1(
  nt,
  {
    label: e,
    disabled: t,
    size: "sm",
    iconSize: "lg",
    iconPosition: "start"
  }
), so = ({ label: e, disabled: t }) => h$1(
  on,
  {
    label: e,
    disabled: t,
    size: "sm",
    icon: "reset",
    iconSize: "lg",
    iconPosition: "start"
  }
), ao = ({ label: e, disabled: t }) => h$1(
  tt,
  {
    label: e,
    disabled: t,
    size: "sm",
    icon: "next",
    iconSize: "lg",
    iconPosition: "end"
  }
), io = ({ label: e, disabled: t }) => h$1(
  nt,
  {
    label: e,
    disabled: t,
    size: "sm",
    icon: "previous",
    iconSize: "lg",
    iconPosition: "start"
  }
), D = A$1(
  // @ts-expect-error reserved kind namespace
  "DuplojsUtilsFlow"
), ye = D("dependence-handler");
class Pe extends ne$1("missing-dependence-error", D("missing-dependence-error"), Error) {
  dependenceHandler;
  constructor(t) {
    super({}, [`Missing dependence : ${ye.getValue(t)}`]), this.dependenceHandler = t;
  }
}
const Ln = (e, t) => h$1(
  et,
  {
    ...e,
    "onUpdate:modelValue": (n) => {
      n !== null && t.emit("update:modelValue", n);
    }
  }
);
Ln.emits = ["update:modelValue"];
const go = re$2(
  le,
  {
    defaultValue: 0
  }
), yo = re$2(
  Qt,
  {
    defaultValue: ""
  }
), _o = re$2(
  en,
  {
    defaultValue: ""
  }
);
export {
  Gn as G,
  Jn as J,
  Ln as L,
  Qn as Q,
  Xn as X,
  Y,
  Z,
  _o as _,
  Xe as a,
  J as b,
  ao as c,
  nt as d,
  eo as e,
  oe as f,
  go as g,
  ne as h,
  io as i,
  te as j,
  d as k,
  re$2 as l,
  no as n,
  oo as o,
  re$1 as r,
  so as s,
  tt as t,
  yo as y
};
