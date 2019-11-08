"use strict";

const { validate } = require("../../");
const { expect } = require("chai");

describe("validate.string.minLength()", () => {

  it("should validate non-empty strings by default", () => {
    expect(validate.string.minLength(" ")).to.equal(" ");
    expect(validate.string.minLength("\n")).to.equal("\n");
    expect(validate.string.minLength("abc")).to.equal("abc");
    expect(validate.string.minLength("Hello, world")).to.equal("Hello, world");
  });

  it("should validate strings that meet the minimum", () => {
    expect(validate.string.minLength(" ", 1)).to.equal(" ");
    expect(validate.string.minLength("hello", 3)).to.equal("hello");
    expect(validate.string.minLength("hello", 5)).to.equal("hello");
  });

  it("should validate default values", () => {
    expect(validate.string.minLength(undefined, 1, "name", " ")).to.equal(" ");
    expect(validate.string.minLength(undefined, 3, "name", "hello")).to.equal("hello");
    expect(validate.string.minLength(undefined, 5, "name", "hello")).to.equal("hello");
  });

  it("should throw an error for empty strings by default", () => {
    function empty (value) {
      return () => {
        validate.string.minLength(value);
      };
    }

    expect(empty("")).to.throw(RangeError, 'Invalid value: "". It cannot be empty.');
  });

  it("should throw an error for strings that don't meet the minimum", () => {
    function tooShort (value, minLength) {
      return () => {
        validate.string.minLength(value, minLength);
      };
    }

    expect(tooShort(" ", 2)).to.throw(RangeError, 'Invalid value: " ". It should be at least 2 characters.');
    expect(tooShort("abc", 5)).to.throw(RangeError, 'Invalid value: "abc". It should be at least 5 characters.');
    expect(tooShort("Hello, world!", 100)).to.throw(RangeError, 'Invalid value: "Hello, world!". It should be at least 100 characters.');
  });

  it("should throw an error for defaults that don't meet the minimum", () => {
    function invalidDefault (defaultValue, minLength) {
      return () => {
        validate.string.minLength(undefined, minLength, "name", defaultValue);
      };
    }

    expect(invalidDefault(" ", 2)).to.throw(RangeError, 'Invalid name: " ". It should be at least 2 characters.');
    expect(invalidDefault("abc", 5)).to.throw(RangeError, 'Invalid name: "abc". It should be at least 5 characters.');
    expect(invalidDefault("Hello, world!", 100)).to.throw(RangeError, 'Invalid name: "Hello, world!". It should be at least 100 characters.');
  });

});
