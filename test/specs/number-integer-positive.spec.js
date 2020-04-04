"use strict";

const { assert } = require("../../");
const { expect } = require("chai");

describe("assert.number.integer.positive()", () => {

  it("should assert positive integers", () => {
    expect(assert.number.integer.positive(1.0)).to.equal(1);
    expect(assert.number.integer.positive(42)).to.equal(42);
    expect(assert.number.integer.positive(100)).to.equal(100);
    expect(assert.number.integer.positive(Number.MAX_VALUE)).to.equal(Number.MAX_VALUE);
    expect(assert.number.integer.positive(Number.MAX_SAFE_INTEGER)).to.equal(Number.MAX_SAFE_INTEGER);
  });

  it("should throw an error for negative numbers", () => {
    function negative (value) {
      return () => {
        assert.number.integer.positive(value);
      };
    }

    expect(negative(-1)).to.throw(RangeError, "Invalid value: -1. Expected a positive integer.");
    expect(negative(Number.MIN_SAFE_INTEGER)).to.throw(RangeError, "Invalid value: -9007199254740991. Expected a positive integer.");
  });

  it("should throw an error for invalid defaults", () => {
    function negative (defaultValue) {
      return () => {
        assert.number.integer.positive(undefined, "age", defaultValue);
      };
    }

    expect(negative(-1)).to.throw(RangeError, "Invalid age: -1. Expected a positive integer.");
    expect(negative(Number.MIN_SAFE_INTEGER)).to.throw(RangeError, "Invalid age: -9007199254740991. Expected a positive integer.");
  });

});
