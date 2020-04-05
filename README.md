Assert
======================================
### An assertion library with user-friendly error messages

[![Cross-Platform Compatibility](https://jstools.dev/img/badges/os-badges.svg)](https://github.com/JS-DevTools/assert/blob/master/.github/workflows/CI-CD.yaml)
[![Build Status](https://github.com/JS-DevTools/assert/workflows/CI-CD/badge.svg)](https://github.com/JS-DevTools/assert/blob/master/.github/workflows/CI-CD.yaml)

[![Coverage Status](https://coveralls.io/repos/github/JS-DevTools/assert/badge.svg?branch=master)](https://coveralls.io/github/JS-DevTools/assert)
[![Dependencies](https://david-dm.org/JS-DevTools/assert.svg)](https://david-dm.org/JS-DevTools/assert)

[![npm](https://img.shields.io/npm/v/@jsdevtools/assert.svg)](https://www.npmjs.com/package/@jsdevtools/assert)
[![License](https://img.shields.io/npm/l/@jsdevtools/assert.svg)](LICENSE)
[![Buy us a tree](https://img.shields.io/badge/Treeware-%F0%9F%8C%B3-lightgreen)](https://plant.treeware.earth/JS-DevTools/assert)



Features
--------------------------
- When an assertion succeeds, the value is returned. Useful for assertion + assignment.

- Throws appropriate error types for each assertion (e.g. `TypeError`, `RangeError`, etc.)

- Error messages include the invalid value, humanized and sanitized

- You can customize the field name used in error messages



Installation
--------------------------
You can install this library via [npm](https://docs.npmjs.com/about-npm/).

```bash
npm install @jsdevtools/assert
```



Usage
-------------------------------
The exported `assert` function supports fluent-like chaining with various assertion functions.  Each of the assertion functions returns the value if valid, or throws an error if invalid.


### `assert.value(value, [fieldName], [defaultValue])`
Asserts that a value that is not `undefined`. Any other value will pass, even `null` and `NaN`.

- **value** - The value to check
- **fieldName** - (optional) The name of the field being assertd. This is used in the error message if the assertion fails.
- **defaultValue** - (optional) The default value to use if `value` is `undefined`.

```javascript
import assert from "@jsdevtools/assert";

assert.value(0);                    // ✔
assert.value(false);                // ✔
assert.value(null);                 // ✔
assert.value(NaN);                  // ✔

assert.value(undefined);            // ❌ Invalid value: undefined. A value is required.
```


### `assert.value.oneOf(value, values, [fieldName], [defaultValue])`
Assets that a value that is one of the specified values.

- **value** - The value to check
- **values** - The allowed values
- **fieldName** - (optional) The name of the field being assertd. This is used in the error message if the assertion fails.
- **defaultValue** - (optional) The default value to use if `value` is `undefined`.

```javascript
import assert from "@jsdevtools/assert";

assert.value.oneOf("a", ["a", "b", "c"]);     // ✔
assert.value.oneOf(4, [1, 2, 3, 4, 5]);       // ✔
assert.value.oneOf(true, [1, true, "yes"]);   // ✔

assert.value.oneOf("b", ["x", "y", "z"]);     // ❌ Invalid value: "b". Expected "x", "y", or "z".
```


### `assert.type(value, type, [fieldName], [defaultValue])`
Asserts that a value is the specified type.

- **value** - The value to check
- **type** - The expected type. This can be a class, a primitive wrapper (e.g. `String`), `null`, or `undefined`
- **fieldName** - (optional) The name of the field being assertd. This is used in the error message if the assertion fails.
- **defaultValue** - (optional) The default value to use if `value` is `undefined`.

```javascript
import assert from "@jsdevtools/assert";

assert.type("John", String);          // ✔
assert.type(42, Number);              // ✔
assert.type(false, Boolean);          // ✔
assert.type(null, null);              // ✔
assert.type({ x: 1 }, Object);        // ✔
assert.type(/^regex$/, RegExp);       // ✔
assert.type(new Date(), Date);        // ✔

assert.type("Fred", Object);          // ❌ Invalid value: "Fred". Expected an Object.
assert.type(100, BigInt);             // ❌ Invalid value: 100. Expected a bigint.
assert.type(undefined, null);         // ❌ Invalid value: undefined. Expected null.
assert.type(null, Object);            // ❌ Invalid value: null. Expected an Object.
assert.type(new Date(), RangeError);  // ❌ Invalid value: Date. Expected a RangeError.
```


### `assert.type.oneOf(value, types, [fieldName], [defaultValue])`
Asserts that a value is one of the specified types.

- **value** - The value to check
- **types** - An array of the allowed types.
- **fieldName** - (optional) The name of the field being assertd. This is used in the error message if the assertion fails.
- **defaultValue** - (optional) The default value to use if `value` is `undefined`.

```javascript
import assert from "@jsdevtools/assert";

assert.type.oneOf("John", [Number, String, Boolean]);           // ✔
assert.type.oneOf(42, [Number, BigInt, Date]);                  // ✔
assert.type.oneOf(null, [null, undefined]);                     // ✔
assert.type.oneOf(new RangeError(), [TypeError, RangeError]);   // ✔

assert.type.oneOf("Fred", [Number, Boolean, Object]);           // ❌ Invalid value: "Fred". Expected a number, boolean, or Object.
assert.type.oneOf(undefined, [Boolean, Number, null]);          // ❌ Invalid value: undefined. Expected a boolean, number, or null.
assert.type.oneOf(new SyntaxError(), [TypeError, RangeError]);  // ❌ Invalid value: SyntaxError. Expected a TypeError or RangeError.
```


### `assert.type.string(value, [fieldName], [defaultValue])`
Asserts that a value is a primitive string (including empty strings).

- **value** - The value to check
- **fieldName** - (optional) The name of the field being assertd. This is used in the error message if the assertion fails.
- **defaultValue** - (optional) The default value to use if `value` is `undefined`.

```javascript
import assert from "@jsdevtools/assert";

assert.type.string("John");                      // ✔
assert.type.string("");                          // ✔
assert.type.string("           ");               // ✔
assert.type.string("\n");                        // ✔
assert.type.string("\t");                        // ✔

assert.type.string(123);                         // ❌ Invalid value: 123. Expected a string.
assert.type.string(null);                        // ❌ Invalid value: null. Expected a string.
assert.type.string(new String());                // ❌ Invalid value: String. Expected a string.
```


### `assert.type.number(value, [fieldName], [defaultValue])`
Asserts that a value is a primitive number. `NaN` is **not** considered a number.

- **value** - The value to check
- **fieldName** - (optional) The name of the field being assertd. This is used in the error message if the assertion fails.
- **defaultValue** - (optional) The default value to use if `value` is `undefined`.

```javascript
import assert from "@jsdevtools/assert";

assert.type.number(0)                     // ✔
assert.type.number(123)                   // ✔
assert.type.number(-42.1245)              // ✔
assert.type.number(Math.PI)               // ✔
assert.type.number(Infinity)              // ✔

assert.type.number("123");                // ❌ Invalid value: "123". Expected a number.
assert.type.number(NaN);                  // ❌ Invalid value: NaN. Expected a number.
assert.type.number(new Number());         // ❌ Invalid value: Number. Expected a number.
```


### `assert.type.boolean(value, [fieldName], [defaultValue])`
Asserts that a value is a primitive boolean value.

- **value** - The value to check
- **fieldName** - (optional) The name of the field being assertd. This is used in the error message if the assertion fails.
- **defaultValue** - (optional) The default value to use if `value` is `undefined`.

```javascript
import assert from "@jsdevtools/assert";

assert.type.boolean(false)                 // ✔
assert.type.boolean(true)                  // ✔

assert.type.boolean("true");               // ❌ Invalid value: "true". Expected a boolean.
assert.type.boolean(0);                    // ❌ Invalid value: 0. Expected a boolean.
assert.type.boolean(1);                    // ❌ Invalid value: 1. Expected a boolean.
assert.type.boolean(new Boolean());        // ❌ Invalid value: Boolean. Expected a boolean.
```


### `assert.type.object(value, [fieldName], [defaultValue])`
Asserts that a value is an object. `null` is **not** considered an object.

- **value** - The value to check
- **fieldName** - (optional) The name of the field being assertd. This is used in the error message if the assertion fails.
- **defaultValue** - (optional) The default value to use if `value` is `undefined`.

```javascript
import assert from "@jsdevtools/assert";

assert.type.object({})                 // ✔
assert.type.object(/^regex$/)          // ✔
assert.type.object(new Date())         // ✔
assert.type.object(new Object())       // ✔
assert.type.object(Object.prototype)   // ✔

assert.type.object(null);              // ❌ Invalid value: null. Expected an object.
assert.type.object(undefined);         // ❌ Invalid value: undefined. A value is required.
assert.type.object(Object);            // ❌ Invalid value: function. Expected an object.
```


### `assert.type.array(value, [fieldName], [defaultValue])`
Asserts that a value is an array.

- **value** - The value to check
- **fieldName** - (optional) The name of the field being assertd. This is used in the error message if the assertion fails.
- **defaultValue** - (optional) The default value to use if `value` is `undefined`.

```javascript
import assert from "@jsdevtools/assert";

assert.type.array([])                  // ✔
assert.type.array([1, 2, 3])           // ✔
assert.type.array(new Array())         // ✔
assert.type.array(Array.prototype)     // ✔

assert.type.array("hello");            // ❌ Invalid value: "hello". Expected an array.
assert.type.array(Array);              // ❌ Invalid value: function. Expected an array.
```


### `assert.type.function(value, [fieldName], [defaultValue])`
Asserts  any type of function, including async, generators, arrow functions, classes, etc.

- **value** - The value to check
- **fieldName** - (optional) The name of the field being assertd. This is used in the error message if the assertion fails.
- **defaultValue** - (optional) The default value to use if `value` is `undefined`.

```javascript
import assert from "@jsdevtools/assert";

assert.type.function(Object)                   // ✔
assert.type.function(Object.toString)          // ✔
assert.type.function(function foo() {})        // ✔
assert.type.function(() => null)               // ✔
assert.type.function(class Foo {})             // ✔

assert.type.function(null);                    // ❌ Invalid value: null. Expected a function.
assert.type.function(new Object());            // ❌ Invalid value: {}. Expected a function.
assert.type.function("function");              // ❌ Invalid value: "function". Expected a function.
```


### `assert.string(value, [fieldName], [defaultValue])`
This is an alias for [`assert.type.string()`](#assert-string-value-fieldname-defaultvalue)


### `assert.string.nonEmpty(value, [fieldName], [defaultValue])`
Asserts that a value is a string with at least one character (including whitespace).

- **value** - The value to check
- **fieldName** - (optional) The name of the field being assertd. This is used in the error message if the assertion fails.
- **defaultValue** - (optional) The default value to use if `value` is `undefined`.

```javascript
import assert from "@jsdevtools/assert";

assert.string.nonEmpty("John")                   // ✔
assert.string.nonEmpty("    ")                   // ✔
assert.string.nonEmpty("\n")                     // ✔
assert.string.nonEmpty("\t")                     // ✔

assert.string.nonEmpty("");                      // ❌ Invalid value: "". It cannot be empty.
assert.string.nonEmpty(null);                    // ❌ Invalid value: null. Expected a string.
assert.string.nonEmpty(new String());            // ❌ Invalid value: String. Expected a string.
```


### `assert.string.nonWhitespace(value, [fieldName], [defaultValue])`
Asserts that a value is a string with at least one non-whitespace character.

- **value** - The value to check
- **fieldName** - (optional) The name of the field being assertd. This is used in the error message if the assertion fails.
- **defaultValue** - (optional) The default value to use if `value` is `undefined`.

```javascript
import assert from "@jsdevtools/assert";

assert.string.nonWhitespace("John")                   // ✔
assert.string.nonWhitespace("  a  ")                  // ✔

assert.string.nonWhitespace("");                      // ❌ Invalid value: "". It cannot be empty.
assert.string.nonWhitespace("    ");                  // ❌ Invalid value: "    ". It cannot be all whitespace.
assert.string.nonWhitespace("\n")                     // ❌ Invalid value: "\n". It cannot be all whitespace.
assert.string.nonWhitespace("\t")                     // ❌ Invalid value: "\t". It cannot be all whitespace.
assert.string.nonWhitespace(new String());            // ❌ Invalid value: String. Expected a string.
```


### `assert.string.minLength(value, minLength, [fieldName], [defaultValue])`
Asserts that a value is a string with at least the specified number of characters (including whitespace).

- **value** - The value to check
- **minLength** - The minimum allowed length
- **fieldName** - (optional) The name of the field being assertd. This is used in the error message if the assertion fails.
- **defaultValue** - (optional) The default value to use if `value` is `undefined`.

```javascript
import assert from "@jsdevtools/assert";

assert.string.minLength("John", 1)                // ✔
assert.string.minLength("  a  ", 5)               // ✔
assert.string.minLength("", 0)                    // ✔

assert.string.minLength("", 1);                   // ❌ Invalid value: "". It cannot be empty.
assert.string.minLength("John", 10);              // ❌ Invalid value: "John". It should be at least 10 characters.
```


### `assert.string.maxLength(value, maxLength, [fieldName], [defaultValue])`
Asserts that a value is a string with no more than the specified number of characters (including whitespace).

- **value** - The value to check
- **maxLength** - The maximum allowed length
- **fieldName** - (optional) The name of the field being assertd. This is used in the error message if the assertion fails.
- **defaultValue** - (optional) The default value to use if `value` is `undefined`.

```javascript
import assert from "@jsdevtools/assert";

assert.string.maxLength("John", 10)               // ✔
assert.string.maxLength("  a  ", 5)               // ✔
assert.string.maxLength("", 50)                   // ✔

assert.string.maxLength("John Doe", 5);           // ❌ Invalid value: "John Doe". It cannot be more than 5 characters.
```


### `assert.string.length(value, minLength, [maxLength], [fieldName], [defaultValue])`
Asserts that a value is a string with the specified number of characters (including whitespace)

- **value** - The value to check
- **minLength** - The minimum allowed length
- **maxLength** - (optional) The maximum allowed length. If not specified, it defaults to the same as `minLength`.
- **fieldName** - (optional) The name of the field being assertd. This is used in the error message if the assertion fails.
- **defaultValue** - (optional) The default value to use if `value` is `undefined`.

```javascript
import assert from "@jsdevtools/assert";

assert.string.length("John", 1, 10)            // ✔
assert.string.length("  a  ", 5, 25)           // ✔
assert.string.length("", 0, 100)               // ✔

assert.string.length("John Doe", 1, 5);        // ❌ Invalid value: "John Doe". It cannot be more than 5 characters.
assert.string.length("John Doe", 20, 50);      // ❌ Invalid value: "John Doe". It should be at least 20 characters.
assert.string.length("John Doe", 5);           // ❌ Invalid value: "John Doe". It must be exactly 5 characters.
```


### `assert.string.enum(value, enum, [fieldName], [defaultValue])`
Asserts that a value is a string that is a member of the specified enumeration object.

- **value** - The value to check
- **enum** - The object whose values are the enumveration members
- **fieldName** - (optional) The name of the field being assertd. This is used in the error message if the assertion fails.
- **defaultValue** - (optional) The default value to use if `value` is `undefined`.

```javascript
import assert from "@jsdevtools/assert";

assert.string.enum("foo", { Foo: "foo", Bar: "bar" });            // ✔
assert.string.enum("3", { One: "1", Two: "2", Three: "3" });      // ✔
assert.string.enum("", { None: "", Some: "some", All: "all" });   // ✔

assert.string.enum("Bar", { Foo: "foo", Bar: "bar" });            // ❌ Invalid value: "Bar". Expected foo or bar.
assert.string.enum("5", { One: "1", Two: "2", Three: "3" });      // ❌ Invalid value: "5". Expected 1, 2, or 3.
assert.string.enum("", { None: "none", Some: "some" });           // ❌ Invalid value: "". Expected none or some.
```


### `assert.number(value, [fieldName], [defaultValue])`
This is an alias for [`assert.type.number()`](#assert-number-value-fieldname-defaultvalue)


### `assert.number.integer(value, [fieldName], [defaultValue])`
Asserts that a value is an integer value (positive or negative).

- **value** - The value to check
- **fieldName** - (optional) The name of the field being assertd. This is used in the error message if the assertion fails.
- **defaultValue** - (optional) The default value to use if `value` is `undefined`.

```javascript
import assert from "@jsdevtools/assert";

assert.number.integer(0);               // ✔
assert.number.integer(42);              // ✔
assert.number.integer(-42);             // ✔
assert.number.integer(12345.0);         // ✔

assert.number.integer(Math.PI);         // ❌ Invalid value: 3.141592653589793. Expected an integer.
assert.number.integer(Infinity);        // ❌ Invalid value: Infinity. Expected an integer.
assert.number.integer(NaN);             // ❌ Invalid value: NaN. Expected a number.
```


### `assert.number.integer.positive(value, [fieldName], [defaultValue])`
Asserts that a value is a positive integer value (one or more).

- **value** - The value to check
- **fieldName** - (optional) The name of the field being assertd. This is used in the error message if the assertion fails.
- **defaultValue** - (optional) The default value to use if `value` is `undefined`.

```javascript
import assert from "@jsdevtools/assert";

assert.number.integer.positive(42);              // ✔
assert.number.integer.positive(12345.0);         // ✔

assert.number.integer.positive(0);               // ❌ Invalid value: 0. Expected a positive integer.
assert.number.integer.positive(-42);             // ❌ Invalid value: -42. Expected a positive integer.
assert.number.integer.positive(Infinity);        // ❌ Invalid value: Infinity. Expected an integer.
assert.number.integer.positive(NaN);             // ❌ Invalid value: NaN. Expected a number.
```


### `assert.number.integer.nonNegative(value, [fieldName], [defaultValue])`
Asserts that a value is an integer value that is zero or greater.

- **value** - The value to check
- **fieldName** - (optional) The name of the field being assertd. This is used in the error message if the assertion fails.
- **defaultValue** - (optional) The default value to use if `value` is `undefined`.

```javascript
import assert from "@jsdevtools/assert";

assert.number.integer.nonNegative(0);               // ✔
assert.number.integer.nonNegative(42);              // ✔
assert.number.integer.nonNegative(12345.0);         // ✔

assert.number.integer.nonNegative(-42);             // ❌ Invalid value: -42. Expected zero or greater.
assert.number.integer.nonNegative(-Infinity);       // ❌ Invalid value: -Infinity. Expected an integer.
assert.number.integer.nonNegative(NaN);             // ❌ Invalid value: NaN. Expected a number.
```


### `assert.array(value, [fieldName], [defaultValue])`
This is an alias for [`assert.type.array()`](#assert-array-value-fieldname-defaultvalue)


### `assert.array.nonEmpty(value, [fieldName], [defaultValue])`
Asserts that a value is an array with at least one item.

- **value** - The value to check
- **fieldName** - (optional) The name of the field being assertd. This is used in the error message if the assertion fails.
- **defaultValue** - (optional) The default value to use if `value` is `undefined`.

```javascript
import assert from "@jsdevtools/assert";

assert.array.nonEmpty(["a", "b", "c"]);         // ✔
assert.array.nonEmpty(new Array(1, 2, 3));      // ✔

assert.array.nonEmpty([]);                      // ❌ Invalid value: Array. It cannot be empty.
assert.array.nonEmpty(new Array());             // ❌ Invalid value: Array. It cannot be empty.
```


### `assert.array.minLength(value, minLength, [fieldName], [defaultValue])`
Asserts that a value is an array with at least the specified number of items.

- **value** - The value to check
- **minLength** - The minimum allowed length
- **fieldName** - (optional) The name of the field being assertd. This is used in the error message if the assertion fails.
- **defaultValue** - (optional) The default value to use if `value` is `undefined`.

```javascript
import assert from "@jsdevtools/assert";

assert.array.minLength([], 0);                   // ✔
assert.array.minLength(["a", "b", "c"], 1);      // ✔

assert.array.minLength([], 1);                   // ❌ Invalid value: Array. It cannot be empty.
assert.array.minLength(["a", "b", "c"], 10);     // ❌ Invalid value: [a,b,c]. It should have at least 10 items.
```


### `assert.array.maxLength(value, maxLength, [fieldName], [defaultValue])`
Asserts that a value is an array with no more than the specified number of items.

- **value** - The value to check
- **maxLength** - The maximum allowed length
- **fieldName** - (optional) The name of the field being assertd. This is used in the error message if the assertion fails.
- **defaultValue** - (optional) The default value to use if `value` is `undefined`.

```javascript
import assert from "@jsdevtools/assert";

assert.array.maxLength([], 5);                   // ✔
assert.array.maxLength(["a", "b", "c"], 3);      // ✔

assert.array.maxLength([1, 2, 3], 1);            // ❌ Invalid value: [1,2,3]. It cannot have more than 1 item.
assert.array.maxLength(["a", "b", "c"], 2);      // ❌ Invalid value: [a,b,c]. It cannot have more than 2 items.
```


### `assert.array.length(value, minLength, [maxLength], [fieldName], [defaultValue])`
Asserts that a value is an array with the specified number of items.

- **value** - The value to check
- **minLength** - The minimum allowed length
- **maxLength** - (optional) The maximum allowed length. If not specified, it defaults to the same as `minLength`.
- **fieldName** - (optional) The name of the field being assertd. This is used in the error message if the assertion fails.
- **defaultValue** - (optional) The default value to use if `value` is `undefined`.

```javascript
import assert from "@jsdevtools/assert";

assert.array.length([], 0);                   // ✔
assert.array.length([], 0, 5);                // ✔
assert.array.length(["a", "b", "c"], 3);      // ✔
assert.array.length(["a", "b", "c"], 1, 3);   // ✔

assert.array.length([], 1);                   // ❌ Invalid value: Array. It cannot be empty.
assert.array.length([1, 2, 3], 5, 10);        // ❌ Invalid value: [1,2,3]. It should have at least 5 items.
assert.array.length(["a", "b", "c"], 2);      // ❌ Invalid value: [a,b,c]. It must have exactly 2 items.
```



Contributing
--------------------------
Contributions, enhancements, and bug-fixes are welcome!  [File an issue](https://github.com/JS-DevTools/assert/issues) on GitHub and [submit a pull request](https://github.com/JS-DevTools/assert/pulls).

#### Building
To build the project locally on your computer:

1. __Clone this repo__<br>
`git clone https://github.com/JS-DevTools/assert.git`

2. __Install dependencies__<br>
`npm install`

3. __Build the code__<br>
`npm run build`

4. __Run the tests__<br>
`npm test`



License
--------------------------
@jsdevtools/assert is 100% free and open-source, under the [MIT license](LICENSE). Use it however you want.

This package is [Treeware](http://treeware.earth). If you use it in production, then we ask that you [**buy the world a tree**](https://plant.treeware.earth/JS-DevTools/assert) to thank us for our work. By contributing to the Treeware forest you’ll be creating employment for local families and restoring wildlife habitats.



Big Thanks To
--------------------------
Thanks to these awesome companies for their support of Open Source developers ❤

[![Travis CI](https://jstools.dev/img/badges/travis-ci.svg)](https://travis-ci.com)
[![SauceLabs](https://jstools.dev/img/badges/sauce-labs.svg)](https://saucelabs.com)
[![Coveralls](https://jstools.dev/img/badges/coveralls.svg)](https://coveralls.io)
