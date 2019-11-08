"use strict";

const { validate } = require("../../lib");
const { expect } = require("chai");

describe("validate.string.nonWhitespace()", () => {

  it("should validate non-whitespace strings", () => {
    expect(validate.string.nonWhitespace("     a     ")).to.equal("     a     ");
    expect(validate.string.nonWhitespace("\n\n a \n\n")).to.equal("\n\n a \n\n");
    expect(validate.string.nonWhitespace("abc")).to.equal("abc");
    expect(validate.string.nonWhitespace("Hello, world")).to.equal("Hello, world");
  });

  it("should validate default values", () => {
    expect(validate.string.nonWhitespace(undefined, "name", "     a     ")).to.equal("     a     ");
    expect(validate.string.nonWhitespace(undefined, "name", "\n\n a \n\n")).to.equal("\n\n a \n\n");
    expect(validate.string.nonWhitespace(undefined, "name", "hello")).to.equal("hello");
    expect(validate.string.nonWhitespace(undefined, "name", "Hello, world!")).to.equal("Hello, world!");
  });

  it("should throw an error for empty strings", () => {
    function empty (value) {
      return () => {
        validate.string.nonWhitespace(value);
      };
    }

    expect(empty("")).to.throw(RangeError, 'Invalid value: "". It cannot be empty.');
  });

  it("should throw an error for whitespace strings", () => {
    function empty (value) {
      return () => {
        validate.string.nonWhitespace(value);
      };
    }

    expect(empty(" ")).to.throw(Error, 'Invalid value: " ". It cannot be all whitespace.');
    expect(empty("        ")).to.throw(Error, 'Invalid value: "        ". It cannot be all whitespace.');
    expect(empty("\n")).to.throw(Error, 'Invalid value: "\n". It cannot be all whitespace.');
    expect(empty("\t")).to.throw(Error, 'Invalid value: "\t". It cannot be all whitespace.');
    expect(empty("\r\n\t")).to.throw(Error, 'Invalid value: "\r\n\t". It cannot be all whitespace.');
  });

});
