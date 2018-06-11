// non-recursive
const propsDiffer = (exports.propsDiffer = (seed, existing) =>
  Object.keys(seed).reduce(
    (differ, k) => (differ ? differ : typeof existing[k] !== 'undefined' && existing[k] !== seed[k]),
    false,
  ));

exports.splitByProp = (prop, seed, existing, differ = propsDiffer, merge = true) =>
  seed.reduce(
    ({ toCreate, toUpdate }, g) => {
      const e = existing.find(e => e[prop] === g[prop]);
      if (!e) {
        return {
          toCreate: [...toCreate, g],
          toUpdate,
        };
      }

      if (differ(g, e)) {
        return {
          toCreate,
          toUpdate: [...toUpdate, merge ? Object.assign(e, g) : g],
        };
      }

      return { toCreate, toUpdate };
    },
    { toCreate: [], toUpdate: [] },
  );
