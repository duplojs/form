import { unwrap as k } from "@duplojs/utils";
import { c as H } from "./kind-DwvbGHaV.js";
import { ref as b, effectScope as C, watch as D, h as R } from "vue";
const S = H("form-field");
function U(e, n) {
  return S.setTo(
    {
      new: e,
      defaultValue: n
    },
    {}
  );
}
const W = "@duplojs/utils/kind/";
function j(e) {
  const n = `${W}${e}`;
  return {
    definition: {
      name: e,
      value: null
    },
    runTimeKey: n,
    addTo(t, s = null) {
      return {
        ...t,
        [n]: s
      };
    },
    setTo(t, s = null) {
      return t[n] = s, t;
    },
    has(t) {
      return t && (typeof t == "object" || typeof t == "function") && n in t;
    },
    getValue(t) {
      return t[n];
    }
  };
}
function q(e) {
  return (n) => j(`@${e}/${n}`);
}
function te(e, n, t) {
  const s = j(e), u = n instanceof Array ? n : [n], c = t ?? class {
  }, l = class extends c {
    constructor(r = {}, i = []) {
      super(...i);
      for (const f of u)
        this[f.runTimeKey] = r[f.definition.name] ?? null;
    }
    static [Symbol.hasInstance](r) {
      if (!s.has(r))
        return !1;
      for (const i of u)
        if (!i.has(r))
          return !1;
      return !0;
    }
  };
  return u.forEach((r) => {
    l.prototype[r.runTimeKey] = null;
  }), l.prototype[s.runTimeKey] = null, l;
}
const a = q(
  // @ts-expect-error reserved kind namespace
  "DuplojsUtilsEither"
), y = a("information"), m = "@duplojs/utils/value";
function N(e) {
  return {
    [m]: e
  };
}
function A(e) {
  return !!e && typeof e == "object" && m in e;
}
const $ = a("left");
function _(e, n = void 0) {
  return $.setTo(y.setTo(N(n), e));
}
function E(e) {
  return $.has(e) && y.has(e) && A(e);
}
const z = a("right");
function B(e, n = void 0) {
  return z.setTo(y.setTo(N(n), e));
}
const G = a("error");
function J(e) {
  return G.setTo(_("error", e));
}
const O = a("success");
function Q(e) {
  return O.setTo(B("success", e));
}
function ne(e, n) {
  return (t = {}) => {
    const s = t.defaultValue !== void 0 ? typeof t.defaultValue == "function" ? t.defaultValue() : t.defaultValue : typeof n.defaultValue == "function" ? n.defaultValue() : n.defaultValue, u = typeof t.props == "function" ? t.props : () => t.props, c = t.label, l = typeof c == "string" ? () => c : c;
    return U(
      (r, i, f) => {
        const d = `${i}_INP`, w = t?.template ?? n.template ?? f.input;
        let K = !1;
        const p = b(null), v = C(), { errorMessage: g } = v.run(() => {
          const o = b(null);
          return D(
            r,
            () => {
              o.value !== null && V();
            },
            { flush: "post" }
          ), {
            errorMessage: o
          };
        }), V = () => {
          const o = p.value?.check?.() || Q(r.value);
          if (t.dataParser === void 0 || E(o))
            return o;
          const P = k(o), h = t.dataParser.parse(P);
          if (E(h)) {
            const T = k(h);
            return g.value = T.issues[0]?.message ?? "Error", J(
              [
                {
                  key: d,
                  dataParserError: T
                }
              ]
            );
          }
          return g.value = null, h;
        }, x = () => {
          p.value?.reset?.(), g.value = null;
        }, F = () => {
          v.stop(), K = !0, p.value?.dispose?.();
        }, I = () => r.value, L = () => R(
          e,
          {
            ...n.props,
            ...u(),
            modelValue: r.value,
            "onUpdate:modelValue": (o) => {
              K || (r.value = o);
            },
            id: d,
            key: d,
            ref: p
          }
        ), M = t.dataParser && (() => g.value);
        return {
          check: V,
          reset: x,
          dispose: F,
          getVNode: () => w.getVNode(
            {
              getLabel: l,
              fieldKey: d,
              getCurrentValue: I,
              getErrorMessage: M,
              class: t.class
            },
            {
              input: L
            }
          )
        };
      },
      s
    );
  };
}
export {
  ne as a,
  y as b,
  U as c,
  A as d,
  J as e,
  S as f,
  B as g,
  a as h,
  E as i,
  q as j,
  m as k,
  _ as l,
  te as m,
  j as n,
  z as r,
  Q as s
};
