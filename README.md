CodeEngine validation helpers
======================================

[![Cross-Platform Compatibility](https://engine.codes/img/badges/os-badges.svg)](https://github.com/CodeEngineOrg/code-engine-validate/blob/master/.github/workflows/CI-CD.yaml)
[![Build Status](https://github.com/CodeEngineOrg/code-engine-validate/workflows/CI-CD/badge.svg)](https://github.com/CodeEngineOrg/code-engine-validate/blob/master/.github/workflows/CI-CD.yaml)

[![Coverage Status](https://coveralls.io/repos/github/CodeEngineOrg/code-engine-validate/badge.svg?branch=master)](https://coveralls.io/github/CodeEngineOrg/code-engine-validate)
[![Dependencies](https://david-dm.org/CodeEngineOrg/code-engine-validate.svg)](https://david-dm.org/CodeEngineOrg/code-engine-validate)

[![npm](https://img.shields.io/npm/v/@code-engine/validate.svg)](https://www.npmjs.com/package/@code-engine/validate)
[![License](https://img.shields.io/npm/l/@code-engine/validate.svg)](LICENSE)



This is a utility library that's used inside [CodeEngine](https://engine.codes/) to validate inputs.

> **NOTE:** This is an **internal library** that is only intended to be used by CodeEngine. Using it outside of CodeEngine is discouraged.


Usage
-------------------------------
The exported `validate` object is a fluent-like object with various validation functions.  Each of the validation functions returns the value if valid, or throws an error if invalid.


### `validate.value(value, [fieldName], [defaultValue])`
Validates any value that is not `undefined`. (even `null` and `NaN`)

- **value** - The value to validate
- **fieldName** - (optional) The name of the field being validated. This is used in the error message if invalid.
- **defaultValue** - (optional) The default value to use if `value` is `undefined`.

```javascript
import validate from "@code-engine/validate";

validate.value(0);                    // ✔
validate.value(false);                // ✔
validate.value(null);                 // ✔
validate.value(NaN);                  // ✔

validate.value(undefined);            // ❌
```


### `validate.value.oneOf(value, values, [fieldName], [defaultValue])`
Validates a value that is one of the specified values.

- **value** - The value to validate
- **values** - The allowed values
- **fieldName** - (optional) The name of the field being validated. This is used in the error message if invalid.
- **defaultValue** - (optional) The default value to use if `value` is `undefined`.

```javascript
import validate from "@code-engine/validate";

validate.value.oneOf("a", ["a", "b", "c"]);     // ✔
validate.value.oneOf(4, [1, 2, 3, 4, 5]);       // ✔
validate.value.oneOf(true, [1, true, "yes"]);   // ✔

validate.value.oneOf("b", ["x", "y", "z"]);     // ❌
```


### `validate.type(value, type, [fieldName], [defaultValue])`
Validates a value that is the specified type.

- **value** - The value to validate
- **type** - The expected type. This can be a class, a primitive wrapper (e.g. `String`), `null`, or `undefined`
- **fieldName** - (optional) The name of the field being validated. This is used in the error message if invalid.
- **defaultValue** - (optional) The default value to use if `value` is `undefined`.

```javascript
import validate from "@code-engine/validate";

validate.type("John", String);          // ✔
validate.type(42, Number);              // ✔
validate.type(false, Boolean);          // ✔
validate.type(null, null);              // ✔
validate.type({ x: 1 }, Object);        // ✔
validate.type(/^regex$/, RegExp);       // ✔
validate.type(new Date(), Date);        // ✔

validate.type("Fred", Object);          // ❌
validate.type(100, BigInt);             // ❌
validate.type(undefined, null);         // ❌
validate.type(null, Object);            // ❌
validate.type(new Date(), RangeError);  // ❌
```


### `validate.type.oneOf(value, types, [fieldName], [defaultValue])`
Validates a value that is the specified type.

- **value** - The value to validate
- **types** - An array of the allowed types.
- **fieldName** - (optional) The name of the field being validated. This is used in the error message if invalid.
- **defaultValue** - (optional) The default value to use if `value` is `undefined`.

```javascript
import validate from "@code-engine/validate";

validate.type.oneOf("John", [Number, String, Boolean]);           // ✔
validate.type.oneOf(42, [Number, BigInt, Date]);                  // ✔
validate.type.oneOf(null, [null, undefined]);                     // ✔
validate.type.oneOf(new RangeError(), [TypeError, RangeError]);   // ✔

validate.type.oneOf("Fred", [Object, Number, Boolean]);           // ❌
validate.type.oneOf(undefined, [Boolean, Number, null]);          // ❌
validate.type.oneOf(new SyntaxError(), [TypeError, RangeError]);  // ❌
```


### `validate.type.string(value, [fieldName], [defaultValue])`
Validates a primitive string value (including empty strings).

- **value** - The value to validate
- **fieldName** - (optional) The name of the field being validated. This is used in the error message if invalid.
- **defaultValue** - (optional) The default value to use if `value` is `undefined`.

```javascript
import validate from "@code-engine/validate";

validate.type.string("John");                      // ✔
validate.type.string("");                          // ✔
validate.type.string("           ");               // ✔
validate.type.string("\n");                        // ✔
validate.type.string("\t");                        // ✔

validate.type.string(123);                         // ❌
validate.type.string(null);                        // ❌
validate.type.string(new String());                // ❌
```


### `validate.type.number(value, [fieldName], [defaultValue])`
Validates a primitive number value (**not** including `NaN`).

- **value** - The value to validate
- **fieldName** - (optional) The name of the field being validated. This is used in the error message if invalid.
- **defaultValue** - (optional) The default value to use if `value` is `undefined`.

```javascript
import validate from "@code-engine/validate";

validate.type.number(0)                     // ✔
validate.type.number(123)                   // ✔
validate.type.number(-42.1245)              // ✔
validate.type.number(Math.PI)               // ✔
validate.type.number(Infinity)              // ✔

validate.type.number("123");                // ❌
validate.type.number(NaN);                  // ❌
validate.type.number(new Number());         // ❌
```


### `validate.type.boolean(value, [fieldName], [defaultValue])`
Validates a primitive boolean value.

- **value** - The value to validate
- **fieldName** - (optional) The name of the field being validated. This is used in the error message if invalid.
- **defaultValue** - (optional) The default value to use if `value` is `undefined`.

```javascript
import validate from "@code-engine/validate";

validate.type.boolean(false)                 // ✔
validate.type.boolean(true)                  // ✔

validate.type.boolean("true");               // ❌
validate.type.boolean(0);                    // ❌
validate.type.boolean(1);                    // ❌
validate.type.boolean(new Boolean());        // ❌
```


### `validate.type.object(value, [fieldName], [defaultValue])`
Validates an object (**not** including `null`).

- **value** - The value to validate
- **fieldName** - (optional) The name of the field being validated. This is used in the error message if invalid.
- **defaultValue** - (optional) The default value to use if `value` is `undefined`.

```javascript
import validate from "@code-engine/validate";

validate.type.object({})                 // ✔
validate.type.object(/^regex$/)          // ✔
validate.type.object(new Date())         // ✔
validate.type.object(new Object())       // ✔
validate.type.object(Object.prototype)   // ✔

validate.type.object(null);              // ❌
validate.type.object(undefined);         // ❌
validate.type.object(Object);            // ❌
```


### `validate.type.function(value, [fieldName], [defaultValue])`
Validates any type of function, including async, generators, arrow functions, classes, etc.

- **value** - The value to validate
- **fieldName** - (optional) The name of the field being validated. This is used in the error message if invalid.
- **defaultValue** - (optional) The default value to use if `value` is `undefined`.

```javascript
import validate from "@code-engine/validate";

validate.type.function(Object)                   // ✔
validate.type.function(Object.toString)          // ✔
validate.type.function(function foo() {})        // ✔
validate.type.function(() => null)               // ✔
validate.type.function(class Foo {})             // ✔

validate.type.function(null);                    // ❌
validate.type.function(new Object());            // ❌
validate.type.function("function");              // ❌
```


### `validate.string(value, [fieldName], [defaultValue])`
This is an alias for [`validate.type.string()`](#validate-string-value-fieldname-defaultvalue)


### `validate.string.nonEmpty(value, [fieldName], [defaultValue])`
Validates a string with at least one character (including whitespace).

- **value** - The value to validate
- **fieldName** - (optional) The name of the field being validated. This is used in the error message if invalid.
- **defaultValue** - (optional) The default value to use if `value` is `undefined`.

```javascript
import validate from "@code-engine/validate";

validate.string.nonEmpty("John")                   // ✔
validate.string.nonEmpty("    ")                   // ✔
validate.string.nonEmpty("\n")                     // ✔
validate.string.nonEmpty("\t")                     // ✔

validate.string.nonEmpty("");                      // ❌
validate.string.nonEmpty(null);                    // ❌
validate.string.nonEmpty(new String());            // ❌
```


### `validate.string.nonWhitespace(value, [fieldName], [defaultValue])`
Validates a string with at least one non-whitespace character.

- **value** - The value to validate
- **fieldName** - (optional) The name of the field being validated. This is used in the error message if invalid.
- **defaultValue** - (optional) The default value to use if `value` is `undefined`.

```javascript
import validate from "@code-engine/validate";

validate.string.nonWhitespace("John")                   // ✔
validate.string.nonWhitespace("  a  ")                  // ✔

validate.string.nonWhitespace("");                      // ❌
validate.string.nonWhitespace("    ");                  // ❌
validate.string.nonWhitespace("\n")                     // ❌
validate.string.nonWhitespace("\t")                     // ❌
validate.string.nonWhitespace(new String());            // ❌
```


### `validate.string.minLength(value, minLength, [fieldName], [defaultValue])`
Validates a string with at least the specified number of characters (including whitespace).

- **value** - The value to validate
- **minLength** - The minimum allowed length
- **fieldName** - (optional) The name of the field being validated. This is used in the error message if invalid.
- **defaultValue** - (optional) The default value to use if `value` is `undefined`.

```javascript
import validate from "@code-engine/validate";

validate.string.minLength("John", 1)                // ✔
validate.string.minLength("  a  ", 5)               // ✔
validate.string.minLength("", 0)                    // ✔

validate.string.minLength("", 1);                   // ❌
validate.string.minLength("John", 10);              // ❌
```


### `validate.string.maxLength(value, maxLength, [fieldName], [defaultValue])`
Validates a string with no more than the specified number of characters (including whitespace).

- **value** - The value to validate
- **maxLength** - The maximum allowed length
- **fieldName** - (optional) The name of the field being validated. This is used in the error message if invalid.
- **defaultValue** - (optional) The default value to use if `value` is `undefined`.

```javascript
import validate from "@code-engine/validate";

validate.string.maxLength("John", 10)               // ✔
validate.string.maxLength("  a  ", 5)               // ✔
validate.string.maxLength("", 50)                   // ✔

validate.string.maxLength("John Doe", 5);           // ❌
```


### `validate.string.length(value, minLength, maxLength, [fieldName], [defaultValue])`
Validates a string with the specified number of characters (including whitespace)

- **value** - The value to validate
- **minLength** - The minimum allowed length
- **maxLength** - The maximum allowed length
- **fieldName** - (optional) The name of the field being validated. This is used in the error message if invalid.
- **defaultValue** - (optional) The default value to use if `value` is `undefined`.

```javascript
import validate from "@code-engine/validate";

validate.string.length("John", 1, 10)            // ✔
validate.string.length("  a  ", 5, 25)           // ✔
validate.string.length("", 0, 100)               // ✔

validate.string.length("John Doe", 1, 5);        // ❌
```


### `validate.number(value, [fieldName], [defaultValue])`
This is an alias for [`validate.type.number()`](#validate-number-value-fieldname-defaultvalue)


### `validate.number.integer(value, [fieldName], [defaultValue])`
Validates an integer value (positive or negative).

- **value** - The value to validate
- **fieldName** - (optional) The name of the field being validated. This is used in the error message if invalid.
- **defaultValue** - (optional) The default value to use if `value` is `undefined`.

```javascript
import validate from "@code-engine/validate";

validate.number.integer(0);               // ✔
validate.number.integer(42);              // ✔
validate.number.integer(-42);             // ✔
validate.number.integer(12345.0);         // ✔

validate.number.integer(Math.PI);         // ❌
validate.number.integer(Infinity);        // ❌
```


### `validate.number.integer.positive(value, [fieldName], [defaultValue])`
Validates a positive integer value (one or more).

- **value** - The value to validate
- **fieldName** - (optional) The name of the field being validated. This is used in the error message if invalid.
- **defaultValue** - (optional) The default value to use if `value` is `undefined`.

```javascript
import validate from "@code-engine/validate";

validate.number.integer.positive(42);              // ✔
validate.number.integer.positive(12345.0);         // ✔

validate.number.integer.positive(0);               // ❌
validate.number.integer.positive(-42);             // ❌
```


### `validate.number.integer.nonNegative(value, [fieldName], [defaultValue])`
Validates an integer value that is zero or greater.

- **value** - The value to validate
- **fieldName** - (optional) The name of the field being validated. This is used in the error message if invalid.
- **defaultValue** - (optional) The default value to use if `value` is `undefined`.

```javascript
import validate from "@code-engine/validate";

validate.number.integer.nonNegative(0);               // ✔
validate.number.integer.nonNegative(42);              // ✔
validate.number.integer.nonNegative(12345.0);         // ✔

validate.number.integer.nonNegative(-42);             // ❌
```



Contributing
--------------------------
Contributions, enhancements, and bug-fixes are welcome!  [File an issue](https://github.com/CodeEngineOrg/code-engine-validate/issues) on GitHub and [submit a pull request](https://github.com/CodeEngineOrg/code-engine-validate/pulls).

#### Building
To build the project locally on your computer:

1. __Clone this repo__<br>
`git clone https://github.com/CodeEngineOrg/code-engine-validate.git`

2. __Install dependencies__<br>
`npm install`

3. __Build the code__<br>
`npm run build`

4. __Run the tests__<br>
`npm test`



License
--------------------------
@code-engine/validate is 100% free and open-source, under the [MIT license](LICENSE). Use it however you want.



Big Thanks To
--------------------------
Thanks to these awesome companies for their support of Open Source developers ❤

[![Travis CI](https://engine.codes/img/badges/travis-ci.svg)](https://travis-ci.com)
[![SauceLabs](https://engine.codes/img/badges/sauce-labs.svg)](https://saucelabs.com)
[![Coveralls](https://engine.codes/img/badges/coveralls.svg)](https://coveralls.io)
