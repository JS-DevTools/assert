import { humanize } from "@jsdevtools/humanize-anything";
import { ono } from "@jsdevtools/ono";
import { type } from "./type";

/**
 * Asserts that a value is a numeric value
 * (positive or negative, integer or float, finite or infinite, but **not** `NaN`).
 */
export interface AssertNumber {
  /**
   * Asserts that a value is a numeric value
   * (positive or negative, integer or float, finite or infinite, but **not** `NaN`).
   */
  <T extends number>(value: T | undefined, fieldName?: string, defaultValue?: T): T;

  /**
   * Asserts that a value is a numeric value
   * (positive or negative, integer or float, finite or infinite, but **not** `NaN`).
   */
  (value: unknown, fieldName?: string, defaultValue?: unknown): number;

  /**
   * Asserts that a value is an integer value (positive or negative).
   */
  integer: AssertInteger;

  /**
   * Asserts that a value is a positive number value (greater than zero).
   */
  positive<T extends number>(value: T | undefined, fieldName?: string, defaultValue?: T): T;

  /**
   * Asserts that a value is a positive number value (greater than zero).
   */
  positive(value: unknown, fieldName?: string, defaultValue?: unknown): number;

  /**
   * Asserts that a value is a number value that is zero or greater.
   */
  nonNegative<T extends number>(value: T | undefined, fieldName?: string, defaultValue?: T): T;

  /**
   * Asserts that a value is a number value that is zero or greater.
   */
  nonNegative(value: unknown, fieldName?: string, defaultValue?: unknown): number;
}

/**
 * Asserts that a value is an integer value (positive or negative).
 */
export interface AssertInteger {
  /**
   * Asserts that a value is an integer value (positive or negative).
   */
  <T extends number>(value: T | undefined, fieldName?: string, defaultValue?: T): T;

  /**
   * Asserts that a value is an integer value (positive or negative).
   */
  (value: unknown, fieldName?: string, defaultValue?: unknown): number;

  /**
   * Asserts that a value is a positive integer value (one or more).
   */
  positive<T extends number>(value: T | undefined, fieldName?: string, defaultValue?: T): T;

  /**
   * Asserts that a value is a positive integer value (one or more).
   */
  positive(value: unknown, fieldName?: string, defaultValue?: unknown): number;

  /**
   * Asserts that a value is an integer value that is zero or greater.
   */
  nonNegative<T extends number>(value: T | undefined, fieldName?: string, defaultValue?: T): T;

  /**
   * Asserts that a value is an integer value that is zero or greater.
   */
  nonNegative(value: unknown, fieldName?: string, defaultValue?: unknown): number;
}


/**
 * Asserts that a value is a numeric value
 * (positive or negative, integer or float, finite or infinite, but **not** `NaN`).
 */
// tslint:disable-next-line: variable-name
export const number = type.number as AssertNumber;
number.positive = assertPositiveNumber;
number.nonNegative = assertNonNegativeNumber;
number.integer = assertInteger as AssertInteger;
number.integer.positive = assertPositiveInteger;
number.integer.nonNegative = assertNonNegativeInteger;


function assertPositiveNumber(value: number | undefined, fieldName = "value", defaultValue?: number): number {
  value = type.number(value, fieldName, defaultValue);

  if (value <= 0) {
    throw ono.range(`Invalid ${fieldName}: ${humanize(value)}. Expected a positive number.`);
  }

  return value;
}


function assertNonNegativeNumber(value: number | undefined, fieldName = "value", defaultValue?: number): number {
  value = type.number(value, fieldName, defaultValue);

  if (value < 0) {
    throw ono.range(`Invalid ${fieldName}: ${humanize(value)}. Expected zero or greater.`);
  }

  return value;
}


function assertInteger(value: number | undefined, fieldName = "value", defaultValue?: number): number {
  value = type.number(value, fieldName, defaultValue);

  if (!Number.isInteger(value)) {
    throw ono.type(`Invalid ${fieldName}: ${humanize(value)}. Expected an integer.`);
  }

  return value;
}


function assertPositiveInteger(value: number | undefined, fieldName = "value", defaultValue?: number): number {
  value = assertInteger(value, fieldName, defaultValue);

  if (value < 1) {
    throw ono.range(`Invalid ${fieldName}: ${humanize(value)}. Expected a positive integer.`);
  }

  return value;
}


function assertNonNegativeInteger(value: number | undefined, fieldName = "value", defaultValue?: number): number {
  value = assertInteger(value, fieldName, defaultValue);

  if (value < 0) {
    throw ono.range(`Invalid ${fieldName}: ${humanize(value)}. Expected zero or greater.`);
  }

  return value;
}
