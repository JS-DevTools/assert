// tslint:disable: no-shadowed-variable
import { humanize } from "@jsdevtools/humanize-anything";
import { ono } from "@jsdevtools/ono";

/**
 * Validates any value that is not `undefined` (even `null` and `NaN`).
 */
export interface ValidateValue {
  /**
   * Validates any value that is not `undefined` (even `null` and `NaN`).
   */
  <T>(value: T | undefined, fieldName?: string, defaultValue?: T): T;

  /**
   * Validates a value that is one of the specified values.
   */
  oneOf<T>(value: T | undefined, values: T[], fieldName?: string, defaultValue?: T): T;
}


/**
 * Validates any value that is not `undefined` (even `null` and `NaN`).
 */
export const value = validateHasValue as ValidateValue;
value.oneOf = validateOneOf;


function validateHasValue<T>(value: T | undefined, fieldName = "value", defaultValue?: T): T {
  if (value === undefined) {
    value = defaultValue;
  }

  if (value === undefined) {
    throw ono.type(`Invalid ${fieldName}: ${humanize(value)}. A value is required.`);
  }

  return value;
}


function validateOneOf<T>(value: T | undefined, values: T[], fieldName = "value", defaultValue?: T): T {
  value = validateHasValue(value, fieldName, defaultValue);

  if (!values.includes(value)) {
    throw ono.type(
      `Invalid ${fieldName}: ${humanize(value)}. ` +
      `Expected ${humanize.values(values, { conjunction: "or" })}.`
    );
  }

  return value;
}
