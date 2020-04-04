"use strict";

const { assert } = require("../../");
const { expect } = require("chai");

describe("assert.value()", () => {

  it("should assert falsy values", () => {
    expect(assert.value(null)).to.equal(null);
    expect(assert.value(NaN)).to.satisfy(Number.isNaN);
    expect(assert.value(false)).to.equal(false);
    expect(assert.value(0)).to.equal(0);
    expect(assert.value("")).to.equal("");
  });

  it("should assert truthy values", () => {
    expect(assert.value(true)).to.equal(true);
    expect(assert.value(123)).to.equal(123);
    expect(assert.value(" ")).to.equal(" ");
    expect(assert.value("Hello, world!")).to.equal("Hello, world!");
    expect(assert.value({})).to.be.an("object");
    expect(assert.value(/regex/)).to.be.an.instanceOf(RegExp);
    expect(assert.value(new Date())).to.be.an.instanceOf(Date);
  });

  it("should assert default values", () => {
    expect(assert.value(undefined, "thing", null)).to.equal(null);
    expect(assert.value(undefined, "thing", NaN)).to.satisfy(Number.isNaN);
    expect(assert.value(undefined, "thing", false)).to.equal(false);
    expect(assert.value(undefined, "thing", true)).to.equal(true);
    expect(assert.value(undefined, "thing", 0)).to.equal(0);
    expect(assert.value(undefined, "thing", -12345)).to.equal(-12345);
    expect(assert.value(undefined, "thing", "")).to.equal("");
    expect(assert.value(undefined, "thing", " ")).to.equal(" ");
    expect(assert.value(undefined, "thing", "Hello, world!")).to.equal("Hello, world!");
    expect(assert.value(undefined, "thing", {})).to.be.an("object");
    expect(assert.value(undefined, "thing", /regex/)).to.be.an.instanceOf(RegExp);
    expect(assert.value(undefined, "thing", new Date())).to.be.an.instanceOf(Date);
  });

  it("should throw an error for undefined values", () => {
    function invalid (value) {
      return () => {
        assert.value(value);
      };
    }

    expect(invalid(undefined)).to.throw(TypeError, "Invalid value: undefined. A value is required.");
  });

  it("should throw an error for invalid defaults", () => {
    function invalidDefault (defaultValue) {
      return () => {
        assert.value(undefined, "thing", defaultValue);
      };
    }

    expect(invalidDefault(undefined)).to.throw(TypeError, "Invalid thing: undefined. A value is required.");
  });

});
