"use strict";

const { assert } = require("../../");
const { expect } = require("chai");

describe("assert.array.minLength()", () => {

  it("should assert non-empty arrays by default", () => {
    expect(assert.array.minLength(["a"])).to.deep.equal(["a"]);
    expect(assert.array.minLength([1, 2, 3])).to.deep.equal([1, 2, 3]);
  });

  it("should assert arrays that meet the minimum", () => {
    expect(assert.array.minLength(["a"], 1)).to.deep.equal(["a"]);
    expect(assert.array.minLength([1, 2, 3], 2)).to.deep.equal([1, 2, 3]);
    expect(assert.array.minLength("Hello".split(""), 3)).to.deep.equal(["H", "e", "l", "l", "o"]);
  });

  it("should assert default values", () => {
    expect(assert.array.minLength(undefined, 1, "list", ["a"])).to.deep.equal(["a"]);
    expect(assert.array.minLength(undefined, 2, "list", [1, 2, 3])).to.deep.equal([1, 2, 3]);
    expect(assert.array.minLength(undefined, 3, "list", "Hello".split(""))).to.deep.equal(["H", "e", "l", "l", "o"]);
  });

  it("should throw an error for empty arrays by default", () => {
    function empty (value) {
      return () => {
        assert.array.minLength(value);
      };
    }

    expect(empty([])).to.throw(RangeError, "Invalid value: Array. It cannot be empty.");
  });

  it("should throw an error for arrays that don't meet the minimum", () => {
    function tooShort (value, minLength) {
      return () => {
        assert.array.minLength(value, minLength);
      };
    }

    expect(tooShort(["a"], 2)).to.throw(RangeError, "Invalid value: [a]. It should have at least 2 items.");
    expect(tooShort([1, 2, 3], 5)).to.throw(RangeError, "Invalid value: [1,2,3]. It should have at least 5 items.");
    expect(tooShort("Hello, world!".split(""), 100)).to.throw(RangeError, "Invalid value: Array. It should have at least 100 items.");
  });

  it("should throw an error for defaults that don't meet the minimum", () => {
    function invalidDefault (defaultValue, minLength) {
      return () => {
        assert.array.minLength(undefined, minLength, "list", defaultValue);
      };
    }

    expect(invalidDefault(["a"], 2)).to.throw(RangeError, "Invalid list: [a]. It should have at least 2 items.");
    expect(invalidDefault([1, 2, 3], 5)).to.throw(RangeError, "Invalid list: [1,2,3]. It should have at least 5 items.");
    expect(invalidDefault("Hello, world!".split(""), 100)).to.throw(RangeError, "Invalid list: Array. It should have at least 100 items.");
  });

});
