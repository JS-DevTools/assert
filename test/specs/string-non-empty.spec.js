"use strict";

const { validate } = require("../../lib");
const { expect } = require("chai");

describe("validate.string.nonEmpty()", () => {

  it("should validate non-empty strings", () => {
    expect(validate.string.nonEmpty(" ")).to.equal(" ");
    expect(validate.string.nonEmpty("\n")).to.equal("\n");
    expect(validate.string.nonEmpty("abc")).to.equal("abc");
    expect(validate.string.nonEmpty("Hello, world")).to.equal("Hello, world");
  });

  it("should validate default values", () => {
    expect(validate.string.nonEmpty(undefined, "name", " ")).to.equal(" ");
    expect(validate.string.nonEmpty(undefined, "name", "hello")).to.equal("hello");
    expect(validate.string.nonEmpty(undefined, "name", "Hello, world!")).to.equal("Hello, world!");
  });

  it("should throw an error for empty strings", () => {
    function empty (value) {
      return () => {
        validate.string.nonEmpty(value);
      };
    }

    expect(empty("")).to.throw(RangeError, 'Invalid value: "". It cannot be empty.');
  });

});
