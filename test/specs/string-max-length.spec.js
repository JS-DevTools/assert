"use strict";

const { assert } = require("../../lib");
const { expect } = require("chai");

describe("assert.string.maxLength()", () => {

  it("should assert strings that meet the maximum", () => {
    expect(assert.string.maxLength("a", 1)).to.equal("a");
    expect(assert.string.maxLength("Hello, world!", 50)).to.equal("Hello, world!");
    expect(assert.string.maxLength("hello", 5)).to.equal("hello");
  });

  it("should assert default values", () => {
    expect(assert.string.maxLength(undefined, 1, "name", "A")).to.equal("A");
    expect(assert.string.maxLength(undefined, 30, "name", "Hello, world!")).to.equal("Hello, world!");
    expect(assert.string.maxLength(undefined, 5, "name", "hello")).to.equal("hello");
  });

  it("should throw an error for strings that don't meet the maximum", () => {
    function tooLong (value, maxLength) {
      return () => {
        assert.string.maxLength(value, maxLength);
      };
    }

    expect(tooLong(" ", 0)).to.throw(RangeError, 'Invalid value: " ". It must be exactly 0 characters.');
    expect(tooLong("abc", 1)).to.throw(RangeError, 'Invalid value: "abc". It cannot be more than 1 character.');
    expect(tooLong("Hello, world!", 10)).to.throw(RangeError, 'Invalid value: "Hello, world!". It cannot be more than 10 characters.');
  });

  it("should throw an error for defaults that don't meet the maximum", () => {
    function invalidDefault (defaultValue, maxLength) {
      return () => {
        assert.string.maxLength(undefined, maxLength, "name", defaultValue);
      };
    }

    expect(invalidDefault(" ", 0)).to.throw(RangeError, 'Invalid name: " ". It must be exactly 0 characters.');
    expect(invalidDefault("abc", 1)).to.throw(RangeError, 'Invalid name: "abc". It cannot be more than 1 character.');
    expect(invalidDefault("Hello, world!", 10)).to.throw(RangeError, 'Invalid name: "Hello, world!". It cannot be more than 10 characters.');
  });

});
