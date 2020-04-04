"use strict";

const { assert } = require("../../lib");
const { expect } = require("chai");

describe("assert.array.maxLength()", () => {

  it("should assert arrays that meet the maximum", () => {
    expect(assert.array.maxLength(["a"], 1)).to.deep.equal(["a"]);
    expect(assert.array.maxLength("Hello".split(""), 50)).to.deep.equal(["H", "e", "l", "l", "o"]);
    expect(assert.array.maxLength([1, 2, 3], 5)).to.deep.equal([1, 2, 3]);
  });

  it("should assert default values", () => {
    expect(assert.array.maxLength(undefined, 1, "list", ["a"])).to.deep.equal(["a"]);
    expect(assert.array.maxLength(undefined, 50, "list", "Hello".split(""))).to.deep.equal(["H", "e", "l", "l", "o"]);
    expect(assert.array.maxLength(undefined, 5, "list", [1, 2, 3])).to.deep.equal([1, 2, 3]);
  });

  it("should throw an error for arrays that don't meet the maximum", () => {
    function tooLong (value, maxLength) {
      return () => {
        assert.array.maxLength(value, maxLength);
      };
    }

    expect(tooLong(["a"], 0)).to.throw(RangeError, "Invalid value: [a]. It must have exactly 0 items.");
    expect(tooLong([1, 2, 3], 1)).to.throw(RangeError, "Invalid value: [1,2,3]. It cannot have more than 1 item.");
    expect(tooLong("Hello, world!".split(""), 10)).to.throw(RangeError, "Invalid value: Array. It cannot have more than 10 items.");
  });

  it("should throw an error for defaults that don't meet the maximum", () => {
    function invalidDefault (defaultValue, maxLength) {
      return () => {
        assert.array.maxLength(undefined, maxLength, "list", defaultValue);
      };
    }

    expect(invalidDefault(["a"], 0)).to.throw(RangeError, "Invalid list: [a]. It must have exactly 0 items.");
    expect(invalidDefault([1, 2, 3], 1)).to.throw(RangeError, "Invalid list: [1,2,3]. It cannot have more than 1 item.");
    expect(invalidDefault("Hello, world!".split(""), 10)).to.throw(RangeError, "Invalid list: Array. It cannot have more than 10 items.");
  });

});
