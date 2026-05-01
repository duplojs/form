import { c as l } from "./kind-DwvbGHaV.js";
import { h as r, normalizeClass as m } from "vue";
const i = l("template");
function d(a, o, t) {
  return (s) => i.setTo(
    {
      getVNode: (e, c) => r(
        o,
        {
          ...t?.props,
          ...s,
          ...e,
          class: m([
            t?.props?.class,
            s?.class,
            e.class,
            `DFV-template_${a} DFV-deep_${e.fieldKey}`
          ])
        },
        c
      )
    }
  );
}
export {
  d as c,
  i as t
};
