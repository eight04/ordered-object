function wrap(obj) {
  if (typeof obj === "object") {
    if (Array.isArray(obj)) {
      obj = obj.map(wrap);
    } else {
      obj = create(obj);
      for (const key of Object.keys(obj)) {
        obj[key] = wrap(obj[key]);
      }
    }
  }
  return obj;
}

function create(obj, keys = Object.keys(obj)) {
  if (obj.__raw__) {
    obj = obj.__raw__;
  }
  return new Proxy(obj, {
    get: (target, prop) => {
      if (prop === "__raw__") {
        return target;
      }
      return target[prop];
    },
    set: (target, prop, value) => {
      if (!(prop in target)) {
        keys.push(prop);
      }
      target[prop] = value;
      return true;
    },
    deleteProperty: (target, prop) => {
      if (prop in target) {
        const i = keys.indexOf(prop);
        if (i >= 0) {
          keys.splice(i, 1);
        }
        delete target[prop];
      }
      return true;
    },
    ownKeys: () => {
      return keys;
    }
  });
}

module.exports = {wrap, create};
