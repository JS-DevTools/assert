"use strict";

const { assert } = require("../../lib");
const { expect } = require("chai");

describe("assert.string.nonWhitespace()", () => {

  it("should assert non-whitespace strings", () => {
    expect(assert.string.nonWhitespace("     a     ")).to.equal("     a     ");
    expect(assert.string.nonWhitespace("\n\n a \n\n")).to.equal("\n\n a \n\n");
    expect(assert.string.nonWhitespace("abc")).to.equal("abc");
    expect(assert.string.nonWhitespace("Hello, world")).to.equal("Hello, world");
  });

  it("should assert default values", () => {
    expect(assert.string.nonWhitespace(undefined, "name", "     a     ")).to.equal("     a     ");
    expect(assert.string.nonWhitespace(undefined, "name", "\n\n a \n\n")).to.equal("\n\n a \n\n");
    expect(assert.string.nonWhitespace(undefined, "name", "hello")).to.equal("hello");
    expect(assert.string.nonWhitespace(undefined, "name", "Hello, world!")).to.equal("Hello, world!");
  });

  it("should throw an error for empty strings", () => {
    function empty (value) {
      return () => {
        assert.string.nonWhitespace(value);
      };
    }

    expect(empty("")).to.throw(RangeError, 'Invalid value: "". It cannot be empty.');
  });

  it("should throw an error for whitespace strings", () => {
    function empty (value) {
      return () => {
        assert.string.nonWhitespace(value);
      };
    }

    expect(empty(" ")).to.throw(Error, 'Invalid value: " ". It cannot be all whitespace.');
    expect(empty("        ")).to.throw(Error, 'Invalid value: "        ". It cannot be all whitespace.');
    expect(empty("\n")).to.throw(Error, 'Invalid value: "\n". It cannot be all whitespace.');
    expect(empty("\t")).to.throw(Error, 'Invalid value: "\t". It cannot be all whitespace.');
    expect(empty("\r\n\t")).to.throw(Error, 'Invalid value: "\r\n\t". It cannot be all whitespace.');
  });

});
