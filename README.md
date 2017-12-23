ordered-object
==============

An experimental module to maintain the order of object properties.

Installation
------------

```
npm install ordered-object
```

Usage
-----

```js
const orderedObject = require("ordered-json");

const obj = {a: 1, b: 2, c: 3};
Object.values(obj); // [1, 2, 3]

const obj2 = orderedObject.create(obj, ["c", "b", "a"]);
Object.values(obj2); // [3, 2, 1]
```

API reference
-------------

### create(object, keys = Object.keys(object), unordered = null): OrderedObject

Return an object whose keys are ordered.

* `object`: an object, which can also be an ordered-keys object (proxy).
* `keys`: keys of the object. If `object` has a `property` which is not included in `keys`, `Object.keys(OrderedObject)` won't contain the property either. However it can still be accessed from `OrderedObject.property`.

* `unordered`: if provided, do some extra normalization to unordered properties (i.e. not occured in `keys`). Possible values are:

  - `trim`: trim unordered properties.
  - `start`: move unordered properties to the start.
  - `end`: move unordered properties to the end.
  
  - `keep`: keep the position (index) of unordered properties. With this option, you can only reorder the properties occured in `keys`. For example:
    
    ```js
    const obj = create({a: 1, b: 2, c: 3}, ["c", "a"], "keep");
    Object.keys(obj); // ["c", "b", "a"]
    ```

### wrap(object): OrderedObject

Recursively convert entire `object` into `OrderedObject` with `create`.

Notes
-----

* https://stackoverflow.com/questions/30076219/does-es6-introduce-a-well-defined-order-of-enumeration-for-object-properties

Changelog
---------

* 0.2.0 (Dec 23, 2017)

  - Add: `unordered` argument to `create()`.
  - **Change: Always create a new object in `create()`.**
  - **Remove `__raw__` property.**

* 0.1.0 (Dec 14, 2017)

  - First release.
