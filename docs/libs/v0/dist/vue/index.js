import { a as H, b as J } from "./template-CsT6QvVe.js";
import { c as ge, t as he } from "./template-CsT6QvVe.js";
import { ref as k, h as j, effectScope as w, computed as W, watch as Q } from "vue";
function _(...e) {
  if (e.length === 1) {
    const [o] = e;
    return (n) => _(n, o);
  }
  const [s, t] = e;
  return s.length >= t;
}
const P = "@duplojs/utils/value";
function z(e) {
  return {
    [P]: e
  };
}
function X(e) {
  return !!e && typeof e == "object" && P in e;
}
function V(e) {
  return e && typeof e == "object" && P in e ? e[P] : e;
}
function B(...e) {
  if (e.length === 1) {
    const [o] = e;
    return (n) => B(n, o);
  }
  const [s, t] = e;
  return s.length - 1 === t;
}
const U = H(
  // @ts-expect-error reserved kind namespace
  "DuplojsUtilsEither"
), q = U("information"), G = U("left");
function Y(e, s = void 0) {
  return G.setTo(q.setTo(z(s), e));
}
function M(e) {
  return G.has(e) && q.has(e) && X(e);
}
const Z = U("right");
function x(e, s = void 0) {
  return Z.setTo(q.setTo(z(s), e));
}
const ee = U("error");
function D(e) {
  return ee.setTo(Y("error", e));
}
const te = U("success");
function R(e) {
  return te.setTo(x("success", e));
}
function L(e) {
  if (e) {
    if (typeof e != "object")
      return e;
    if (e.constructor === void 0 || e.constructor.name === "Object") {
      const s = {};
      for (const t in e) {
        const o = Object.getOwnPropertyDescriptor(e, t);
        o?.set || o?.get ? Object.defineProperty(s, t, o) : s[t] = L(e[t]);
      }
      return s;
    } else return e instanceof Array && e.constructor.name === "Array" ? e.map(L) : e;
  } else return e;
}
const ne = J("form-field");
function A(e, s) {
  return ne.setTo(
    {
      new: e,
      defaultValue: s
    },
    {}
  );
}
function oe(e, s) {
  return (t = {}) => {
    const o = t.defaultValue !== void 0 ? typeof t.defaultValue == "function" ? t.defaultValue() : t.defaultValue : typeof s.defaultValue == "function" ? s.defaultValue() : s.defaultValue, n = typeof t.props == "function" ? t.props : () => t.props;
    return A(
      (i, l, g) => {
        const c = t?.template ?? s.template ?? g.input;
        let a = !1;
        const v = k(null), F = () => v.value?.check ? v.value.check() : R(i.value), I = () => {
          v.value?.reset?.();
        }, S = () => {
          a = !0, v.value?.dispose?.();
        }, m = () => i.value, b = j(
          () => j(
            e,
            {
              ...s.props,
              ...n(),
              modelValue: i.value,
              "onUpdate:modelValue": (h) => {
                a || (i.value = h);
              },
              id: l,
              key: l,
              ref: v
            }
          )
        ), d = () => b;
        return {
          check: F,
          reset: I,
          dispose: S,
          getVNode: () => j(
            () => c.getVNode(
              {
                fieldKey: l,
                getCurrentValue: m
              },
              {
                input: d
              }
            )
          )
        };
      },
      o
    );
  };
}
function ce(e) {
  return (s, t = {}) => {
    const o = t.template ?? e.form, n = k(L(s.defaultValue)), i = s.new(
      n,
      "form-field",
      e
    ), l = () => i.check(), g = () => {
      i.reset(), n.value = L(s.defaultValue);
    }, c = () => {
      i.dispose();
    }, a = () => n.value, v = i.getVNode();
    return {
      currentValue: n,
      component: (I, { slots: S }) => j(
        () => o.getVNode(
          {
            ...I,
            fieldKey: "form",
            onSubmit: () => {
            },
            getCurrentValue: a
          },
          {
            submitter: S.default ?? (() => null),
            formField: () => v
          }
        )
      ),
      reset: g,
      dispose: c,
      check: l
    };
  };
}
function ue(e, s) {
  const t = e instanceof Array ? e : Object.entries(e);
  return A(
    (o, n, i) => {
      const l = s?.template ?? i.multi, g = w(), { formFieldInstanceEntries: c } = g.run(() => ({
        formFieldInstanceEntries: t.map(
          ([f, h]) => [
            f,
            h.new(
              W({
                get: () => o.value[f],
                set: (E) => {
                  o.value[f] = E;
                }
              }),
              `${n}-${f}`,
              i
            )
          ]
        )
      })), a = () => {
        const d = {}, f = [];
        for (let h = 0; h < c.length; h++) {
          const [E, y] = c[h], O = y.check();
          M(O) ? f.push(...V(O)) : d[E] = V(O);
        }
        return _(f, 1) ? D(f) : R(d);
      }, v = () => {
        c.forEach(
          ([, d]) => {
            d.reset();
          }
        );
      }, F = () => {
        g.stop(), c.forEach(
          ([, d]) => {
            d.dispose();
          }
        );
      }, I = () => o.value, S = c.map(
        (d) => d[1].getVNode()
      ), m = () => S;
      return {
        check: a,
        reset: v,
        dispose: F,
        getVNode: () => j(
          () => l.getVNode(
            {
              fieldKey: n,
              getFormFields: m,
              getCurrentValue: I
            },
            {
              formField: m
            }
          )
        )
      };
    },
    t.reduce(
      (o, n) => (o[n[0]] = n[1].defaultValue, o),
      {}
    )
  );
}
function ie(e, s) {
  return A(
    (t, o, n) => {
      const i = e.new(
        t,
        o,
        n
      ), l = () => s.isDisabled() ? R(void 0) : i.check(), g = () => {
        i.reset();
      }, c = () => {
        i.dispose();
      }, a = i.getVNode();
      return {
        check: l,
        reset: g,
        dispose: c,
        getVNode: () => j(
          () => s.isDisabled() ? null : a
        )
      };
    },
    e.defaultValue
  );
}
function le(e, s) {
  return A(
    (t, o, n) => {
      const i = s?.template ?? n.check, l = e.new(
        t,
        o,
        n
      ), g = w(), { errorMessage: c } = g.run(() => {
        const f = k(null);
        return Q(
          t,
          () => {
            f.value !== null && a();
          },
          { flush: "post" }
        ), {
          errorMessage: f
        };
      }), a = () => {
        const f = l.check();
        if (M(f))
          return f;
        const h = s.dataParser.parse(
          V(f)
        );
        if (M(h)) {
          const E = V(h);
          return c.value = E.issues[0]?.source.definition.errorMessage ?? "Error", D(
            [
              {
                key: o,
                dataParserError: E
              }
            ]
          );
        }
        return c.value = null, h;
      }, v = () => {
        l.reset(), c.value = null;
      }, F = () => {
        g.stop(), l.dispose();
      }, I = () => t.value, S = l.getVNode(), m = () => S, b = () => c.value;
      return {
        check: a,
        reset: v,
        dispose: F,
        getVNode: () => j(
          () => i.getVNode(
            {
              fieldKey: o,
              getErrorMessage: b,
              getCurrentValue: I
            },
            { formField: m }
          )
        )
      };
    },
    e.defaultValue
  );
}
function ae(e, s) {
  const t = s.min ?? 0, o = s.max;
  return A(
    (n, i, l) => {
      const g = s?.template ?? l.repeat, c = {}, a = (r) => (c[r] === void 0 && (c[r] = e.new(
        W({
          get: () => r in n.value ? n.value[r] : e.defaultValue,
          set: (u) => {
            r >= n.value.length || (n.value[r] = u);
          }
        }),
        `${i}-${r}`,
        l
      )), c[r]), v = w(), {
        formFieldInstances: F
      } = v.run(() => {
        const r = k([]);
        return Q(
          () => n.value.length,
          (u) => {
            r.value = Array.from({ length: u }).map(
              (K, p) => a(p)
            );
          },
          { immediate: !0 }
        ), {
          formFieldInstances: r
        };
      }), I = () => {
        const r = [], u = [];
        for (let K = 0; K < F.value.length; K++) {
          const N = F.value[K].check();
          M(N) ? u.push(...V(N)) : r.push(V(N));
        }
        return _(u, 1) ? D(u) : R(r);
      }, S = () => {
        Object.entries(c).forEach(
          ([, r]) => {
            r.reset();
          }
        );
      }, m = () => {
        v.stop(), Object.entries(c).forEach(
          ([, r]) => {
            r.dispose();
          }
        );
      }, b = () => n.value, d = {}, f = () => F.value.map(
        (r, u) => (d[u] === void 0 && (d[u] = r.getVNode()), d[u])
      ), h = () => {
        n.value.length >= o || n.value.push(
          L(e.defaultValue)
        );
      }, E = (r) => {
        n.value.length <= t || n.value.splice(r, 1);
      }, y = (r) => {
        r in n.value && (F.value[r]?.reset(), n.value[r] = L(e.defaultValue));
      };
      return {
        check: I,
        reset: S,
        dispose: m,
        getVNode: () => j(
          () => g.getVNode(
            {
              fieldKey: i,
              getFormFields: f,
              getCurrentValue: b,
              max: o,
              min: t,
              onAddElement: h,
              onRemoveElement: E,
              onResetElement: y
            },
            {
              formField: f
            }
          )
        )
      };
    },
    Array.from({ length: t }).fill(e.defaultValue)
  );
}
function fe(e, s) {
  const t = Object.fromEntries(e), o = Object.keys(t);
  return A(
    (n, i, l) => {
      const g = s?.template ?? l.union;
      let c = {};
      const a = {}, v = w(), {
        formFieldInstances: F
      } = v.run(() => (Q(
        n,
        () => {
          n.value.updateKind = (u, ...K) => {
            c[n.value.kind] = n.value.value;
            const p = K.length === 1 ? K[0] : u in c ? c[u] : L(
              t[u].defaultValue
            );
            n.value.kind = u, n.value.value = p;
          };
        },
        {
          flush: "sync",
          immediate: !0
        }
      ), {
        formFieldInstances: Object.fromEntries(
          e.map(
            ([u, K]) => [
              u,
              () => (a[u] === void 0 && (a[u] = K.new(
                W({
                  get: () => u === n.value.kind ? n.value.value : t[u].defaultValue,
                  set: (p) => {
                    u === n.value.kind && (n.value.value = p);
                  }
                }),
                `${i}-${u}`,
                l
              )), a[u])
            ]
          )
        )
      })), I = () => {
        const r = F[n.value.kind]().check();
        return M(r) ? r : R({
          kind: n.value.kind,
          value: V(r)
        });
      }, S = () => {
        c = {}, Object.entries(a).forEach(
          ([, r]) => {
            r.reset();
          }
        );
      }, m = () => {
        v.stop(), Object.entries(a).forEach(
          ([, r]) => {
            r.dispose();
          }
        );
      }, b = () => n.value, d = {}, f = Object.fromEntries(
        Object.entries(F).map(
          ([r, u]) => [
            r,
            () => (d[r] === void 0 && (d[r] = u().getVNode()), d[r])
          ]
        )
      ), h = () => f[n.value.kind](), E = () => n.value.kind, y = (r) => {
        t[r] !== void 0 && n.value.updateKind(r);
      };
      return {
        check: I,
        reset: S,
        dispose: m,
        getVNode: () => j(
          () => g.getVNode(
            {
              fieldKey: i,
              kinds: o,
              getCurrentValue: b,
              getCurrentKind: E,
              onChangeKind: y
            },
            {
              formField: h
            }
          )
        )
      };
    },
    {
      kind: s.defaultKind,
      value: t[s.defaultKind].defaultValue,
      updateKind: () => {
      }
    }
  );
}
function de(e, s) {
  return A(
    (t, o, n) => {
      const i = s?.template ?? n.step, l = {}, g = w(), {
        formFieldInstances: c,
        errorMessageNotAtLastStep: a
      } = g.run(() => {
        const p = k(null);
        return {
          formFieldInstances: e.map(
            ($, C) => (() => (l[C] === void 0 && (l[C] = $.new(
              W({
                get: () => t.value.steps[C],
                set: (T) => {
                  t.value.steps[C] = T;
                }
              }),
              `${o}-${C}`,
              n
            )), l[C]))
          ),
          errorMessageNotAtLastStep: p
        };
      }), v = () => {
        const p = [], N = [];
        if (h() !== !0)
          return a.value = s.errorMessageNotAtLastStep, D([{ key: o }]);
        for (let $ = 0; $ < c.length; $++) {
          const T = c[$]().check();
          M(T) ? N.push(...V(T)) : p.push(V(T));
        }
        return _(N, 1) ? D(N) : R(p);
      }, F = () => {
        Object.values(l).forEach(
          (p) => {
            p.reset();
          }
        );
      }, I = () => {
        g.stop(), Object.values(l).forEach(
          (p) => {
            p.dispose();
          }
        );
      }, S = () => t.value, m = {}, b = c.map(
        (p, N) => () => (m[N] === void 0 && (m[N] = p().getVNode()), m[N])
      ), d = () => b, f = () => t.value.currentStep, h = () => B(e, t.value.currentStep), E = () => b[t.value.currentStep](), y = () => a.value, O = () => {
        a.value = null;
        const p = c[t.value.currentStep]().check();
        if (M(p))
          return;
        const N = t.value.currentStep + 1;
        t.value.steps[N] !== void 0 && (t.value.currentStep = N);
      }, r = () => {
        a.value = null;
        const p = t.value.currentStep - 1;
        t.value.steps[p] !== void 0 && (t.value.currentStep = p);
      }, u = () => {
        a.value = null, c[t.value.currentStep]().reset(), t.value.steps[t.value.currentStep] = L(
          e[t.value.currentStep]?.defaultValue
        );
      };
      return {
        check: v,
        reset: F,
        dispose: I,
        getVNode: () => j(
          () => i.getVNode(
            {
              fieldKey: o,
              stepQuantity: e.length,
              getFormFields: d,
              getCurrentValue: S,
              getCurrentStep: f,
              isLastStep: h,
              getErrorMessageNotAtLastStep: y,
              onNextStep: O,
              onPreviousStep: r,
              onResetStep: u
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
      steps: e.map(
        (t) => t.defaultValue
      )
    }
  );
}
export {
  ce as createForm,
  A as createFormField,
  oe as createInput,
  ge as createTemplate,
  J as createVueFormKind,
  ne as formFieldKind,
  he as templateKind,
  le as useCheckLayout,
  ie as useDisabledLayout,
  ue as useMultiLayout,
  ae as useRepeatLayout,
  de as useStepLayout,
  fe as useUnionLayout
};
