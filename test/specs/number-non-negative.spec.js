"use strict";

const { assert } = require("../../lib");
const { expect } = require("chai");

describe("assert.number.nonNegative()", () => {

  it("should assert zero", () => {
    expect(assert.number.nonNegative(0)).to.equal(0);
    expect(assert.number.nonNegative(0.0)).to.equal(0);
  });

  it("should assert non-negative numbers", () => {
    expect(assert.number.nonNegative(0)).to.equal(0);
    expect(assert.number.nonNegative(0.0)).to.equal(0);
    expect(assert.number.nonNegative(1.0)).to.equal(1);
    expect(assert.number.nonNegative(1.00001)).to.equal(1.00001);
    expect(assert.number.nonNegative(4.2)).to.equal(4.2);
    expect(assert.number.nonNegative(12345.6789)).to.equal(12345.6789);
    expect(assert.number.nonNegative(Number.MAX_VALUE)).to.equal(Number.MAX_VALUE);
    expect(assert.number.nonNegative(Math.PI)).to.equal(Math.PI);
  });

  it("should throw an error for negative numbers", () => {
    function negative (value) {
      return () => {
        assert.number.nonNegative(value);
      };
    }

    expect(negative(-1)).to.throw(RangeError, "Invalid value: -1. Expected zero or greater.");
    expect(negative(Number.MIN_SAFE_INTEGER)).to.throw(RangeError, "Invalid value: -9007199254740991. Expected zero or greater.");
  });

  it("should throw an error for invalid defaults", () => {
    function negative (defaultValue) {
      return () => {
        assert.number.nonNegative(undefined, "age", defaultValue);
      };
    }

    expect(negative(-1)).to.throw(RangeError, "Invalid age: -1. Expected zero or greater.");
    expect(negative(Number.MIN_SAFE_INTEGER)).to.throw(RangeError, "Invalid age: -9007199254740991. Expected zero or greater.");
  });

});
