import { c as j, i as O, e as _, s as R, f as B } from "./chunks/input-BfByoR1U.js";
import { a as ie } from "./chunks/input-BfByoR1U.js";
import { c as ae } from "./chunks/kind-DwvbGHaV.js";
import { ref as P, h as w, normalizeClass as G, effectScope as D, computed as T, watch as z } from "vue";
import { simpleClone as A, unwrap as b } from "@duplojs/utils";
import { c as de, t as ve } from "./chunks/template-Dz0VDr0a.js";
function Y(r) {
  return (s, e = {}) => {
    const t = e.template ?? r.form, d = P(A(s.defaultValue)), i = P(null), l = s.new(
      d,
      "FRM",
      r,
      (m, S) => i.value?.[m]?.(S) ?? null
    ), c = () => l.check(), v = () => {
      l.reset(), d.value = A(s.defaultValue);
    }, o = () => {
      l.dispose();
    }, a = () => d.value, g = l.getVNode();
    return {
      currentValue: d,
      component: (m, { slots: S }) => (i.value = S, w(
        () => t.getVNode(
          {
            ...m,
            class: G([m.class, e.class]),
            fieldKey: "FRM",
            onSubmit: () => {
            },
            getCurrentValue: a
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
function U(...r) {
  if (r.length === 1) {
    const [u] = r;
    return (t) => U(t, u);
  }
  const [s, e] = r;
  return s.length >= e;
}
function q(...r) {
  if (r.length === 1) {
    const [u] = r;
    return (t) => q(t, u);
  }
  const [s, e] = r;
  return s.length - 1 === e;
}
function Z(r, s) {
  const e = r instanceof Array ? r : Object.entries(r);
  return j(
    (u, t, d, i) => {
      const l = `${t}_MUL`, c = s?.template ?? d.multi, v = D(), { formFieldInstanceEntries: o } = v.run(() => ({
        formFieldInstanceEntries: e.map(
          ([p, y]) => [
            p,
            y.new(
              T({
                get: () => u.value[p],
                set: (E) => {
                  u.value[p] = E;
                }
              }),
              `${l}-${p}`,
              d,
              i
            )
          ]
        )
      })), a = () => {
        const F = {}, p = [];
        for (let y = 0; y < o.length; y++) {
          const [E, L] = o[y], $ = L.check();
          O($) ? p.push(...b($)) : F[E] = b($);
        }
        return U(p, 1) ? _(p) : R(F);
      }, g = () => {
        o.forEach(
          ([, F]) => {
            F.reset();
          }
        );
      }, h = () => {
        v.stop(), o.forEach(
          ([, F]) => {
            F.dispose();
          }
        );
      }, m = () => u.value, S = o.map(
        (F) => F[1].getVNode()
      ), V = () => S;
      return {
        check: a,
        reset: g,
        dispose: h,
        getVNode: () => w(
          () => c.getVNode(
            {
              fieldKey: l,
              getFormFields: V,
              getCurrentValue: m,
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
function x(r, s) {
  return j(
    (e, u, t, d) => {
      const i = `${u}_DIS`, l = r.new(
        e,
        i,
        t,
        d
      ), c = () => s.isDisabled() ? R(void 0) : l.check(), v = () => {
        l.reset();
      }, o = () => {
        l.dispose();
      }, a = l.getVNode();
      return {
        check: c,
        reset: v,
        dispose: o,
        getVNode: () => w(
          () => s.isDisabled() ? null : a
        )
      };
    },
    r.defaultValue
  );
}
function ee(r, s) {
  return j(
    (e, u, t, d) => {
      const i = `${u}_CHK`, l = s?.template ?? t.check, c = r.new(
        e,
        i,
        t,
        d
      ), v = D(), { errorMessage: o } = v.run(() => {
        const p = P(null);
        return z(
          e,
          () => {
            p.value !== null && a();
          },
          { flush: "post" }
        ), {
          errorMessage: p
        };
      }), a = () => {
        const p = c.check();
        if (O(p))
          return p;
        const y = b(p), E = s.refine?.(y);
        if (O(E))
          return o.value = b(E), _(
            [{ key: i }]
          );
        const L = s.dataParser?.parse(
          y
        ) ?? R(y);
        if (O(L)) {
          const $ = b(L);
          return o.value = $.issues[0]?.message ?? "Error", _(
            [
              {
                key: i,
                dataParserError: $
              }
            ]
          );
        }
        return o.value = null, L;
      }, g = () => {
        c.reset(), o.value = null;
      }, h = () => {
        v.stop(), c.dispose();
      }, m = () => e.value, S = c.getVNode(), V = () => S, M = () => o.value;
      return {
        check: a,
        reset: g,
        dispose: h,
        getVNode: () => w(
          () => l.getVNode(
            {
              fieldKey: i,
              getErrorMessage: M,
              getCurrentValue: m,
              class: s.class
            },
            { formField: V }
          )
        )
      };
    },
    r.defaultValue
  );
}
function te(r, s) {
  const e = s.min ?? 0, u = s.max;
  return j(
    (t, d, i, l) => {
      const c = `${d}_REP`, v = s?.template ?? i.repeat, o = {}, a = (n) => (o[n] === void 0 && (o[n] = r.new(
        T({
          get: () => n in t.value ? t.value[n] : r.defaultValue,
          set: (k) => {
            n >= t.value.length || (t.value[n] = k);
          }
        }),
        `${c}-${n}`,
        i,
        l
      )), o[n]), g = D(), {
        formFieldInstances: h
      } = g.run(() => {
        const n = P([]);
        return z(
          () => t.value.length,
          (k) => {
            n.value = Array.from({ length: k }).map(
              (f, I) => a(I)
            );
          },
          { immediate: !0 }
        ), {
          formFieldInstances: n
        };
      }), m = () => {
        const n = [], k = [];
        for (let f = 0; f < h.value.length; f++) {
          const C = h.value[f].check();
          O(C) ? k.push(...b(C)) : n.push(b(C));
        }
        return U(k, 1) ? _(k) : R(n);
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
      }, M = () => t.value, F = {}, p = () => h.value.map(
        (n, k) => (F[k] === void 0 && (F[k] = n.getVNode()), F[k])
      ), y = () => h.value.length, E = () => {
        t.value.length >= u || t.value.push(
          A(r.defaultValue)
        );
      }, L = (n) => {
        t.value.length <= e || t.value.splice(n, 1);
      }, $ = (n) => {
        n in t.value && (h.value[n]?.reset(), t.value[n] = A(r.defaultValue));
      };
      return {
        check: m,
        reset: S,
        dispose: V,
        getVNode: () => w(
          () => v.getVNode(
            {
              fieldKey: c,
              getFormFields: p,
              getFormFieldsQuantity: y,
              getCurrentValue: M,
              max: u,
              min: e,
              onAddElement: E,
              onRemoveElement: L,
              onResetElement: $,
              class: s.class
            },
            {
              formField: p
            }
          )
        )
      };
    },
    Array.from({ length: e }).fill(r.defaultValue)
  );
}
function ne(r, s) {
  const e = Object.fromEntries(r), u = Object.keys(e);
  return j(
    (t, d, i, l) => {
      const c = `${d}_UNI`, v = s?.template ?? i.union;
      let o = {};
      const a = {}, g = D(), {
        formFieldInstances: h
      } = g.run(() => (z(
        t,
        () => {
          t.value.updateKind = (n, ...k) => {
            o[t.value.kind] = t.value.value;
            const f = k.length === 1 ? k[0] : n in o ? o[n] : A(
              e[n].defaultValue
            );
            t.value.kind = n, t.value.value = f;
          }, o = {};
        },
        {
          immediate: !0
        }
      ), {
        formFieldInstances: Object.fromEntries(
          r.map(
            ([n, k]) => [
              n,
              () => (a[n] === void 0 && (a[n] = k.new(
                T({
                  get: () => n === t.value.kind ? t.value.value : e[n].defaultValue,
                  set: (f) => {
                    n === t.value.kind && (t.value.value = f);
                  }
                }),
                `${c}-${n}`,
                i,
                l
              )), a[n])
            ]
          )
        )
      })), m = () => {
        const N = h[t.value.kind]().check();
        return O(N) ? N : R({
          kind: t.value.kind,
          value: b(N)
        });
      }, S = () => {
        o = {}, Object.entries(a).forEach(
          ([, N]) => {
            N.reset();
          }
        );
      }, V = () => {
        g.stop(), Object.entries(a).forEach(
          ([, N]) => {
            N.dispose();
          }
        );
      }, M = () => t.value, F = {}, p = Object.fromEntries(
        Object.entries(h).map(
          ([N, n]) => [
            N,
            () => (F[N] === void 0 && (F[N] = n().getVNode()), F[N])
          ]
        )
      ), y = () => p[t.value.kind](), E = () => t.value.kind, L = (N) => {
        e[N] !== void 0 && t.value.updateKind(N);
      };
      return {
        check: m,
        reset: S,
        dispose: V,
        getVNode: () => w(
          () => v.getVNode(
            {
              fieldKey: c,
              kinds: u,
              getCurrentValue: M,
              getCurrentKind: E,
              onChangeKind: L,
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
function se(r, s) {
  return j(
    (e, u, t, d) => {
      const i = `${u}_STP`, l = s?.template ?? t.step, c = {}, v = D(), {
        formFieldInstances: o,
        errorMessageNotAtLastStep: a
      } = v.run(() => {
        const f = P(null);
        return {
          formFieldInstances: r.map(
            (C, K) => (() => (c[K] === void 0 && (c[K] = C.new(
              T({
                get: () => e.value.steps[K],
                set: (H) => {
                  e.value.steps[K] = H;
                }
              }),
              `${i}-${K}`,
              t,
              d
            )), c[K]))
          ),
          errorMessageNotAtLastStep: f
        };
      }), g = () => {
        const f = [], I = [];
        if (y() !== !0)
          return a.value = s.errorMessageNotAtLastStep, _([{ key: i }]);
        let C;
        for (let K = 0; K < o.length; K++) {
          const Q = o[K]().check();
          O(Q) ? (C === void 0 && (C = K), I.push(...b(Q))) : f.push(b(Q));
        }
        return C !== void 0 && (e.value.currentStep = C), U(I, 1) ? _(I) : R(f);
      }, h = () => {
        Object.values(c).forEach(
          (f) => {
            f.reset();
          }
        );
      }, m = () => {
        v.stop(), Object.values(c).forEach(
          (f) => {
            f.dispose();
          }
        );
      }, S = () => e.value, V = {}, M = o.map(
        (f, I) => () => (V[I] === void 0 && (V[I] = f().getVNode()), V[I])
      ), F = () => M, p = () => e.value.currentStep, y = () => q(r, e.value.currentStep), E = () => M[e.value.currentStep](), L = () => a.value, $ = () => {
        a.value = null;
        const f = o[e.value.currentStep]().check();
        if (O(f))
          return;
        const I = e.value.currentStep + 1;
        e.value.steps[I] !== void 0 && (e.value.currentStep = I);
      }, N = () => {
        a.value = null;
        const f = e.value.currentStep - 1;
        e.value.steps[f] !== void 0 && (e.value.currentStep = f);
      }, n = () => {
        a.value = null, o[e.value.currentStep]().reset(), e.value.steps[e.value.currentStep] = A(
          r[e.value.currentStep]?.defaultValue
        );
      };
      return {
        check: g,
        reset: h,
        dispose: m,
        getVNode: () => w(
          () => l.getVNode(
            {
              fieldKey: i,
              stepQuantity: r.length,
              getFormFields: F,
              getCurrentValue: S,
              getCurrentStep: p,
              isLastStep: y,
              getErrorMessageNotAtLastStep: L,
              onNextStep: $,
              onPreviousStep: N,
              onResetStep: n,
              class: s.class
            },
            {
              formField: E
            }
          )
        )
      };
    },
    {
      currentStep: 0,
      steps: r.map(
        (e) => e.defaultValue
      )
    }
  );
}
function re(r, s) {
  return j(
    (e, u, t, d) => {
      const i = `${u}_SEC`, l = s?.template ?? t.section, c = r.new(
        e,
        i,
        t,
        d
      ), v = () => c.check(), o = () => {
        c.reset();
      }, a = () => {
        c.dispose();
      }, g = c.getVNode(), h = () => g, m = () => e.value;
      return {
        check: v,
        reset: o,
        dispose: a,
        getVNode: () => w(
          () => l.getVNode(
            {
              fieldKey: i,
              getCurrentValue: m,
              title: s?.title,
              class: s?.class
            },
            {
              formField: h
            }
          )
        )
      };
    },
    r.defaultValue
  );
}
function oe(r, s) {
  if (B.has(s)) {
    const e = s;
    return j(
      (u, t, d, i) => {
        const l = `${t}_SLT`, c = e.new(
          u,
          l,
          d,
          i
        ), v = () => c.check(), o = () => {
          c.reset();
        }, a = () => {
          c.dispose();
        }, g = c.getVNode(), h = () => g, m = (V) => {
          u.value = V;
        };
        return {
          check: v,
          reset: o,
          dispose: a,
          getVNode: () => w(
            () => i(
              r,
              {
                fieldKey: l,
                get value() {
                  return u.value;
                },
                update: m,
                formField: h
              }
            )
          )
        };
      },
      e.defaultValue
    );
  }
  return j(
    (e, u, t, d) => {
      const i = `${u}_SLT`, l = () => R(e.value), c = () => {
      }, v = () => {
      }, o = (g) => {
        e.value = g;
      };
      return {
        check: l,
        reset: c,
        dispose: v,
        getVNode: () => w(
          () => d(
            r,
            {
              fieldKey: i,
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
export {
  Y as createForm,
  j as createFormField,
  ie as createInput,
  de as createTemplate,
  ae as createVueFormKind,
  B as formFieldKind,
  ve as templateKind,
  ee as useCheckLayout,
  x as useDisabledLayout,
  Z as useMultiLayout,
  te as useRepeatLayout,
  re as useSectionLayout,
  oe as useSlotLayout,
  se as useStepLayout,
  ne as useUnionLayout
};
