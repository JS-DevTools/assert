"use strict";

const { validate } = require("../../");
const { expect } = require("chai");

describe("validate.type.boolean()", () => {

  it("should validate boolean values", () => {
    expect(validate.type.boolean(false)).to.equal(false);
    expect(validate.type.boolean(true)).to.equal(true);
  });

  it("should validate default values", () => {
    expect(validate.type.boolean(undefined, "enabled", false)).to.equal(false);
    expect(validate.type.boolean(undefined, "enabled", true)).to.equal(true);
  });

  it("should throw an error for invalid values", () => {
    function invalid (value) {
      return () => {
        validate.type.boolean(value);
      };
    }

    expect(invalid(null)).to.throw(TypeError, "Invalid value: null. Expected a boolean.");
    expect(invalid(NaN)).to.throw(TypeError, "Invalid value: NaN. Expected a boolean.");
    expect(invalid(0)).to.throw(TypeError, "Invalid value: 0. Expected a boolean.");
    expect(invalid(Number.MAX_VALUE)).to.throw(TypeError, "Invalid value: 1.7976931348623157e+308. Expected a boolean.");
    expect(invalid("")).to.throw(TypeError, "Invalid value: \"\". Expected a boolean.");
    expect(invalid("Hello, world!")).to.throw(TypeError, "Invalid value: \"Hello, world!\". Expected a boolean.");
    expect(invalid(/regex/)).to.throw(TypeError, "Invalid value: /regex/. Expected a boolean.");
    expect(invalid(new Date())).to.throw(TypeError, "Invalid value: Date. Expected a boolean.");
  });

  it("should throw an error for invalid defaults", () => {
    function invalidDefault (defaultValue) {
      return () => {
        validate.type.boolean(undefined, "thing", defaultValue);
      };
    }

    expect(invalidDefault(null)).to.throw(TypeError, "Invalid thing: null. Expected a boolean.");
    expect(invalidDefault(NaN)).to.throw(TypeError, "Invalid thing: NaN. Expected a boolean.");
    expect(invalidDefault(0)).to.throw(TypeError, "Invalid thing: 0. Expected a boolean.");
    expect(invalidDefault(Number.MAX_VALUE)).to.throw(TypeError, "Invalid thing: 1.7976931348623157e+308. Expected a boolean.");
    expect(invalidDefault("")).to.throw(TypeError, "Invalid thing: \"\". Expected a boolean.");
    expect(invalidDefault("Hello, world!")).to.throw(TypeError, "Invalid thing: \"Hello, world!\". Expected a boolean.");
    expect(invalidDefault(/regex/)).to.throw(TypeError, "Invalid thing: /regex/. Expected a boolean.");
    expect(invalidDefault(new Date())).to.throw(TypeError, "Invalid thing: Date. Expected a boolean.");
  });

});
