// tslint:disable: ban-types no-null-undefined-union
import stringify from "@code-engine/stringify";
import { ono } from "@jsdevtools/ono";
import { value as validateValue } from "./value";

/**
 * Validates a value that is the specified type.
 */
export interface ValidateType {
  /**
   * Validates a value that is the specified type.
   */
  <T>(value: T | undefined, type: Function | undefined | null, fieldName?: string, defaultValue?: T): T;

  /**
   * Validates a value that is one of the specified types.
   */
  oneOf<T>(value: T | undefined, types: Array<Function | undefined | null>, fieldName?: string, defaultValue?: T): T;

  /**
   * Validates a string value (including empty strings).
   */
  string<T extends string>(value: T | undefined, fieldName?: string, defaultValue?: T): T;

  /**
   * Validates a numeric value (positive or negative, integer or float, finite or infinite, but **not** `NaN`).
   */
  number<T extends number>(value: T | undefined, fieldName?: string, defaultValue?: T): T;

  /**
   * Validates a boolean value (must be exactly `true` or `false`, not just "truthy" or "falsy").
   */
  boolean<T extends boolean>(value: T | undefined, fieldName?: string, defaultValue?: T): T;

  /**
   * Validates any object value (including empty objects, but **not** including `null`).
   */
  object<T extends object>(value: T | undefined, fieldName?: string, defaultValue?: T): T;

  /**
   * Validates any function value (including classes, async functions, arrow functions, generator functions).
   */
  function<T extends Function>(value: T | undefined, fieldName?: string, defaultValue?: T): T;
}


/**
 * Validates a value that is the specified type.
 */
export const type = validateType as ValidateType;
type.oneOf = validateTypeOneOf;
type.string = validateString;
type.number = validateNumber;
type.boolean = validateBoolean;
type.object = validateObject;
type.function = validateFunction;


function validateString<T extends string>(value: T | undefined, fieldName = "value", defaultValue?: T): T {
  value = validateValue(value, fieldName, defaultValue);

  if (typeof value !== "string") {
    throw ono.type(`Invalid ${fieldName}: ${stringify(value)}. Expected a string.`);
  }

  return value;
}


function validateNumber<T extends number>(value: T | undefined, fieldName = "value", defaultValue?: T): T {
  value = validateValue(value, fieldName, defaultValue);

  if (typeof value !== "number" || Number.isNaN(value)) {
    throw ono.type(`Invalid ${fieldName}: ${stringify(value)}. Expected a number.`);
  }

  return value;
}


function validateBoolean<T extends boolean>(value: T | undefined, fieldName = "value", defaultValue?: T): T {
  value = validateValue(value, fieldName, defaultValue);

  if (typeof value !== "boolean") {
    throw ono.type(`Invalid ${fieldName}: ${stringify(value)}. Expected a boolean.`);
  }

  return value;
}


function validateObject<T extends object>(value: T | undefined, fieldName = "value", defaultValue?: T): T {
  value = validateValue(value, fieldName, defaultValue);

  if (typeof value !== "object" || value === null) {
    throw ono.type(`Invalid ${fieldName}: ${stringify(value)}. Expected an object.`);
  }

  return value;
}


function validateFunction<T extends Function>(value: T | undefined, fieldName = "value", defaultValue?: T): T {
  value = validateValue(value, fieldName, defaultValue);

  if (typeof value !== "function") {
    throw ono.type(`Invalid ${fieldName}: ${stringify(value)}. Expected a function.`);
  }

  return value;
}


function validateType<T>(
value: T | undefined, type: Function | undefined | null, fieldName = "value", defaultValue?: T): T {  // tslint:disable-line: no-shadowed-variable
  return validateTypeOneOf(value, [type], fieldName, defaultValue);
}


function validateTypeOneOf<T>(
value: T | undefined, types: Array<Function | undefined | null>, fieldName = "value", defaultValue?: T): T {
  if (value === undefined && defaultValue !== undefined) {
    value = defaultValue;
  }

  // Separate the types by category
  let specialValues = [], primitiveTypes: string[] = [], constructors = [];
  for (let t of types) {
    if (typeof t === "function") {
      constructors.push(t);

      // tslint:disable-next-line: switch-default
      switch (t) {
        case String:
          primitiveTypes.push("string");
          break;
        case Number:
          primitiveTypes.push("number");
          break;
        case Boolean:
          primitiveTypes.push("boolean");
          break;
        case BigInt:
          primitiveTypes.push("bigint");
          break;
        case Symbol:
          primitiveTypes.push("symbol");
          break;
      }
    }
    else {
      specialValues.push(t);
    }
  }

  // Check for "special" values
  if (specialValues.includes(value as undefined)) {
    return value as T;
  }

  // Check for primitive types
  if (primitiveTypes.includes(typeof value)) {
    return value as T;
  }

  // Check for instance types
  if (constructors.some((ctor) => value instanceof ctor)) {
    return value as T;
  }

  // If we get here, then the value is not an allowed type
  throw ono.type(
    `Invalid ${fieldName}: ${stringify(value)}. Expected ${getTypeList(primitiveTypes, constructors, specialValues)}.`
  );
}

function getTypeList(
primitiveTypes: string[], constructors: Function[], specialValues: Array<null | undefined>): string {
  if (primitiveTypes.length === 0 && constructors.length === 0) {
    return stringify.list(specialValues.map(String), { conjunction: "or" });
  }
  else {
    let typeNames = [
      ...primitiveTypes,
      ...constructors.map(stringify.function).filter((name) => !primitiveTypes.includes(name.toLowerCase())),
      ...specialValues.map(String),
    ];

    let typeList = stringify.list(typeNames, { conjunction: "or" });

    if (["a", "e", "i", "o", "u"].includes(typeList[0].toLowerCase())) {
      return `an ${typeList}`;
    }
    else {
      return `a ${typeList}`;
    }
  }
}
