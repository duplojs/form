import { c as C, i as M, e as R, s as b, f as Q } from "./chunks/input-C4gxrRt9.js";
import { a as oe } from "./chunks/input-C4gxrRt9.js";
import { c as ue } from "./chunks/kind-DwvbGHaV.js";
import { ref as j, normalizeClass as z, effectScope as O, computed as A, watch as T } from "vue";
import { simpleClone as _, unwrap as $ } from "@duplojs/utils";
import { c as ae, t as le } from "./chunks/template-Dz0VDr0a.js";
function G(s) {
  return (n, e = {}) => {
    const t = e.template ?? s.form, d = j(_(n.defaultValue)), i = j(null), a = n.new(
      d,
      "FRM",
      s,
      (v, N) => i.value?.[v]?.(N) ?? null
    ), o = () => a.check(), h = () => {
      a.reset(), d.value = _(n.defaultValue);
    }, r = () => {
      a.dispose();
    }, f = () => d.value;
    return {
      currentValue: d,
      component: (v, { slots: N }) => (i.value = N, t.getVNode(
        {
          ...v,
          class: z([v.class, e.class]),
          fieldKey: "FRM",
          onSubmit: () => {
          },
          getCurrentValue: f
        },
        {
          submitter: N.default ?? (() => null),
          formField: () => a.getVNode()
        }
      )),
      reset: h,
      dispose: r,
      check: o
    };
  };
}
function P(...s) {
  if (s.length === 1) {
    const [u] = s;
    return (t) => P(t, u);
  }
  const [n, e] = s;
  return n.length >= e;
}
function U(...s) {
  if (s.length === 1) {
    const [u] = s;
    return (t) => U(t, u);
  }
  const [n, e] = s;
  return n.length - 1 === e;
}
function J(s, n) {
  const e = s instanceof Array ? s : Object.entries(s);
  return C(
    (u, t, d, i) => {
      const a = `${t}_MUL`, o = n?.template ?? d.multi, h = O(), { formFieldInstanceEntries: r } = h.run(() => ({
        formFieldInstanceEntries: e.map(
          ([p, y]) => [
            p,
            y.new(
              A({
                get: () => u.value[p],
                set: (E) => {
                  u.value[p] = E;
                }
              }),
              `${a}-${p}`,
              d,
              i
            )
          ]
        )
      })), f = () => {
        const k = {}, p = [];
        for (let y = 0; y < r.length; y++) {
          const [E, L] = r[y], g = L.check();
          M(g) ? p.push(...$(g)) : k[E] = $(g);
        }
        return P(p, 1) ? R(p) : b(k);
      }, F = () => {
        r.forEach(
          ([, k]) => {
            k.reset();
          }
        );
      }, v = () => {
        h.stop(), r.forEach(
          ([, k]) => {
            k.dispose();
          }
        );
      }, N = () => u.value, m = () => r.map(
        (k) => k[1].getVNode()
      );
      return {
        check: f,
        reset: F,
        dispose: v,
        getVNode: () => o.getVNode(
          {
            fieldKey: a,
            getFormFields: m,
            getCurrentValue: N,
            class: n?.class
          },
          {
            formField: m
          }
        )
      };
    },
    e.reduce(
      (u, t) => (u[t[0]] = t[1].defaultValue, u),
      {}
    )
  );
}
function W(s, n) {
  return C(
    (e, u, t, d) => {
      const i = `${u}_DIS`, a = s.new(
        e,
        i,
        t,
        d
      );
      return {
        check: () => n.isDisabled() ? b(void 0) : a.check(),
        reset: () => {
          a.reset();
        },
        dispose: () => {
          a.dispose();
        },
        getVNode: () => n.isDisabled() ? null : a.getVNode()
      };
    },
    s.defaultValue
  );
}
function X(s, n) {
  return C(
    (e, u, t, d) => {
      const i = `${u}_CHK`, a = n?.template ?? t.check, o = s.new(
        e,
        i,
        t,
        d
      ), h = O(), { errorMessage: r } = h.run(() => {
        const p = j(null);
        return T(
          e,
          () => {
            p.value !== null && f();
          },
          { flush: "post" }
        ), {
          errorMessage: p
        };
      }), f = () => {
        const p = o.check();
        if (M(p))
          return p;
        const y = $(p), E = n.refine?.(y);
        if (M(E))
          return r.value = $(E), R(
            [{ key: i }]
          );
        const L = n.dataParser?.parse(
          y
        ) ?? b(y);
        if (M(L)) {
          const g = $(L);
          return r.value = g.issues[0]?.message ?? "Error", R(
            [
              {
                key: i,
                dataParserError: g
              }
            ]
          );
        }
        return r.value = null, L;
      }, F = () => {
        o.reset(), r.value = null;
      }, v = () => {
        h.stop(), o.dispose();
      }, N = () => e.value, m = () => o.getVNode(), w = () => r.value;
      return {
        check: f,
        reset: F,
        dispose: v,
        getVNode: () => a.getVNode(
          {
            fieldKey: i,
            getErrorMessage: w,
            getCurrentValue: N,
            class: n.class
          },
          { formField: m }
        )
      };
    },
    s.defaultValue
  );
}
function Y(s, n) {
  const e = n.min ?? 0, u = n.max;
  return C(
    (t, d, i, a) => {
      const o = `${d}_REP`, h = n?.template ?? i.repeat, r = {}, f = (c) => (r[c] === void 0 && (r[c] = s.new(
        A({
          get: () => c in t.value ? t.value[c] : s.defaultValue,
          set: (l) => {
            c >= t.value.length || (t.value[c] = l);
          }
        }),
        `${o}-${c}`,
        i,
        a
      )), r[c]), F = O(), {
        formFieldInstances: v
      } = F.run(() => {
        const c = j([]);
        return T(
          () => t.value.length,
          (l) => {
            c.value = Array.from({ length: l }).map(
              (V, K) => f(K)
            );
          },
          { immediate: !0 }
        ), {
          formFieldInstances: c
        };
      }), N = () => {
        const c = [], l = [];
        for (let V = 0; V < v.value.length; V++) {
          const I = v.value[V].check();
          M(I) ? l.push(...$(I)) : c.push($(I));
        }
        return P(l, 1) ? R(l) : b(c);
      }, m = () => {
        Object.entries(r).forEach(
          ([, c]) => {
            c.reset();
          }
        );
      }, w = () => {
        F.stop(), Object.entries(r).forEach(
          ([, c]) => {
            c.dispose();
          }
        );
      }, k = () => t.value, p = () => v.value.map(
        (c) => c.getVNode()
      ), y = () => v.value.length, E = () => {
        t.value.length >= u || t.value.push(
          _(s.defaultValue)
        );
      }, L = (c) => {
        t.value.length <= e || t.value.splice(c, 1);
      }, g = (c) => {
        c in t.value && (v.value[c]?.reset(), t.value[c] = _(s.defaultValue));
      };
      return {
        check: N,
        reset: m,
        dispose: w,
        getVNode: () => h.getVNode(
          {
            fieldKey: o,
            getFormFields: p,
            getFormFieldsQuantity: y,
            getCurrentValue: k,
            max: u,
            min: e,
            onAddElement: E,
            onRemoveElement: L,
            onResetElement: g,
            class: n.class
          },
          {
            formField: p
          }
        )
      };
    },
    Array.from({ length: e }).fill(s.defaultValue)
  );
}
function Z(s, n) {
  const e = Object.fromEntries(s), u = Object.keys(e);
  return C(
    (t, d, i, a) => {
      const o = `${d}_UNI`, h = n?.template ?? i.union;
      let r = {};
      const f = {}, F = O(), {
        formFieldInstances: v
      } = F.run(() => (T(
        t,
        () => {
          t.value.updateKind = (S, ...c) => {
            r[t.value.kind] = t.value.value;
            const l = c.length === 1 ? c[0] : S in r ? r[S] : _(
              e[S].defaultValue
            );
            t.value.kind = S, t.value.value = l;
          }, r = {};
        },
        {
          immediate: !0
        }
      ), {
        formFieldInstances: Object.fromEntries(
          s.map(
            ([S, c]) => [
              S,
              () => (f[S] === void 0 && (f[S] = c.new(
                A({
                  get: () => S === t.value.kind ? t.value.value : e[S].defaultValue,
                  set: (l) => {
                    S === t.value.kind && (t.value.value = l);
                  }
                }),
                `${o}-${S}`,
                i,
                a
              )), f[S])
            ]
          )
        )
      })), N = () => {
        const g = v[t.value.kind]().check();
        return M(g) ? g : b({
          kind: t.value.kind,
          value: $(g)
        });
      }, m = () => {
        r = {}, Object.entries(f).forEach(
          ([, g]) => {
            g.reset();
          }
        );
      }, w = () => {
        F.stop(), Object.entries(f).forEach(
          ([, g]) => {
            g.dispose();
          }
        );
      }, k = () => t.value, p = () => v[t.value.kind]().getVNode(), y = () => t.value.kind, E = (g) => {
        e[g] !== void 0 && t.value.updateKind(g);
      };
      return {
        check: N,
        reset: m,
        dispose: w,
        getVNode: () => h.getVNode(
          {
            fieldKey: o,
            kinds: u,
            getCurrentValue: k,
            getCurrentKind: y,
            onChangeKind: E,
            class: n.class
          },
          {
            formField: p
          }
        )
      };
    },
    {
      kind: n.defaultKind,
      value: e[n.defaultKind].defaultValue,
      updateKind: () => {
      }
    }
  );
}
function ee(s, n) {
  return C(
    (e, u, t, d) => {
      const i = `${u}_STP`, a = n?.template ?? t.step, o = {}, h = O(), {
        formFieldInstances: r,
        errorMessageNotAtLastStep: f
      } = h.run(() => {
        const l = j(null);
        return {
          formFieldInstances: s.map(
            (K, I) => (() => (o[I] === void 0 && (o[I] = K.new(
              A({
                get: () => e.value.steps[I],
                set: (x) => {
                  e.value.steps[I] = x;
                }
              }),
              `${i}-${I}`,
              t,
              d
            )), o[I]))
          ),
          errorMessageNotAtLastStep: l
        };
      }), F = () => {
        const l = [], V = [];
        if (p() !== !0)
          return f.value = n.errorMessageNotAtLastStep, R([{ key: i }]);
        let K;
        for (let I = 0; I < r.length; I++) {
          const D = r[I]().check();
          M(D) ? (K === void 0 && (K = I), V.push(...$(D))) : l.push($(D));
        }
        return K !== void 0 && (e.value.currentStep = K), P(V, 1) ? R(V) : b(l);
      }, v = () => {
        Object.values(o).forEach(
          (l) => {
            l.reset();
          }
        );
      }, N = () => {
        h.stop(), Object.values(o).forEach(
          (l) => {
            l.dispose();
          }
        );
      }, m = () => e.value, w = () => r.map(
        (l) => () => l().getVNode()
      ), k = () => e.value.currentStep, p = () => U(s, e.value.currentStep), y = () => r[e.value.currentStep]().getVNode(), E = () => f.value, L = () => {
        f.value = null;
        const l = r[e.value.currentStep]().check();
        if (M(l))
          return;
        const V = e.value.currentStep + 1;
        e.value.steps[V] !== void 0 && (e.value.currentStep = V);
      }, g = () => {
        f.value = null;
        const l = e.value.currentStep - 1;
        e.value.steps[l] !== void 0 && (e.value.currentStep = l);
      }, S = () => {
        f.value = null, r[e.value.currentStep]().reset(), e.value.steps[e.value.currentStep] = _(
          s[e.value.currentStep]?.defaultValue
        );
      };
      return {
        check: F,
        reset: v,
        dispose: N,
        getVNode: () => a.getVNode(
          {
            fieldKey: i,
            stepQuantity: s.length,
            getFormFields: w,
            getCurrentValue: m,
            getCurrentStep: k,
            isLastStep: p,
            getErrorMessageNotAtLastStep: E,
            onNextStep: L,
            onPreviousStep: g,
            onResetStep: S,
            class: n.class
          },
          {
            formField: y
          }
        )
      };
    },
    {
      currentStep: 0,
      steps: s.map(
        (e) => e.defaultValue
      )
    }
  );
}
function te(s, n) {
  return C(
    (e, u, t, d) => {
      const i = `${u}_SEC`, a = n?.template ?? t.section, o = s.new(
        e,
        i,
        t,
        d
      ), h = () => o.check(), r = () => {
        o.reset();
      }, f = () => {
        o.dispose();
      }, F = () => o.getVNode(), v = () => e.value;
      return {
        check: h,
        reset: r,
        dispose: f,
        getVNode: () => a.getVNode(
          {
            fieldKey: i,
            getCurrentValue: v,
            title: n?.title,
            class: n?.class
          },
          {
            formField: F
          }
        )
      };
    },
    s.defaultValue
  );
}
function ne(s, n) {
  if (Q.has(n)) {
    const e = n;
    return C(
      (u, t, d, i) => {
        const a = `${t}_SLT`, o = e.new(
          u,
          a,
          d,
          i
        ), h = () => o.check(), r = () => {
          o.reset();
        }, f = () => {
          o.dispose();
        }, F = () => o.getVNode(), v = (m) => {
          u.value = m;
        };
        return {
          check: h,
          reset: r,
          dispose: f,
          getVNode: () => i(
            s,
            {
              fieldKey: a,
              get value() {
                return u.value;
              },
              update: v,
              formField: F
            }
          )
        };
      },
      e.defaultValue
    );
  }
  return C(
    (e, u, t, d) => {
      const i = `${u}_SLT`, a = () => b(e.value), o = () => {
      }, h = () => {
      }, r = (F) => {
        e.value = F;
      };
      return {
        check: a,
        reset: o,
        dispose: h,
        getVNode: () => d(
          s,
          {
            fieldKey: i,
            value: e.value,
            update: r
          }
        )
      };
    },
    typeof n.defaultValue == "function" ? n.defaultValue() : n.defaultValue
  );
}
export {
  G as createForm,
  C as createFormField,
  oe as createInput,
  ae as createTemplate,
  ue as createVueFormKind,
  Q as formFieldKind,
  le as templateKind,
  X as useCheckLayout,
  W as useDisabledLayout,
  J as useMultiLayout,
  Y as useRepeatLayout,
  te as useSectionLayout,
  ne as useSlotLayout,
  ee as useStepLayout,
  Z as useUnionLayout
};
