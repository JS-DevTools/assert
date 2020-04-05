"use strict";

const { assert } = require("../../lib");
const { expect } = require("chai");

describe("assert.number.positive()", () => {

  it("should assert positive integers", () => {
    expect(assert.number.positive(1)).to.equal(1);
    expect(assert.number.positive(4.2)).to.equal(4.2);
    expect(assert.number.positive(1234.5678)).to.equal(1234.5678);
    expect(assert.number.positive(Number.MAX_VALUE)).to.equal(Number.MAX_VALUE);
    expect(assert.number.positive(Math.PI)).to.equal(Math.PI);
  });

  it("should throw an error for negative numbers", () => {
    function negative (value) {
      return () => {
        assert.number.positive(value);
      };
    }

    expect(negative(0)).to.throw(RangeError, "Invalid value: 0. Expected a positive number.");
    expect(negative(-1)).to.throw(RangeError, "Invalid value: -1. Expected a positive number.");
    expect(negative(Number.MIN_SAFE_INTEGER)).to.throw(RangeError, "Invalid value: -9007199254740991. Expected a positive number.");
  });

  it("should throw an error for invalid defaults", () => {
    function negative (defaultValue) {
      return () => {
        assert.number.positive(undefined, "age", defaultValue);
      };
    }

    expect(negative(0)).to.throw(RangeError, "Invalid age: 0. Expected a positive number.");
    expect(negative(-1)).to.throw(RangeError, "Invalid age: -1. Expected a positive number.");
    expect(negative(Number.MIN_SAFE_INTEGER)).to.throw(RangeError, "Invalid age: -9007199254740991. Expected a positive number.");
  });

});
