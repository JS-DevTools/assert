import { humanize } from "@jsdevtools/humanize-anything";
import { ono } from "@jsdevtools/ono";
import { type } from "./type";

/**
 * Asserts that a value is a string value (including empty strings).
 */
export interface AssertString {
  /**
   * Asserts that a value is a string value (including empty strings).
   */
  <T extends string>(value: T | undefined, fieldName?: string, defaultValue?: T): T;

  /**
   * Asserts that a value is a string value (including empty strings).
   */
  (value: unknown, fieldName?: string, defaultValue?: unknown): string;

  /**
   * Asserts that a value is a string with at least one character (including whitespace).
   */
  nonEmpty<T extends string>(value: T | undefined, fieldName?: string, defaultValue?: T): T;

  /**
   * Asserts that a value is a string with at least one character (including whitespace).
   */
  nonEmpty(value: unknown, fieldName?: string, defaultValue?: unknown): string;

  /**
   * Asserts that a value is a string with at least one non-whitespace character.
   */
  nonWhitespace<T extends string>(value: T | undefined, fieldName?: string, defaultValue?: T): T;

  /**
   * Asserts that a value is a string with at least one non-whitespace character.
   */
  nonWhitespace(value: unknown, fieldName?: string, defaultValue?: unknown): string;

  /**
   * Asserts that a value is a string with at least the specified number of characters.
   */
  minLength<T extends string>(value: T | undefined, minLength: number, fieldName?: string, defaultValue?: T): T;

  /**
   * Asserts that a value is a string with at least the specified number of characters.
   */
  minLength(value: unknown, minLength: number, fieldName?: string, defaultValue?: unknown): string;

  /**
   * Asserts that a value is a string with no more than the specified number of characters.
   */
  maxLength<T extends string>(value: T | undefined, maxLength: number, fieldName?: string, defaultValue?: T): T;

  /**
   * Asserts that a value is a string with no more than the specified number of characters.
   */
  maxLength(value: unknown, maxLength: number, fieldName?: string, defaultValue?: unknown): string;

  /**
   * Asserts that a value is a string with the specified number of characters.
   */
  length<T extends string>(
    value: T | undefined, minLength: number, maxLength: number, fieldName?: string, defaultValue?: T): T;

  /**
   * Asserts that a value is a string with the specified number of characters.
   */
  length(value: unknown, minLength: number, maxLength: number, fieldName?: string, defaultValue?: unknown): string;
}


/**
 * Asserts that a value is a string value (including empty strings).
 */
// tslint:disable-next-line: variable-name
export const string = type.string as AssertString;
string.nonEmpty = assertNonEmpty;
string.nonWhitespace = assertNonWhitespace;
string.minLength = assertMinLength;
string.maxLength = assertMaxLength;
Object.defineProperty(string, "length", { value: assertLength });


function assertNonEmpty<T extends string>(value: T | undefined, fieldName = "value", defaultValue?: T): T {
  return assertStringLength(value, 1, Infinity, fieldName, defaultValue);
}


function assertMinLength<T extends string>(
value: T | undefined, minLength: number, fieldName = "value", defaultValue?: T): T {
  return assertStringLength(value, minLength, Infinity, fieldName, defaultValue);
}


function assertMaxLength<T extends string>(
value: T | undefined, maxLength: number, fieldName = "value", defaultValue?: T): T {
  return assertStringLength(value, 0, maxLength, fieldName, defaultValue);
}


function assertLength<T extends string>(
value: T | undefined, minLength: number, maxLength?: number, fieldName = "value", defaultValue?: T): T {
  if (typeof maxLength === "string") {
    defaultValue = fieldName as T;
    fieldName = maxLength;
    maxLength = undefined;
  }
  if (maxLength === undefined) {
    maxLength = minLength;
  }
  return assertStringLength(value, minLength, maxLength, fieldName, defaultValue);
}


function assertNonWhitespace<T extends string>(value: T | undefined, fieldName = "value", defaultValue?: T): T {
  value = assertNonEmpty(value, fieldName, defaultValue);

  if (value.trimStart().length === 0) {
    throw ono(`Invalid ${fieldName}: ${humanize(value)}. It cannot be all whitespace.`);
  }

  return value;
}


function assertStringLength<T extends string>(
value: T | undefined, minLength = 1, maxLength = Infinity, fieldName = "value", defaultValue?: T): T {
  value = type.string(value, fieldName, defaultValue);

  if (value.length < minLength) {
    let minChars = minLength === 1 ? "1 character" : `${minLength} characters`;

    if (minLength === 1) {
      throw ono.range(`Invalid ${fieldName}: ${humanize(value)}. It cannot be empty.`);
    }
    else if (minLength === maxLength) {
      throw ono.range(`Invalid ${fieldName}: ${humanize(value)}. It must be exactly ${minChars}.`);
    }
    else {
      throw ono.range(`Invalid ${fieldName}: ${humanize(value)}. It should be at least ${minChars}.`);
    }
  }
  else if (value.length > maxLength) {
    let maxChars = maxLength === 1 ? "1 character" : `${maxLength} characters`;

    if (minLength === maxLength) {
      throw ono.range(`Invalid ${fieldName}: ${humanize(value)}. It must be exactly ${maxChars}.`);
    }
    else {
      throw ono.range(`Invalid ${fieldName}: ${humanize(value)}. It cannot be more than ${maxChars}.`);
    }
  }

  return value;
}
