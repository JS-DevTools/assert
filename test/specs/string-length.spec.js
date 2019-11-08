"use strict";

const { validate } = require("../../lib");
const { expect } = require("chai");

describe("validate.string.length()", () => {

  it("should validate strings that meet the minimum and maximum", () => {
    expect(validate.string.length("a", 0, 1)).to.equal("a");
    expect(validate.string.length("Hello, world!", 10, 50)).to.equal("Hello, world!");
    expect(validate.string.length("hello", 5, 10)).to.equal("hello");
  });

  it("should validate default values", () => {
    expect(validate.string.length(undefined, 0, 1, "name", "A")).to.equal("A");
    expect(validate.string.length(undefined, 10, 50, "name", "Hello, world!")).to.equal("Hello, world!");
    expect(validate.string.length(undefined, 5, 10, "name", "hello")).to.equal("hello");
  });

  it("should throw an error for strings that don't meet the minimum and maximum", () => {
    function tooLong (value, min, max) {
      return () => {
        validate.string.length(value, min, max);
      };
    }

    expect(tooLong(" ", 0, 0)).to.throw(RangeError, 'Invalid value: " ". It must be exactly 0 characters.');
    expect(tooLong("abc", 0, 1)).to.throw(RangeError, 'Invalid value: "abc". It cannot be more than 1 character.');
    expect(tooLong("Hello, world!", 1, 10)).to.throw(RangeError, 'Invalid value: "Hello, world!". It cannot be more than 10 characters.');
  });

  it("should throw an error for defaults that don't meet the maximum", () => {
    function invalidDefault (defaultValue, min, max) {
      return () => {
        validate.string.length(undefined, min, max, "name", defaultValue);
      };
    }

    expect(invalidDefault(" ", 0, 0)).to.throw(RangeError, 'Invalid name: " ". It must be exactly 0 characters.');
    expect(invalidDefault("abc", 0, 1)).to.throw(RangeError, 'Invalid name: "abc". It cannot be more than 1 character.');
    expect(invalidDefault("Hello, world!", 1, 10)).to.throw(RangeError, 'Invalid name: "Hello, world!". It cannot be more than 10 characters.');
  });

});
