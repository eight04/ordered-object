/* eslint-env mocha */
const assert = require("power-assert");
const {wrap, create} = require("../index");

describe("create", () => {
  it("customized keys order", () => {
    const obj = {a: 1, b: 2, c: 3};
    const ordered = create(obj, ["c", "b", "a"]);
    assert.deepEqual(Object.values(ordered), [3, 2, 1]);
  });
  
  it("access __raw__", () => {
    const obj = {a: 1, b: 2, c: 3};
    const ordered = create(obj, ["c", "b", "a"]);
    assert(!obj.__raw__);
    assert(obj === ordered.__raw__);
  });
  
  it("don't nest Proxy", () => {
    const obj = {a: 1, b: 2, c: 3};
    const obj2 = create(obj, ["c", "b", "a"]);
    const obj3 = create(obj2, ["b", "a", "c"]);
    assert(obj === obj3.__raw__);
    assert.deepEqual(Object.values(obj2), [3, 2, 1]);
    assert.deepEqual(Object.values(obj3), [2, 1, 3]);
  });
});

describe("wrap", () => {
  it("deep-wrap the object", () => {
    const obj = wrap({a: {b: 1}});
    assert(obj.__raw__);
    assert(obj.a.__raw__);
  });
});
