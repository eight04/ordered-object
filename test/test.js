/* eslint-env mocha */
const assert = require("power-assert");
const {wrap, create} = require("../index");

describe("create", () => {
  it("customized keys order", () => {
    const obj = {a: 1, b: 2, c: 3};
    const ordered = create(obj, ["c", "b", "a"]);
    assert.deepEqual(Object.values(ordered), [3, 2, 1]);
  });
  
  it("Object.keys should be cloned", () => {
    const obj = {a: 1, b: 2, c: 3};
    const order = ["c", "b", "a"];
    const obj2 = create(obj, order);
    assert(Object.keys(obj2) !== order);
  });
  
  it("the object should be cloned", () => {
    const obj = {a: 1, b: 2, c: 3};
    const obj2 = create(obj, ["c", "b", "a"]);
    obj2.a = 4;
    assert(obj.a === 1);
  });
});

describe("unordered property", () => {
  const obj = {a: 1, b: 2, c: 3};
  
  it("trim", () => {
    const obj2 = create(obj, ["c", "a"], "trim");
    assert.deepEqual(Object.values(obj2), [3, 1]);
  });
  
  it("start", () => {
    const obj2 = create(obj, ["c", "a"], "start");
    assert.deepEqual(Object.values(obj2), [2, 3, 1]);
  });
  
  it("end", () => {
    const obj2 = create(obj, ["c", "a"], "end");
    assert.deepEqual(Object.values(obj2), [3, 1, 2]);
  });
  
  it("keep", () => {
    const obj2 = create(obj, ["c", "a"], "keep");
    assert.deepEqual(Object.values(obj2), [3, 2, 1]);
  });
});

describe("wrap", () => {
  it("deep-wrap the object", () => {
    const obj = wrap({a: {b: 1}});
    obj.a.c = 2;
    obj.a.d = 3;
    delete obj.a.b;
    assert.deepEqual(Object.values(obj.a), [2, 3]);
  });
});
