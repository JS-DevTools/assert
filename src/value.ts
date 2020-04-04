// tslint:disable: no-shadowed-variable
import { humanize } from "@jsdevtools/humanize-anything";
import { ono } from "@jsdevtools/ono";

/**
 * Asserts that value is not `undefined` (even `null` and `NaN`).
 */
export interface AssertValue {
  /**
   * Asserts that a value is not `undefined` (even `null` and `NaN`).
   */
  <T>(value: T | undefined, fieldName?: string, defaultValue?: T): T;

  /**
   * Asserts that a value is one of the specified values.
   */
  oneOf<T>(value: T | undefined, values: T[], fieldName?: string, defaultValue?: T): T;
}


/**
 * Asserts that a value is not `undefined` (even `null` and `NaN`).
 */
export const value = assertHasValue as AssertValue;
value.oneOf = assertOneOf;


function assertHasValue<T>(value: T | undefined, fieldName = "value", defaultValue?: T): T {
  if (value === undefined) {
    value = defaultValue;
  }

  if (value === undefined) {
    throw ono.type(`Invalid ${fieldName}: ${humanize(value)}. A value is required.`);
  }

  return value;
}


function assertOneOf<T>(value: T | undefined, values: T[], fieldName = "value", defaultValue?: T): T {
  value = assertHasValue(value, fieldName, defaultValue);

  if (!values.includes(value)) {
    throw ono.type(
      `Invalid ${fieldName}: ${humanize(value)}. ` +
      `Expected ${humanize.values(values, { conjunction: "or" })}.`
    );
  }

  return value;
}
