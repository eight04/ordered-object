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

function create(obj, keys = Object.keys(obj), unordered = null) {
  obj = Object.assign({}, obj);
  if (unordered) {
    const keySet = new Set(keys);
    if (unordered === "trim") {
      for (const key of Object.keys(obj)) {
        if (!keySet.has(key)) {
          delete obj[key];
        }
      }
    } else if (unordered === "start") {
      keys = Object.keys(obj).filter(k => !keySet.has(k)).concat(keys);
    } else if (unordered === "end") {
      keys = keys.concat(Object.keys(obj).filter(k => !keySet.has(k)));
    } else if (unordered === "keep") {
      let i = 0;
      keys = Object.keys(obj).map(key => {
        if (keySet.has(key)) {
          return keys[i++];
        }
        return key;
      });
    } else {
      throw new Error(`Invalid argument "unordered": ${unordered}`);
    }
  }
  return new Proxy(obj, {
    set: (target, prop, value) => {
      if (!(prop in target)) {
        keys.push(prop);
      }
      target[prop] = value;
      return true;
    },
    deleteProperty: (target, prop) => {
      const i = keys.indexOf(prop);
      if (i >= 0) {
        keys.splice(i, 1);
      }
      delete target[prop];
      return true;
    },
    ownKeys: () => {
      return keys;
    }
  });
}

module.exports = {wrap, create};
