import { h as l, normalizeClass as a } from "vue";
const u = "@duplojs/utils/kind/";
function c(n) {
  const t = `${u}${n}`;
  return {
    definition: {
      name: n,
      value: null
    },
    runTimeKey: t,
    addTo(e, r = null) {
      return {
        ...e,
        [t]: r
      };
    },
    setTo(e, r = null) {
      return e[t] = r, e;
    },
    has(e) {
      return e && (typeof e == "object" || typeof e == "function") && t in e;
    },
    getValue(e) {
      return e[t];
    }
  };
}
function i(n) {
  return (t) => c(`@${n}/${t}`);
}
const d = i(
  // @ts-expect-error reserved kind namespace
  "DuplojsVueForm"
), f = d("template");
function m(n, t, e) {
  return (r) => f.setTo({
    getVNode: (o, s) => l(
      t,
      {
        ...e?.props,
        ...r,
        ...o,
        class: a([
          e?.props?.class,
          r?.class,
          `DFV-template_${n} DFV-deep_${o.fieldKey}`
        ])
      },
      s
    )
  });
}
export {
  i as a,
  d as b,
  m as c,
  f as t
};
