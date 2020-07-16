import { humanize } from "@jsdevtools/humanize-anything";
import { ono } from "@jsdevtools/ono";
import { value as assertValue } from "./value";

/**
 * Asserts that a value is the specified type.
 */
export interface AssertType {
  /**
   * Asserts that a value is the specified type.
   */
  <T>(value: T | undefined, type: Function | undefined | null, fieldName?: string, defaultValue?: T): T;

  /**
   * Asserts that a value is one of the specified types.
   */
  oneOf<T>(value: T | undefined, types: Array<Function | undefined | null>, fieldName?: string, defaultValue?: T): T;

  /**
   * Asserts that a value is a string (including empty strings).
   */
  string<T extends string>(value: T | undefined, fieldName?: string, defaultValue?: T): T;

  /**
   * Asserts that a value is a string (including empty strings).
   */
  string(value: unknown, fieldName?: string, defaultValue?: unknown): string;

  /**
   * Asserts that a value is a numeric value
   * (positive or negative, integer or float, finite or infinite, but **not** `NaN`).
   */
  number<T extends number>(value: T | undefined, fieldName?: string, defaultValue?: T): T;

  /**
   * Asserts that a value is a numeric value
   * (positive or negative, integer or float, finite or infinite, but **not** `NaN`).
   */
  number(value: unknown, fieldName?: string, defaultValue?: unknown): number;

  /**
   * Asserts that a value is a boolean (must be exactly `true` or `false`, not just "truthy" or "falsy").
   */
  boolean<T extends boolean>(value: T | undefined, fieldName?: string, defaultValue?: T): T;

  /**
   * Asserts that a value is a boolean (must be exactly `true` or `false`, not just "truthy" or "falsy").
   */
  boolean(value: unknown, fieldName?: string, defaultValue?: unknown): boolean;

  /**
   * Asserts that a value is an object (including empty objects, but **not** including `null`).
   */
  object<T extends object>(value: T | undefined, fieldName?: string, defaultValue?: T): T;

  /**
   * Asserts that a value is an object (including empty objects, but **not** including `null`).
   */
  object(value: unknown, fieldName?: string, defaultValue?: unknown): object;

  /**
   * Asserts that a value is an array.
   */
  array<T>(value: T[] | undefined, fieldName?: string, defaultValue?: T[]): T[];

  /**
   * Asserts that a value is an array.
   */
  array(value: unknown, fieldName?: string, defaultValue?: unknown): unknown[];

  /**
   * Asserts that a value is a function (including classes, async functions, arrow functions, generator functions).
   */
  function<T extends Function>(value: T | undefined, fieldName?: string, defaultValue?: T): T;

  /**
   * Asserts that a value is a function (including classes, async functions, arrow functions, generator functions).
   */
  function(value: unknown, fieldName?: string, defaultValue?: unknown): Function;
}


/**
 * Asserts that a value is the specified type.
 */
export const type = assertType as AssertType;
type.oneOf = assertTypeOneOf;
type.string = assertString;
type.number = assertNumber;
type.boolean = assertBoolean;
type.object = assertObject;
type.array = assertArray;
type.function = assertFunction;


function assertString(value: string | undefined, fieldName = "value", defaultValue?: string): string {
  value = assertValue(value, fieldName, defaultValue);

  if (typeof value !== "string") {
    throw ono.type(`Invalid ${fieldName}: ${humanize(value)}. Expected a string.`);
  }

  return value;
}


function assertNumber(value: number | undefined, fieldName = "value", defaultValue?: number): number {
  value = assertValue(value, fieldName, defaultValue);

  if (typeof value !== "number" || Number.isNaN(value)) {
    let humanized = (value as unknown) instanceof Number ? "Number" : humanize(value);
    throw ono.type(`Invalid ${fieldName}: ${humanized}. Expected a number.`);
  }

  return value;
}


function assertBoolean(value: boolean | undefined, fieldName = "value", defaultValue?: boolean): boolean {
  value = assertValue(value, fieldName, defaultValue);

  if (typeof value !== "boolean") {
    let humanized = (value as unknown) instanceof Boolean ? "Boolean" : humanize(value);
    throw ono.type(`Invalid ${fieldName}: ${humanized}. Expected a boolean.`);
  }

  return value;
}


function assertObject(value: object | undefined, fieldName = "value", defaultValue?: object): object {
  value = assertValue(value, fieldName, defaultValue);

  if (typeof value !== "object" || value === null) {
    throw ono.type(`Invalid ${fieldName}: ${humanize(value)}. Expected an object.`);
  }

  return value;
}


function assertArray(value: unknown[] | undefined, fieldName = "value", defaultValue?: unknown[]): unknown[] {
  value = assertValue(value, fieldName, defaultValue);

  if (!Array.isArray(value)) {
    throw ono.type(`Invalid ${fieldName}: ${humanize(value)}. Expected an array.`);
  }

  return value;
}


function assertFunction(value: Function | undefined, fieldName = "value", defaultValue?: Function): Function {
  value = assertValue(value, fieldName, defaultValue);

  if (typeof value !== "function") {
    throw ono.type(`Invalid ${fieldName}: ${humanize(value)}. Expected a function.`);
  }

  return value;
}


function assertType<T>(
  value: T | undefined, type: Function | undefined | null, fieldName = "value", defaultValue?: T): T {
  return assertTypeOneOf(value, [type], fieldName, defaultValue);
}


function assertTypeOneOf<T>(
  value: T | undefined, types: Array<Function | undefined | null>, fieldName = "value", defaultValue?: T): T {
  if (value === undefined && defaultValue !== undefined) {
    value = defaultValue;
  }

  // Separate the types by category
  let specialValues = [], primitiveTypes: string[] = [], constructors = [];
  for (let t of types) {
    if (typeof t === "function") {
      constructors.push(t);

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
    `Invalid ${fieldName}: ${humanize(value)}. Expected ${getTypeList(primitiveTypes, constructors, specialValues)}.`
  );
}

function getTypeList(
  primitiveTypes: string[], constructors: Function[], specialValues: Array<null | undefined>): string {
  if (primitiveTypes.length === 0 && constructors.length === 0) {
    return humanize.list(specialValues.map(String), { conjunction: "or" });
  }
  else {
    let typeNames = [
      ...primitiveTypes,
      ...constructors.map(humanize.function).filter((name) => !primitiveTypes.includes(name.toLowerCase())),
      ...specialValues.map(String),
    ];

    let typeList = humanize.list(typeNames, { conjunction: "or" });

    if (["a", "e", "i", "o", "u"].includes(typeList[0].toLowerCase())) {
      return `an ${typeList}`;
    }
    else {
      return `a ${typeList}`;
    }
  }
}
