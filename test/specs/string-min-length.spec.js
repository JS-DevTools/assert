"use strict";

const { assert } = require("../../");
const { expect } = require("chai");

describe("assert.string.minLength()", () => {

  it("should assert non-empty strings by default", () => {
    expect(assert.string.minLength(" ")).to.equal(" ");
    expect(assert.string.minLength("\n")).to.equal("\n");
    expect(assert.string.minLength("abc")).to.equal("abc");
    expect(assert.string.minLength("Hello, world")).to.equal("Hello, world");
  });

  it("should assert strings that meet the minimum", () => {
    expect(assert.string.minLength(" ", 1)).to.equal(" ");
    expect(assert.string.minLength("hello", 3)).to.equal("hello");
    expect(assert.string.minLength("hello", 5)).to.equal("hello");
  });

  it("should assert default values", () => {
    expect(assert.string.minLength(undefined, 1, "name", " ")).to.equal(" ");
    expect(assert.string.minLength(undefined, 3, "name", "hello")).to.equal("hello");
    expect(assert.string.minLength(undefined, 5, "name", "hello")).to.equal("hello");
  });

  it("should throw an error for empty strings by default", () => {
    function empty (value) {
      return () => {
        assert.string.minLength(value);
      };
    }

    expect(empty("")).to.throw(RangeError, 'Invalid value: "". It cannot be empty.');
  });

  it("should throw an error for strings that don't meet the minimum", () => {
    function tooShort (value, minLength) {
      return () => {
        assert.string.minLength(value, minLength);
      };
    }

    expect(tooShort(" ", 2)).to.throw(RangeError, 'Invalid value: " ". It should be at least 2 characters.');
    expect(tooShort("abc", 5)).to.throw(RangeError, 'Invalid value: "abc". It should be at least 5 characters.');
    expect(tooShort("Hello, world!", 100)).to.throw(RangeError, 'Invalid value: "Hello, world!". It should be at least 100 characters.');
  });

  it("should throw an error for defaults that don't meet the minimum", () => {
    function invalidDefault (defaultValue, minLength) {
      return () => {
        assert.string.minLength(undefined, minLength, "name", defaultValue);
      };
    }

    expect(invalidDefault(" ", 2)).to.throw(RangeError, 'Invalid name: " ". It should be at least 2 characters.');
    expect(invalidDefault("abc", 5)).to.throw(RangeError, 'Invalid name: "abc". It should be at least 5 characters.');
    expect(invalidDefault("Hello, world!", 100)).to.throw(RangeError, 'Invalid name: "Hello, world!". It should be at least 100 characters.');
  });

});
