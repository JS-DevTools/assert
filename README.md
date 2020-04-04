Validate
======================================
### Simple validation helpers with user-friendly error messages

[![Cross-Platform Compatibility](https://jstools.dev/img/badges/os-badges.svg)](https://github.com/JS-DevTools/validate/blob/master/.github/workflows/CI-CD.yaml)
[![Build Status](https://github.com/JS-DevTools/validate/workflows/CI-CD/badge.svg)](https://github.com/JS-DevTools/validate/blob/master/.github/workflows/CI-CD.yaml)

[![Coverage Status](https://coveralls.io/repos/github/JS-DevTools/validate/badge.svg?branch=master)](https://coveralls.io/github/JS-DevTools/validate)
[![Dependencies](https://david-dm.org/JS-DevTools/validate.svg)](https://david-dm.org/JS-DevTools/validate)

[![npm](https://img.shields.io/npm/v/@jsdevtools/validate.svg)](https://www.npmjs.com/package/@jsdevtools/validate)
[![License](https://img.shields.io/npm/l/@jsdevtools/validate.svg)](LICENSE)
[![Buy us a tree](https://img.shields.io/badge/Treeware-%F0%9F%8C%B3-lightgreen)](https://plant.treeware.earth/JS-DevTools/validate)



Features
--------------------------
- When validation succeeds, the value is returned. Useful for assertion + assignment.

- When validation fails, the appropriate error type is thrown (e.g. `TypeError`, `RangeError`, etc.)

- Error messages include the invalid value, humanized and sanitized

- You can customize the field name used in error messages



Installation
--------------------------
You can install this library via [npm](https://docs.npmjs.com/about-npm/).

```bash
npm install @jsdevtools/validate
```



Usage
-------------------------------
The exported `validate` object is a fluent-like object with various validation functions.  Each of the validation functions returns the value if valid, or throws an error if invalid.


### `validate.value(value, [fieldName], [defaultValue])`
Validates any value that is not `undefined`. (even `null` and `NaN`)

- **value** - The value to validate
- **fieldName** - (optional) The name of the field being validated. This is used in the error message if invalid.
- **defaultValue** - (optional) The default value to use if `value` is `undefined`.

```javascript
import validate from "@jsdevtools/validate";

validate.value(0);                    // ✔
validate.value(false);                // ✔
validate.value(null);                 // ✔
validate.value(NaN);                  // ✔

validate.value(undefined);            // ❌ Invalid value: undefined. A value is required.
```


### `validate.value.oneOf(value, values, [fieldName], [defaultValue])`
Validates a value that is one of the specified values.

- **value** - The value to validate
- **values** - The allowed values
- **fieldName** - (optional) The name of the field being validated. This is used in the error message if invalid.
- **defaultValue** - (optional) The default value to use if `value` is `undefined`.

```javascript
import validate from "@jsdevtools/validate";

validate.value.oneOf("a", ["a", "b", "c"]);     // ✔
validate.value.oneOf(4, [1, 2, 3, 4, 5]);       // ✔
validate.value.oneOf(true, [1, true, "yes"]);   // ✔

validate.value.oneOf("b", ["x", "y", "z"]);     // ❌ Invalid value: "b". Expected "x", "y", or "z".
```


### `validate.type(value, type, [fieldName], [defaultValue])`
Validates a value that is the specified type.

- **value** - The value to validate
- **type** - The expected type. This can be a class, a primitive wrapper (e.g. `String`), `null`, or `undefined`
- **fieldName** - (optional) The name of the field being validated. This is used in the error message if invalid.
- **defaultValue** - (optional) The default value to use if `value` is `undefined`.

```javascript
import validate from "@jsdevtools/validate";

validate.type("John", String);          // ✔
validate.type(42, Number);              // ✔
validate.type(false, Boolean);          // ✔
validate.type(null, null);              // ✔
validate.type({ x: 1 }, Object);        // ✔
validate.type(/^regex$/, RegExp);       // ✔
validate.type(new Date(), Date);        // ✔

validate.type("Fred", Object);          // ❌ Invalid value: "Fred". Expected an Object.
validate.type(100, BigInt);             // ❌ Invalid value: 100. Expected a bigint.
validate.type(undefined, null);         // ❌ Invalid value: undefined. Expected null.
validate.type(null, Object);            // ❌ Invalid value: null. Expected an Object.
validate.type(new Date(), RangeError);  // ❌ Invalid value: Date. Expected a RangeError.
```


### `validate.type.oneOf(value, types, [fieldName], [defaultValue])`
Validates a value that is the specified type.

- **value** - The value to validate
- **types** - An array of the allowed types.
- **fieldName** - (optional) The name of the field being validated. This is used in the error message if invalid.
- **defaultValue** - (optional) The default value to use if `value` is `undefined`.

```javascript
import validate from "@jsdevtools/validate";

validate.type.oneOf("John", [Number, String, Boolean]);           // ✔
validate.type.oneOf(42, [Number, BigInt, Date]);                  // ✔
validate.type.oneOf(null, [null, undefined]);                     // ✔
validate.type.oneOf(new RangeError(), [TypeError, RangeError]);   // ✔

validate.type.oneOf("Fred", [Number, Boolean, Object]);           // ❌ Invalid value: "Fred". Expected a number, boolean, or Object.
validate.type.oneOf(undefined, [Boolean, Number, null]);          // ❌ Invalid value: undefined. Expected a boolean, number, or null.
validate.type.oneOf(new SyntaxError(), [TypeError, RangeError]);  // ❌ Invalid value: SyntaxError. Expected a TypeError or RangeError.
```


### `validate.type.string(value, [fieldName], [defaultValue])`
Validates a primitive string value (including empty strings).

- **value** - The value to validate
- **fieldName** - (optional) The name of the field being validated. This is used in the error message if invalid.
- **defaultValue** - (optional) The default value to use if `value` is `undefined`.

```javascript
import validate from "@jsdevtools/validate";

validate.type.string("John");                      // ✔
validate.type.string("");                          // ✔
validate.type.string("           ");               // ✔
validate.type.string("\n");                        // ✔
validate.type.string("\t");                        // ✔

validate.type.string(123);                         // ❌ Invalid value: 123. Expected a string.
validate.type.string(null);                        // ❌ Invalid value: null. Expected a string.
validate.type.string(new String());                // ❌ Invalid value: String. Expected a string.
```


### `validate.type.number(value, [fieldName], [defaultValue])`
Validates a primitive number value (**not** including `NaN`).

- **value** - The value to validate
- **fieldName** - (optional) The name of the field being validated. This is used in the error message if invalid.
- **defaultValue** - (optional) The default value to use if `value` is `undefined`.

```javascript
import validate from "@jsdevtools/validate";

validate.type.number(0)                     // ✔
validate.type.number(123)                   // ✔
validate.type.number(-42.1245)              // ✔
validate.type.number(Math.PI)               // ✔
validate.type.number(Infinity)              // ✔

validate.type.number("123");                // ❌ Invalid value: "123". Expected a number.
validate.type.number(NaN);                  // ❌ Invalid value: NaN. Expected a number.
validate.type.number(new Number());         // ❌ Invalid value: Number. Expected a number.
```


### `validate.type.boolean(value, [fieldName], [defaultValue])`
Validates a primitive boolean value.

- **value** - The value to validate
- **fieldName** - (optional) The name of the field being validated. This is used in the error message if invalid.
- **defaultValue** - (optional) The default value to use if `value` is `undefined`.

```javascript
import validate from "@jsdevtools/validate";

validate.type.boolean(false)                 // ✔
validate.type.boolean(true)                  // ✔

validate.type.boolean("true");               // ❌ Invalid value: "true". Expected a boolean.
validate.type.boolean(0);                    // ❌ Invalid value: 0. Expected a boolean.
validate.type.boolean(1);                    // ❌ Invalid value: 1. Expected a boolean.
validate.type.boolean(new Boolean());        // ❌ Invalid value: Boolean. Expected a boolean.
```


### `validate.type.object(value, [fieldName], [defaultValue])`
Validates an object (**not** including `null`).

- **value** - The value to validate
- **fieldName** - (optional) The name of the field being validated. This is used in the error message if invalid.
- **defaultValue** - (optional) The default value to use if `value` is `undefined`.

```javascript
import validate from "@jsdevtools/validate";

validate.type.object({})                 // ✔
validate.type.object(/^regex$/)          // ✔
validate.type.object(new Date())         // ✔
validate.type.object(new Object())       // ✔
validate.type.object(Object.prototype)   // ✔

validate.type.object(null);              // ❌ Invalid value: null. Expected an object.
validate.type.object(undefined);         // ❌ Invalid value: undefined. A value is required.
validate.type.object(Object);            // ❌ Invalid value: function. Expected an object.
```


### `validate.type.function(value, [fieldName], [defaultValue])`
Validates any type of function, including async, generators, arrow functions, classes, etc.

- **value** - The value to validate
- **fieldName** - (optional) The name of the field being validated. This is used in the error message if invalid.
- **defaultValue** - (optional) The default value to use if `value` is `undefined`.

```javascript
import validate from "@jsdevtools/validate";

validate.type.function(Object)                   // ✔
validate.type.function(Object.toString)          // ✔
validate.type.function(function foo() {})        // ✔
validate.type.function(() => null)               // ✔
validate.type.function(class Foo {})             // ✔

validate.type.function(null);                    // ❌ Invalid value: null. Expected a function.
validate.type.function(new Object());            // ❌ Invalid value: {}. Expected a function.
validate.type.function("function");              // ❌ Invalid value: "function". Expected a function.
```


### `validate.string(value, [fieldName], [defaultValue])`
This is an alias for [`validate.type.string()`](#validate-string-value-fieldname-defaultvalue)


### `validate.string.nonEmpty(value, [fieldName], [defaultValue])`
Validates a string with at least one character (including whitespace).

- **value** - The value to validate
- **fieldName** - (optional) The name of the field being validated. This is used in the error message if invalid.
- **defaultValue** - (optional) The default value to use if `value` is `undefined`.

```javascript
import validate from "@jsdevtools/validate";

validate.string.nonEmpty("John")                   // ✔
validate.string.nonEmpty("    ")                   // ✔
validate.string.nonEmpty("\n")                     // ✔
validate.string.nonEmpty("\t")                     // ✔

validate.string.nonEmpty("");                      // ❌ Invalid value: "". It cannot be empty.
validate.string.nonEmpty(null);                    // ❌ Invalid value: null. Expected a string.
validate.string.nonEmpty(new String());            // ❌ Invalid value: String. Expected a string.
```


### `validate.string.nonWhitespace(value, [fieldName], [defaultValue])`
Validates a string with at least one non-whitespace character.

- **value** - The value to validate
- **fieldName** - (optional) The name of the field being validated. This is used in the error message if invalid.
- **defaultValue** - (optional) The default value to use if `value` is `undefined`.

```javascript
import validate from "@jsdevtools/validate";

validate.string.nonWhitespace("John")                   // ✔
validate.string.nonWhitespace("  a  ")                  // ✔

validate.string.nonWhitespace("");                      // ❌ Invalid value: "". It cannot be empty.
validate.string.nonWhitespace("    ");                  // ❌ Invalid value: "    ". It cannot be all whitespace.
validate.string.nonWhitespace("\n")                     // ❌ Invalid value: "\n". It cannot be all whitespace.
validate.string.nonWhitespace("\t")                     // ❌ Invalid value: "\t". It cannot be all whitespace.
validate.string.nonWhitespace(new String());            // ❌ Invalid value: String. Expected a string.
```


### `validate.string.minLength(value, minLength, [fieldName], [defaultValue])`
Validates a string with at least the specified number of characters (including whitespace).

- **value** - The value to validate
- **minLength** - The minimum allowed length
- **fieldName** - (optional) The name of the field being validated. This is used in the error message if invalid.
- **defaultValue** - (optional) The default value to use if `value` is `undefined`.

```javascript
import validate from "@jsdevtools/validate";

validate.string.minLength("John", 1)                // ✔
validate.string.minLength("  a  ", 5)               // ✔
validate.string.minLength("", 0)                    // ✔

validate.string.minLength("", 1);                   // ❌ Invalid value: "". It cannot be empty.
validate.string.minLength("John", 10);              // ❌ Invalid value: "John". It should be at least 10 characters.
```


### `validate.string.maxLength(value, maxLength, [fieldName], [defaultValue])`
Validates a string with no more than the specified number of characters (including whitespace).

- **value** - The value to validate
- **maxLength** - The maximum allowed length
- **fieldName** - (optional) The name of the field being validated. This is used in the error message if invalid.
- **defaultValue** - (optional) The default value to use if `value` is `undefined`.

```javascript
import validate from "@jsdevtools/validate";

validate.string.maxLength("John", 10)               // ✔
validate.string.maxLength("  a  ", 5)               // ✔
validate.string.maxLength("", 50)                   // ✔

validate.string.maxLength("John Doe", 5);           // ❌ Invalid value: "John Doe". It cannot be more than 5 characters.
```


### `validate.string.length(value, minLength, [maxLength], [fieldName], [defaultValue])`
Validates a string with the specified number of characters (including whitespace)

- **value** - The value to validate
- **minLength** - The minimum allowed length
- **maxLength** - (optional) The maximum allowed length. If not specified, it defaults to the same as `minLength`.
- **fieldName** - (optional) The name of the field being validated. This is used in the error message if invalid.
- **defaultValue** - (optional) The default value to use if `value` is `undefined`.

```javascript
import validate from "@jsdevtools/validate";

validate.string.length("John", 1, 10)            // ✔
validate.string.length("  a  ", 5, 25)           // ✔
validate.string.length("", 0, 100)               // ✔

validate.string.length("John Doe", 1, 5);        // ❌ Invalid value: "John Doe". It cannot be more than 5 characters.
validate.string.length("John Doe", 20, 50);      // ❌ Invalid value: "John Doe". It should be at least 20 characters.
validate.string.length("John Doe", 5);           // ❌ Invalid value: "John Doe". It must be exactly 5 characters.
```


### `validate.number(value, [fieldName], [defaultValue])`
This is an alias for [`validate.type.number()`](#validate-number-value-fieldname-defaultvalue)


### `validate.number.integer(value, [fieldName], [defaultValue])`
Validates an integer value (positive or negative).

- **value** - The value to validate
- **fieldName** - (optional) The name of the field being validated. This is used in the error message if invalid.
- **defaultValue** - (optional) The default value to use if `value` is `undefined`.

```javascript
import validate from "@jsdevtools/validate";

validate.number.integer(0);               // ✔
validate.number.integer(42);              // ✔
validate.number.integer(-42);             // ✔
validate.number.integer(12345.0);         // ✔

validate.number.integer(Math.PI);         // ❌ Invalid value: 3.141592653589793. Expected an integer.
validate.number.integer(Infinity);        // ❌ Invalid value: Infinity. Expected an integer.
validate.number.integer(NaN);             // ❌ Invalid value: NaN. Expected a number.
```


### `validate.number.integer.positive(value, [fieldName], [defaultValue])`
Validates a positive integer value (one or more).

- **value** - The value to validate
- **fieldName** - (optional) The name of the field being validated. This is used in the error message if invalid.
- **defaultValue** - (optional) The default value to use if `value` is `undefined`.

```javascript
import validate from "@jsdevtools/validate";

validate.number.integer.positive(42);              // ✔
validate.number.integer.positive(12345.0);         // ✔

validate.number.integer.positive(0);               // ❌ Invalid value: 0. Expected a positive integer.
validate.number.integer.positive(-42);             // ❌ Invalid value: -42. Expected a positive integer.
validate.number.integer.positive(Infinity);        // ❌ Invalid value: Infinity. Expected an integer.
validate.number.integer.positive(NaN);             // ❌ Invalid value: NaN. Expected a number.
```


### `validate.number.integer.nonNegative(value, [fieldName], [defaultValue])`
Validates an integer value that is zero or greater.

- **value** - The value to validate
- **fieldName** - (optional) The name of the field being validated. This is used in the error message if invalid.
- **defaultValue** - (optional) The default value to use if `value` is `undefined`.

```javascript
import validate from "@jsdevtools/validate";

validate.number.integer.nonNegative(0);               // ✔
validate.number.integer.nonNegative(42);              // ✔
validate.number.integer.nonNegative(12345.0);         // ✔

validate.number.integer.nonNegative(-42);             // ❌ Invalid value: -42. Expected zero or greater.
validate.number.integer.nonNegative(-Infinity);       // ❌ Invalid value: -Infinity. Expected an integer.
validate.number.integer.nonNegative(NaN);             // ❌ Invalid value: NaN. Expected a number.
```



Contributing
--------------------------
Contributions, enhancements, and bug-fixes are welcome!  [File an issue](https://github.com/JS-DevTools/validate/issues) on GitHub and [submit a pull request](https://github.com/JS-DevTools/validate/pulls).

#### Building
To build the project locally on your computer:

1. __Clone this repo__<br>
`git clone https://github.com/JS-DevTools/validate.git`

2. __Install dependencies__<br>
`npm install`

3. __Build the code__<br>
`npm run build`

4. __Run the tests__<br>
`npm test`



License
--------------------------
@jsdevtools/validate is 100% free and open-source, under the [MIT license](LICENSE). Use it however you want.

This package is [Treeware](http://treeware.earth). If you use it in production, then we ask that you [**buy the world a tree**](https://plant.treeware.earth/JS-DevTools/validate) to thank us for our work. By contributing to the Treeware forest you’ll be creating employment for local families and restoring wildlife habitats.



Big Thanks To
--------------------------
Thanks to these awesome companies for their support of Open Source developers ❤

[![Travis CI](https://jstools.dev/img/badges/travis-ci.svg)](https://travis-ci.com)
[![SauceLabs](https://jstools.dev/img/badges/sauce-labs.svg)](https://saucelabs.com)
[![Coveralls](https://jstools.dev/img/badges/coveralls.svg)](https://coveralls.io)
