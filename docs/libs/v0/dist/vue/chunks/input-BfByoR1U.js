import { unwrap as b } from "@duplojs/utils";
import { c as D } from "./kind-DwvbGHaV.js";
import { ref as E, effectScope as R, watch as S, h as y } from "vue";
const U = D("form-field");
function W(e, n) {
  return U.setTo(
    {
      new: e,
      defaultValue: n
    },
    {}
  );
}
const q = "@duplojs/utils/kind/";
function j(e) {
  const n = `${q}${e}`;
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
function A(e) {
  return (n) => j(`@${e}/${n}`);
}
function ne(e, n, t) {
  const o = j(e), u = n instanceof Array ? n : [n], c = t ?? class {
  }, i = class extends c {
    constructor(r = {}, l = []) {
      super(...l);
      for (const f of u)
        this[f.runTimeKey] = r[f.definition.name] ?? null;
    }
    static [Symbol.hasInstance](r) {
      if (!o.has(r))
        return !1;
      for (const l of u)
        if (!l.has(r))
          return !1;
      return !0;
    }
  };
  return u.forEach((r) => {
    i.prototype[r.runTimeKey] = null;
  }), i.prototype[o.runTimeKey] = null, i;
}
const a = A(
  // @ts-expect-error reserved kind namespace
  "DuplojsUtilsEither"
), K = a("information"), m = "@duplojs/utils/value";
function $(e) {
  return {
    [m]: e
  };
}
function _(e) {
  return !!e && typeof e == "object" && m in e;
}
const w = a("left");
function z(e, n = void 0) {
  return w.setTo(K.setTo($(n), e));
}
function N(e) {
  return w.has(e) && K.has(e) && _(e);
}
const B = a("right");
function G(e, n = void 0) {
  return B.setTo(K.setTo($(n), e));
}
const J = a("error");
function O(e) {
  return J.setTo(z("error", e));
}
const Q = a("success");
function X(e) {
  return Q.setTo(G("success", e));
}
function re(e, n) {
  return (t = {}) => {
    const o = t.defaultValue !== void 0 ? typeof t.defaultValue == "function" ? t.defaultValue() : t.defaultValue : typeof n.defaultValue == "function" ? n.defaultValue() : n.defaultValue, u = typeof t.props == "function" ? t.props : () => t.props, c = t.label, i = typeof c == "string" ? () => c : c;
    return W(
      (r, l, f) => {
        const d = `${l}_INP`, x = t?.template ?? n.template ?? f.input;
        let V = !1;
        const p = E(null), v = R(), { errorMessage: g } = v.run(() => {
          const s = E(null);
          return S(
            r,
            () => {
              s.value !== null && T();
            },
            { flush: "post" }
          ), {
            errorMessage: s
          };
        }), T = () => {
          const s = p.value?.check?.() || X(r.value);
          if (t.dataParser === void 0 || N(s))
            return s;
          const C = b(s), h = t.dataParser.parse(C);
          if (N(h)) {
            const k = b(h);
            return g.value = k.issues[0]?.message ?? "Error", O(
              [
                {
                  key: d,
                  dataParserError: k
                }
              ]
            );
          }
          return g.value = null, h;
        }, F = () => {
          p.value?.reset?.(), g.value = null;
        }, I = () => {
          v.stop(), V = !0, p.value?.dispose?.();
        }, L = () => r.value, M = y(
          () => y(
            e,
            {
              ...n.props,
              ...u(),
              modelValue: r.value,
              "onUpdate:modelValue": (s) => {
                V || (r.value = s);
              },
              id: d,
              key: d,
              ref: p
            }
          )
        ), P = () => M, H = t.dataParser && (() => g.value);
        return {
          check: T,
          reset: F,
          dispose: I,
          getVNode: () => y(
            () => x.getVNode(
              {
                getLabel: i,
                fieldKey: d,
                getCurrentValue: L,
                getErrorMessage: H,
                class: t.class
              },
              {
                input: P
              }
            )
          )
        };
      },
      o
    );
  };
}
export {
  re as a,
  K as b,
  W as c,
  _ as d,
  O as e,
  U as f,
  G as g,
  a as h,
  N as i,
  A as j,
  m as k,
  z as l,
  ne as m,
  j as n,
  B as r,
  X as s
};
