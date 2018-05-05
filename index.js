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
  const keySet = new Set(keys);
  obj = Object.assign({}, obj);
  
  if (unordered === "trim") {
    for (const key of Object.keys(obj)) {
      if (!keySet.has(key)) {
        delete obj[key];
      }
    }
  } else if (unordered === "start") {
    const addKeys = Object.keys(obj).filter(k => !keySet.has(k));
    keys = addKeys.concat(keys);
    for (const key of addKeys) {
      keySet.add(key);
    }
  } else if (unordered === "end") {
    const addKeys = Object.keys(obj).filter(k => !keySet.has(k));
    keys = keys.concat(addKeys);
    for (const key of addKeys) {
      keySet.add(key);
    }
  } else if (unordered === "keep") {
    const addKeys = [];
    // record index of each missing key
    Object.keys(obj).forEach((key, index) => {
      if (!keySet.has(key)) {
        addKeys.push({key, index});
      }
    });
    // zip them to a new array
    const newKeys = [];
    for (let i = 0, ik = 0, ia = 0; ia < addKeys.length || ik < keys.length; i++) {
      if (ia < addKeys.length && (addKeys[ia].index === i || ik >= keys.length)) {
        newKeys.push(addKeys[ia].key);
        ia++;
      } else {
        newKeys.push(keys[ik]);
        ik++;
      }
    }
    keys = newKeys;
    for (const {key} of addKeys) {
      keySet.add(key);
    }
  } else if (unordered) {
    throw new Error(`Invalid argument "unordered": ${unordered}`);
  }
  
  return new Proxy(obj, {
    set: (target, prop, value) => {
      if (!keySet.has(prop)) {
        keys.push(prop);
        keySet.add(prop);
      }
      target[prop] = value;
      return true;
    },
    deleteProperty: (target, prop) => {
      const i = keys.indexOf(prop);
      if (i >= 0) {
        keys.splice(i, 1);
      }
      keySet.delete(prop);
      delete target[prop];
      return true;
    },
    ownKeys: () => {
      return keys;
    }
  });
}

module.exports = {wrap, create};
