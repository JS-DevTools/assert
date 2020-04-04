"use strict";

const { assert } = require("../../lib");
const { expect } = require("chai");

describe("assert.array.nonEmpty()", () => {

  it("should assert non-empty arrays", () => {
    expect(assert.array.nonEmpty(["a"])).to.deep.equal(["a"]);
    expect(assert.array.nonEmpty([undefined])).to.deep.equal([undefined]);
    expect(assert.array.nonEmpty([null])).to.deep.equal([null]);
    expect(assert.array.nonEmpty([NaN])).to.deep.equal([NaN]);
    expect(assert.array.nonEmpty([1, 2, 3])).to.deep.equal([1, 2, 3]);
    expect(assert.array.nonEmpty("hello".split(""))).to.deep.equal(["h", "e", "l", "l", "o"]);
  });

  it("should assert default values", () => {
    expect(assert.array.nonEmpty(undefined, "list", ["a"])).to.deep.equal(["a"]);
    expect(assert.array.nonEmpty(undefined, "list", [undefined])).to.deep.equal([undefined]);
    expect(assert.array.nonEmpty(undefined, "list", [null])).to.deep.equal([null]);
    expect(assert.array.nonEmpty(undefined, "list", [NaN])).to.deep.equal([NaN]);
    expect(assert.array.nonEmpty(undefined, "list", [1, 2, 3])).to.deep.equal([1, 2, 3]);
    expect(assert.array.nonEmpty(undefined, "list", "hello".split(""))).to.deep.equal(["h", "e", "l", "l", "o"]);
  });

  it("should throw an error for empty arrays", () => {
    function empty (value) {
      return () => {
        assert.array.nonEmpty(value);
      };
    }

    expect(empty([])).to.throw(RangeError, "Invalid value: Array. It cannot be empty.");
  });

  it("should throw an error for an empty default array", () => {
    function empty (value) {
      return () => {
        assert.array.nonEmpty(undefined, "list", value);
      };
    }

    expect(empty([])).to.throw(RangeError, "Invalid list: Array. It cannot be empty.");
  });

});
