"use strict";

const { validate } = require("../../");
const { expect } = require("chai");

describe("validate.number()", () => {

  it("should validate numbers", () => {
    expect(validate.number(1.0)).to.equal(1);
    expect(validate.number(42)).to.equal(42);
    expect(validate.number(-100)).to.equal(-100);
    expect(validate.number(-1.234)).to.equal(-1.234);
    expect(validate.number(Number.MIN_VALUE)).to.equal(Number.MIN_VALUE);
    expect(validate.number(Number.MAX_VALUE)).to.equal(Number.MAX_VALUE);
    expect(validate.number(Number.MAX_SAFE_INTEGER)).to.equal(Number.MAX_SAFE_INTEGER);
    expect(validate.number(Number.EPSILON)).to.equal(Number.EPSILON);
  });

  it("should validate default values", () => {
    expect(validate.number(undefined, "latitude", 1.0)).to.equal(1);
    expect(validate.number(undefined, "latitude", 42)).to.equal(42);
    expect(validate.number(undefined, "latitude", -100)).to.equal(-100);
    expect(validate.number(undefined, "latitude", -1.234)).to.equal(-1.234);
    expect(validate.number(undefined, "latitude", Number.MIN_VALUE)).to.equal(Number.MIN_VALUE);
    expect(validate.number(undefined, "latitude", Number.MAX_VALUE)).to.equal(Number.MAX_VALUE);
    expect(validate.number(undefined, "latitude", Number.MAX_SAFE_INTEGER)).to.equal(Number.MAX_SAFE_INTEGER);
    expect(validate.number(undefined, "latitude", Number.EPSILON)).to.equal(Number.EPSILON);
  });

  it("should throw an error for invalid values", () => {
    function invalid (value) {
      return () => {
        validate.number(value);
      };
    }

    expect(invalid(NaN)).to.throw(TypeError, "Invalid value: NaN. Expected a number.");
    expect(invalid(null)).to.throw(TypeError, "Invalid value: null. Expected a number.");
    expect(invalid("")).to.throw(TypeError, "Invalid value: \"\". Expected a number.");
    expect(invalid("Hello, World")).to.throw(TypeError, "Invalid value: \"Hello, World\". Expected a number.");
    expect(invalid(new Date())).to.throw(TypeError, "Invalid value: Date. Expected a number.");
    expect(invalid(/1234/)).to.throw(TypeError, "Invalid value: /1234/. Expected a number.");
    expect(invalid({ foo: "bar" })).to.throw(TypeError, "Invalid value: {foo}. Expected a number.");
    expect(invalid([1, 2, 3])).to.throw(TypeError, "Invalid value: [1,2,3]. Expected a number.");
  });

  it("should throw an error for invalid defaults", () => {
    function negative (defaultValue) {
      return () => {
        validate.number(undefined, "latitude", defaultValue);
      };
    }

    expect(negative(NaN)).to.throw(TypeError, "Invalid latitude: NaN. Expected a number.");
    expect(negative("")).to.throw(TypeError, "Invalid latitude: \"\". Expected a number.");
    expect(negative(new Date())).to.throw(TypeError, "Invalid latitude: Date. Expected a number.");
  });

});
