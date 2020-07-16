import { humanize } from "@jsdevtools/humanize-anything";
import { ono } from "@jsdevtools/ono";
import { type } from "./type";

/**
 * Asserts that a value is an array.
 */
export interface AssertArray {
  /**
   * Asserts that a value is an array.
   */
  <T>(value: T[] | undefined, fieldName?: string, defaultValue?: T[]): T[];

  /**
   * Asserts that a value is an array.
   */
  (value: unknown, fieldName?: string, defaultValue?: unknown): unknown[];

  /**
   * Asserts that a value is an array with at least one item.
   */
  nonEmpty<T>(value: T[] | undefined, fieldName?: string, defaultValue?: T[]): T[];

  /**
   * Asserts that a value is an array with at least one item.
   */
  nonEmpty(value: unknown, fieldName?: string, defaultValue?: unknown): unknown[];

  /**
   * Asserts that a value is an array with at least the specified number of items.
   */
  minLength<T>(value: T[] | undefined, minLength: number, fieldName?: string, defaultValue?: T[]): T[];

  /**
   * Asserts that a value is an array with at least the specified number of items.
   */
  minLength(value: unknown, minLength: number, fieldName?: string, defaultValue?: unknown): unknown[];

  /**
   * Asserts that a value is an array with no more than the specified number of items.
   */
  maxLength<T>(value: T[] | undefined, maxLength: number, fieldName?: string, defaultValue?: T[]): T[];

  /**
   * Asserts that a value is an array with no more than the specified number of items.
   */
  maxLength(value: unknown, maxLength: number, fieldName?: string, defaultValue?: unknown): unknown[];

  /**
   * Asserts that a value is an array with the specified number of items.
   */
  length<T>(
    value: T[] | undefined, minLength: number, maxLength: number, fieldName?: string, defaultValue?: T[]): T[];

  /**
   * Asserts that a value is an array with the specified number of items.
   */
  length(value: unknown, minLength: number, maxLength: number, fieldName?: string, defaultValue?: unknown): unknown[];
}


/**
 * Asserts that a value is an array value (including empty arrays).
 */
export const array = type.array as AssertArray;
array.nonEmpty = assertNonEmpty;
array.minLength = assertMinLength;
array.maxLength = assertMaxLength;
Object.defineProperty(array, "length", { value: assertLength });


function assertNonEmpty<T>(value: T[] | undefined, fieldName = "value", defaultValue?: T[]): T[] {
  return assertArrayLength(value, 1, Infinity, fieldName, defaultValue);
}


function assertMinLength<T>(
  value: T[] | undefined, minLength: number, fieldName = "value", defaultValue?: T[]): T[] {
  return assertArrayLength(value, minLength, Infinity, fieldName, defaultValue);
}


function assertMaxLength<T>(
  value: T[] | undefined, maxLength: number, fieldName = "value", defaultValue?: T[]): T[] {
  return assertArrayLength(value, 0, maxLength, fieldName, defaultValue);
}


function assertLength<T>(
  value: T[] | undefined, minLength: number, maxLength?: number, fieldName = "value", defaultValue?: T[]): T[] {
  if (typeof maxLength === "string") {
    defaultValue = fieldName as unknown as T[];
    fieldName = maxLength;
    maxLength = undefined;
  }
  if (maxLength === undefined) {
    maxLength = minLength;
  }
  return assertArrayLength(value, minLength, maxLength, fieldName, defaultValue);
}


function assertArrayLength<T>(
  value: T[] | undefined, minLength = 1, maxLength = Infinity, fieldName = "value", defaultValue?: T[]): T[] {
  value = type.array(value, fieldName, defaultValue);

  if (value.length < minLength) {
    let minItems = minLength === 1 ? "1 item" : `${minLength} items`;

    if (minLength === 1) {
      throw ono.range(`Invalid ${fieldName}: ${humanize(value)}. It cannot be empty.`);
    }
    else if (minLength === maxLength) {
      throw ono.range(`Invalid ${fieldName}: ${humanize(value)}. It must have exactly ${minItems}.`);
    }
    else {
      throw ono.range(`Invalid ${fieldName}: ${humanize(value)}. It should have at least ${minItems}.`);
    }
  }
  else if (value.length > maxLength) {
    let maxItems = maxLength === 1 ? "1 item" : `${maxLength} items`;

    if (minLength === maxLength) {
      throw ono.range(`Invalid ${fieldName}: ${humanize(value)}. It must have exactly ${maxItems}.`);
    }
    else {
      throw ono.range(`Invalid ${fieldName}: ${humanize(value)}. It cannot have more than ${maxItems}.`);
    }
  }

  return value;
}
