const clamp = (val, min, max) => {
  return Math.max(Math.min(val, max), min);
};

const getScore = (modules) => {
  let val = modules.Number.value;
  Object.keys(modules).forEach((modulekey) => {
    const module = modules[modulekey];

    if (module.multi !== undefined) {
      val = val * module.multi;
    }
  });

  if (val < 0) return "???";
  return Math.round(val);
};

export { clamp };
export { getScore };
