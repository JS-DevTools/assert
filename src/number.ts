import { humanize } from "@jsdevtools/humanize-anything";
import { ono } from "@jsdevtools/ono";
import { type } from "./type";

/**
 * Validates a numeric value (positive or negative, integer or float, finite or infinite, but **not** `NaN`).
 */
export interface ValidateNumber {
  /**
   * Validates a numeric value (positive or negative, integer or float, finite or infinite, but **not** `NaN`).
   */
  <T extends number>(value: T | undefined, fieldName?: string, defaultValue?: T): T;

  /**
   * Validates an integer value (positive or negative).
   */
  integer: ValidateInteger;
}

/**
 * Validates an integer value (positive or negative).
 */
export interface ValidateInteger {
  /**
   * Validates an integer value (positive or negative).
   */
  <T extends number>(value: T | undefined, fieldName?: string, defaultValue?: T): T;

  /**
   * Validates a positive integer value (one or more).
   */
  positive<T extends number>(value: T | undefined, fieldName?: string, defaultValue?: T): T;

  /**
   * Validates an integer value that is zero or greater.
   */
  nonNegative<T extends number>(value: T | undefined, fieldName?: string, defaultValue?: T): T;
}


/**
 * Validates a numeric value (positive or negative, integer or float, finite or infinite, but **not** `NaN`).
 */
// tslint:disable-next-line: variable-name
export const number = type.number as ValidateNumber;
number.integer = validateInteger as ValidateInteger;
number.integer.positive = validatePositiveInteger;
number.integer.nonNegative = validateNonNegativeInteger;


function validateInteger<T extends number>(value: T | undefined, fieldName = "value", defaultValue?: T): T {
  value = type.number(value, fieldName, defaultValue);

  if (!Number.isInteger(value)) {
    throw ono.type(`Invalid ${fieldName}: ${humanize(value)}. Expected an integer.`);
  }

  return value;
}


function validatePositiveInteger<T extends number>(value: T | undefined, fieldName = "value", defaultValue?: T): T {
  value = validateInteger(value, fieldName, defaultValue);

  if (value as number < 1) {
    throw ono.range(`Invalid ${fieldName}: ${humanize(value)}. Expected a positive integer.`);
  }

  return value;
}


function validateNonNegativeInteger<T extends number>(value: T | undefined, fieldName = "value", defaultValue?: T): T {
  value = validateInteger(value, fieldName, defaultValue);

  if (value as number < 0) {
    throw ono.range(`Invalid ${fieldName}: ${humanize(value)}. Expected zero or greater.`);
  }

  return value;
}
