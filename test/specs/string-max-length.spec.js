"use strict";

const { validate } = require("../../lib");
const { expect } = require("chai");

describe("validate.string.maxLength()", () => {

  it("should validate strings that meet the maximum", () => {
    expect(validate.string.maxLength("a", 1)).to.equal("a");
    expect(validate.string.maxLength("Hello, world!", 50)).to.equal("Hello, world!");
    expect(validate.string.maxLength("hello", 5)).to.equal("hello");
  });

  it("should validate default values", () => {
    expect(validate.string.maxLength(undefined, 1, "name", "A")).to.equal("A");
    expect(validate.string.maxLength(undefined, 30, "name", "Hello, world!")).to.equal("Hello, world!");
    expect(validate.string.maxLength(undefined, 5, "name", "hello")).to.equal("hello");
  });

  it("should throw an error for strings that don't meet the maximum", () => {
    function tooLong (value, maxLength) {
      return () => {
        validate.string.maxLength(value, maxLength);
      };
    }

    expect(tooLong(" ", 0)).to.throw(RangeError, 'Invalid value: " ". It must be exactly 0 characters.');
    expect(tooLong("abc", 1)).to.throw(RangeError, 'Invalid value: "abc". It cannot be more than 1 character.');
    expect(tooLong("Hello, world!", 10)).to.throw(RangeError, 'Invalid value: "Hello, world!". It cannot be more than 10 characters.');
  });

  it("should throw an error for defaults that don't meet the maximum", () => {
    function invalidDefault (defaultValue, maxLength) {
      return () => {
        validate.string.maxLength(undefined, maxLength, "name", defaultValue);
      };
    }

    expect(invalidDefault(" ", 0)).to.throw(RangeError, 'Invalid name: " ". It must be exactly 0 characters.');
    expect(invalidDefault("abc", 1)).to.throw(RangeError, 'Invalid name: "abc". It cannot be more than 1 character.');
    expect(invalidDefault("Hello, world!", 10)).to.throw(RangeError, 'Invalid name: "Hello, world!". It cannot be more than 10 characters.');
  });

});
