"use strict";

const { assert } = require("../../lib");
const { expect } = require("chai");

describe("assert.number.integer.nonNegative()", () => {

  it("should assert zero", () => {
    expect(assert.number.integer.nonNegative(0)).to.equal(0);
    expect(assert.number.integer.nonNegative(0.0)).to.equal(0);
  });

  it("should assert non-negative integers", () => {
    expect(assert.number.integer.nonNegative(0)).to.equal(0);
    expect(assert.number.integer.nonNegative(0.0)).to.equal(0);
    expect(assert.number.integer.nonNegative(1.0)).to.equal(1);
    expect(assert.number.integer.nonNegative(42)).to.equal(42);
    expect(assert.number.integer.nonNegative(100)).to.equal(100);
    expect(assert.number.integer.nonNegative(Number.MAX_VALUE)).to.equal(Number.MAX_VALUE);
    expect(assert.number.integer.nonNegative(Number.MAX_SAFE_INTEGER)).to.equal(Number.MAX_SAFE_INTEGER);
  });

  it("should throw an error for negative numbers", () => {
    function negative (value) {
      return () => {
        assert.number.integer.nonNegative(value);
      };
    }

    expect(negative(-1)).to.throw(RangeError, "Invalid value: -1. Expected zero or greater.");
    expect(negative(Number.MIN_SAFE_INTEGER)).to.throw(RangeError, "Invalid value: -9007199254740991. Expected zero or greater.");
  });

  it("should throw an error for invalid defaults", () => {
    function negative (defaultValue) {
      return () => {
        assert.number.integer.nonNegative(undefined, "age", defaultValue);
      };
    }

    expect(negative(-1)).to.throw(RangeError, "Invalid age: -1. Expected zero or greater.");
    expect(negative(Number.MIN_SAFE_INTEGER)).to.throw(RangeError, "Invalid age: -9007199254740991. Expected zero or greater.");
  });

});
