"use strict";

const { validate } = require("../../lib");
const { expect } = require("chai");

describe("validate.number.integer.nonNegative()", () => {

  it("should validate zero", () => {
    expect(validate.number.integer.nonNegative(0)).to.equal(0);
    expect(validate.number.integer.nonNegative(0.0)).to.equal(0);
  });

  it("should validate non-negative integers", () => {
    expect(validate.number.integer.nonNegative(0)).to.equal(0);
    expect(validate.number.integer.nonNegative(0.0)).to.equal(0);
    expect(validate.number.integer.nonNegative(1.0)).to.equal(1);
    expect(validate.number.integer.nonNegative(42)).to.equal(42);
    expect(validate.number.integer.nonNegative(100)).to.equal(100);
    expect(validate.number.integer.nonNegative(Number.MAX_VALUE)).to.equal(Number.MAX_VALUE);
    expect(validate.number.integer.nonNegative(Number.MAX_SAFE_INTEGER)).to.equal(Number.MAX_SAFE_INTEGER);
  });

  it("should throw an error for negative numbers", () => {
    function negative (value) {
      return () => {
        validate.number.integer.nonNegative(value);
      };
    }

    expect(negative(-1)).to.throw(RangeError, "Invalid value: -1. Expected zero or greater.");
    expect(negative(Number.MIN_SAFE_INTEGER)).to.throw(RangeError, "Invalid value: -9007199254740991. Expected zero or greater.");
  });

  it("should throw an error for invalid defaults", () => {
    function negative (defaultValue) {
      return () => {
        validate.number.integer.nonNegative(undefined, "age", defaultValue);
      };
    }

    expect(negative(-1)).to.throw(RangeError, "Invalid age: -1. Expected zero or greater.");
    expect(negative(Number.MIN_SAFE_INTEGER)).to.throw(RangeError, "Invalid age: -9007199254740991. Expected zero or greater.");
  });

});
