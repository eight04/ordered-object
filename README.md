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

### create(object, keys = Object.keys(object)): OrderedObject

Return an object whose keys are ordered.

* `object`: an object, which can also be an ordered-keys object (proxy).
* `keys`: keys of the object. If `object` has a `property` which is not included in `keys`, `Object.keys(OrderedObject)` won't contain the property either. However it can still be accessed from `OrderedObject.property`.

### wrap(object): OrderedObject

Recursively convert entire `object` into `OrderedObject` with `create`.

Notes
-----

* https://stackoverflow.com/questions/30076219/does-es6-introduce-a-well-defined-order-of-enumeration-for-object-properties

Changelog
---------

* 0.1.0 (Next)

    - First release.
