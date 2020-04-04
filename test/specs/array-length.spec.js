"use strict";

const { assert } = require("../../lib");
const { expect } = require("chai");

describe("assert.array.length()", () => {

  it("should assert arrays that meet the minimum and maximum", () => {
    expect(assert.array.length([], 0, 1)).to.deep.equal([]);
    expect(assert.array.length(["A"], 0, 1)).to.deep.equal(["A"]);
    expect(assert.array.length([1, 2, 3], 1, 3)).to.deep.equal([1, 2, 3]);
    expect(assert.array.length("Hello".split(""), 5, 50)).to.deep.equal(["H", "e", "l", "l", "o"]);
  });

  it("should assert arrays that meet the exact length", () => {
    expect(assert.array.length([], 0)).to.deep.equal([]);
    expect(assert.array.length(["a"], 1)).to.deep.equal(["a"]);
    expect(assert.array.length([1, 2, 3], 3)).to.deep.equal([1, 2, 3]);
    expect(assert.array.length("Hello".split(""), 5)).to.deep.equal(["H", "e", "l", "l", "o"]);
  });

  it("should assert default values", () => {
    expect(assert.array.length(undefined, 0, 1, "list", ["A"])).to.deep.equal(["A"]);
    expect(assert.array.length(undefined, 5, 50, "list", "Hello".split(""))).to.deep.equal(["H", "e", "l", "l", "o"]);
    expect(assert.array.length(undefined, 1, 3, "list", [1, 2, 3])).to.deep.equal([1, 2, 3]);

    expect(assert.array.length(undefined, 1, "list", ["A"])).to.deep.equal(["A"]);
    expect(assert.array.length(undefined, 5, "list", "Hello".split(""))).to.deep.equal(["H", "e", "l", "l", "o"]);
    expect(assert.array.length(undefined, 3, "list", [1, 2, 3])).to.deep.equal([1, 2, 3]);
  });

  it("should throw an error for arrays that don't meet the minimum and maximum", () => {
    function tooLong (value, min, max) {
      return () => {
        assert.array.length(value, min, max);
      };
    }

    expect(tooLong(["A"], 0, 0)).to.throw(RangeError, "Invalid value: [A]. It must have exactly 0 items.");
    expect(tooLong([1, 2, 3], 0, 1)).to.throw(RangeError, "Invalid value: [1,2,3]. It cannot have more than 1 item.");
    expect(tooLong("Hello, world!".split(""), 5, 10)).to.throw(RangeError, "Invalid value: Array. It cannot have more than 10 items.");
  });

  it("should throw an error for arrays that don't meet the exact length", () => {
    function tooLong (value, length) {
      return () => {
        assert.array.length(value, length);
      };
    }

    expect(tooLong(["A"], 0)).to.throw(RangeError, "Invalid value: [A]. It must have exactly 0 items.");
    expect(tooLong([1, 2, 3], 1)).to.throw(RangeError, "Invalid value: [1,2,3]. It must have exactly 1 item.");
    expect(tooLong("Hello, world!".split(""), 10)).to.throw(RangeError, "Invalid value: Array. It must have exactly 10 items.");
  });

  it("should throw an error for defaults that don't meet the maximum", () => {
    function invalidDefault (defaultValue, min, max) {
      return () => {
        assert.array.length(undefined, min, max, "list", defaultValue);
      };
    }

    expect(invalidDefault(["A"], 0, 0)).to.throw(RangeError, "Invalid list: [A]. It must have exactly 0 items.");
    expect(invalidDefault([1, 2, 3], 0, 2)).to.throw(RangeError, "Invalid list: [1,2,3]. It cannot have more than 2 items.");
    expect(invalidDefault("Hello, world!".split(""), 5, 10)).to.throw(RangeError, "Invalid list: Array. It cannot have more than 10 items.");
  });

  it("should throw an error for defaults that don't meet the exact length", () => {
    function invalidDefault (defaultValue, length) {
      return () => {
        assert.array.length(undefined, length, "list", defaultValue);
      };
    }

    expect(invalidDefault(["A"], 0)).to.throw(RangeError, "Invalid list: [A]. It must have exactly 0 items.");
    expect(invalidDefault([1, 2, 3], 2)).to.throw(RangeError, "Invalid list: [1,2,3]. It must have exactly 2 items.");
    expect(invalidDefault("Hello, world!".split(""), 10)).to.throw(RangeError, "Invalid list: Array. It must have exactly 10 items.");
  });

});
