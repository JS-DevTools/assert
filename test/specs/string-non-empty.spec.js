"use strict";

const { assert } = require("../../lib");
const { expect } = require("chai");

describe("assert.string.nonEmpty()", () => {

  it("should assert non-empty strings", () => {
    expect(assert.string.nonEmpty(" ")).to.equal(" ");
    expect(assert.string.nonEmpty("\n")).to.equal("\n");
    expect(assert.string.nonEmpty("abc")).to.equal("abc");
    expect(assert.string.nonEmpty("Hello, world")).to.equal("Hello, world");
  });

  it("should assert default values", () => {
    expect(assert.string.nonEmpty(undefined, "name", " ")).to.equal(" ");
    expect(assert.string.nonEmpty(undefined, "name", "hello")).to.equal("hello");
    expect(assert.string.nonEmpty(undefined, "name", "Hello, world!")).to.equal("Hello, world!");
  });

  it("should throw an error for empty strings", () => {
    function empty (value) {
      return () => {
        assert.string.nonEmpty(value);
      };
    }

    expect(empty("")).to.throw(RangeError, 'Invalid value: "". It cannot be empty.');
  });

});
