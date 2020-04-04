import { array, AssertArray } from "./array";
import { AssertNumber, number } from "./number";
import { AssertString, string } from "./string";
import { AssertType, type } from "./type";
import { AssertValue, value } from "./value";

/**
 * An assertion library with user-friendly error messages
 */
export interface Assert {
  /**
   * Asserts that value is not `undefined` (even `null` and `NaN`).
   */
  value: AssertValue;

  /**
   * Asserts that a value is the specified type.
   */
  type: AssertType;

  /**
   * Asserts that a value is a string value (including empty strings).
   */
  string: AssertString;

  /**
   * Asserts that a value is a numeric value
   * (positive or negative, integer or float, finite or infinite, but **not** `NaN`).
   */
  number: AssertNumber;

  /**
   * Asserts that a value is an array
   */
  array: AssertArray;
}

/**
 * An assertion library with user-friendly error messages
 */
export const assert: Assert = {
  value,
  type,
  string,
  number,
  array,
};
