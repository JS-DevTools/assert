import { humanize } from "@jsdevtools/humanize-anything";
import { ono } from "@jsdevtools/ono";
import { type } from "./type";

/**
 * Validates a string value (including empty strings).
 */
export interface ValidateString {
  /**
   * Validates a string value (including empty strings).
   */
  <T extends string>(value: T | undefined, fieldName?: string, defaultValue?: T): T;

  /**
   * Validates a string with at least one character (including whitespace).
   */
  nonEmpty<T extends string>(value: T | undefined, fieldName?: string, defaultValue?: T): T;

  /**
   * Validates a string with at least one non-whitespace character.
   */
  nonWhitespace<T extends string>(value: T | undefined, fieldName?: string, defaultValue?: T): T;

  /**
   * Validates a string with at least the specified number of characters.
   */
  minLength<T extends string>(value: T | undefined, minLength: number, fieldName?: string, defaultValue?: T): T;

  /**
   * Validates a string with no more than the specified number of characters.
   */
  maxLength<T extends string>(value: T | undefined, maxLength: number, fieldName?: string, defaultValue?: T): T;

  /**
   * Validates a string with the specified number of characters.
   */
  length<T extends string>(
    value: T | undefined, minLength: number, maxLength: number, fieldName?: string, defaultValue?: T): T;
}


/**
 * Validates a string value (including empty strings).
 */
// tslint:disable-next-line: variable-name
export const string = type.string as ValidateString;
string.nonEmpty = validateNonEmpty;
string.nonWhitespace = validateNonWhitespace;
string.minLength = validateMinLength;
string.maxLength = validateMaxLength;
Object.defineProperty(string, "length", { value: validateLength });


function validateNonEmpty<T extends string>(value: T | undefined, fieldName = "value", defaultValue?: T): T {
  return validateLength(value, 1, Infinity, fieldName, defaultValue);
}


function validateMinLength<T extends string>(
value: T | undefined, minLength: number, fieldName = "value", defaultValue?: T): T {
  return validateLength(value, minLength, Infinity, fieldName, defaultValue);
}


function validateMaxLength<T extends string>(
value: T | undefined, maxLength: number, fieldName = "value", defaultValue?: T): T {
  return validateLength(value, 0, maxLength, fieldName, defaultValue);
}


function validateNonWhitespace<T extends string>(value: T | undefined, fieldName = "value", defaultValue?: T): T {
  value = validateNonEmpty(value, fieldName, defaultValue);

  if (value.trimStart().length === 0) {
    throw ono(`Invalid ${fieldName}: ${humanize(value)}. It cannot be all whitespace.`);
  }

  return value;
}


function validateLength<T extends string>(
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
