"use strict";

const { validate } = require("../../");
const { expect } = require("chai");

describe("validate.number.integer()", () => {

  it("should validate integers", () => {
    expect(validate.number.integer(1.0)).to.equal(1);
    expect(validate.number.integer(42)).to.equal(42);
    expect(validate.number.integer(-100)).to.equal(-100);
    expect(validate.number.integer(-1)).to.equal(-1);
    expect(validate.number.integer(Number.MAX_VALUE)).to.equal(Number.MAX_VALUE);
    expect(validate.number.integer(Number.MAX_SAFE_INTEGER)).to.equal(Number.MAX_SAFE_INTEGER);
  });

  it("should throw an error for fractional numbers", () => {
    function fraction (value) {
      return () => {
        validate.number.integer(value);
      };
    }

    expect(fraction(1.1)).to.throw(TypeError, "Invalid value: 1.1. Expected an integer.");
    expect(fraction(-1.234)).to.throw(TypeError, "Invalid value: -1.234. Expected an integer.");
    expect(fraction(Math.PI)).to.throw(TypeError, "Invalid value: 3.141592653589793. Expected an integer.");
    expect(fraction(Number.EPSILON)).to.throw(TypeError, "Invalid value: 2.220446049250313e-16. Expected an integer.");
  });

  it("should throw an error for non-finite numbers", () => {
    function infinite (value) {
      return () => {
        validate.number.integer(value);
      };
    }

    expect(infinite(Infinity)).to.throw(TypeError, "Invalid value: Infinity. Expected an integer.");
    expect(infinite(-Infinity)).to.throw(TypeError, "Invalid value: -Infinity. Expected an integer.");
  });

  it("should throw an error for invalid defaults", () => {
    function negative (defaultValue) {
      return () => {
        validate.number.integer(undefined, "offset", defaultValue);
      };
    }

    expect(negative(Infinity)).to.throw(TypeError, "Invalid offset: Infinity. Expected an integer.");
    expect(negative(Number.EPSILON)).to.throw(TypeError, "Invalid offset: 2.220446049250313e-16. Expected an integer.");
  });

});
