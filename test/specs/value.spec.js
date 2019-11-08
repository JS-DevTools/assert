"use strict";

const { validate } = require("../../");
const { expect } = require("chai");

describe("validate.value()", () => {

  it("should validate falsy values", () => {
    expect(validate.value(null)).to.equal(null);
    expect(validate.value(NaN)).to.satisfy(Number.isNaN);
    expect(validate.value(false)).to.equal(false);
    expect(validate.value(0)).to.equal(0);
    expect(validate.value("")).to.equal("");
  });

  it("should validate truthy values", () => {
    expect(validate.value(true)).to.equal(true);
    expect(validate.value(123)).to.equal(123);
    expect(validate.value(" ")).to.equal(" ");
    expect(validate.value("Hello, world!")).to.equal("Hello, world!");
    expect(validate.value({})).to.be.an("object");
    expect(validate.value(/regex/)).to.be.an.instanceOf(RegExp);
    expect(validate.value(new Date())).to.be.an.instanceOf(Date);
  });

  it("should validate default values", () => {
    expect(validate.value(undefined, "thing", null)).to.equal(null);
    expect(validate.value(undefined, "thing", NaN)).to.satisfy(Number.isNaN);
    expect(validate.value(undefined, "thing", false)).to.equal(false);
    expect(validate.value(undefined, "thing", true)).to.equal(true);
    expect(validate.value(undefined, "thing", 0)).to.equal(0);
    expect(validate.value(undefined, "thing", -12345)).to.equal(-12345);
    expect(validate.value(undefined, "thing", "")).to.equal("");
    expect(validate.value(undefined, "thing", " ")).to.equal(" ");
    expect(validate.value(undefined, "thing", "Hello, world!")).to.equal("Hello, world!");
    expect(validate.value(undefined, "thing", {})).to.be.an("object");
    expect(validate.value(undefined, "thing", /regex/)).to.be.an.instanceOf(RegExp);
    expect(validate.value(undefined, "thing", new Date())).to.be.an.instanceOf(Date);
  });

  it("should throw an error for undefined values", () => {
    function invalid (value) {
      return () => {
        validate.value(value);
      };
    }

    expect(invalid(undefined)).to.throw(TypeError, "Invalid value: undefined. A value is required.");
  });

  it("should throw an error for invalid defaults", () => {
    function invalidDefault (defaultValue) {
      return () => {
        validate.value(undefined, "thing", defaultValue);
      };
    }

    expect(invalidDefault(undefined)).to.throw(TypeError, "Invalid thing: undefined. A value is required.");
  });

});
