"use strict";

const { validate } = require("../../");
const { expect } = require("chai");

describe("validate.string()", () => {

  it("should validate empty strings", () => {
    expect(validate.string("")).to.equal("");
  });

  it("should validate whitespace strings", () => {
    expect(validate.string(" ")).to.equal(" ");
    expect(validate.string("\t")).to.equal("\t");
    expect(validate.string("\n")).to.equal("\n");
    expect(validate.string("\t \n")).to.equal("\t \n");
  });

  it("should validate text strings", () => {
    expect(validate.string("Hello, world")).to.equal("Hello, world");
  });

  it("should validate numeric strings", () => {
    expect(validate.string("0")).to.equal("0");
    expect(validate.string("123")).to.equal("123");
    expect(validate.string("Infinity")).to.equal("Infinity");
  });

  it("should validate default values", () => {
    expect(validate.string(undefined, "name", "")).to.equal("");
    expect(validate.string(undefined, "name", "\t \n")).to.equal("\t \n");
    expect(validate.string(undefined, "name", "Hello, world")).to.equal("Hello, world");
    expect(validate.string(undefined, "name", "123")).to.equal("123");
  });

  it("should throw an error for invalid values", () => {
    function invalid (value) {
      return () => {
        validate.string(value);
      };
    }

    expect(invalid(NaN)).to.throw(TypeError, "Invalid value: NaN. Expected a string.");
    expect(invalid(null)).to.throw(TypeError, "Invalid value: null. Expected a string.");
    expect(invalid(0)).to.throw(TypeError, "Invalid value: 0. Expected a string.");
    expect(invalid(Number.MAX_VALUE)).to.throw(TypeError, "Invalid value: 1.7976931348623157e+308. Expected a string.");
    expect(invalid(String)).to.throw(TypeError, "Invalid value: function. Expected a string.");
    expect(invalid(new Date())).to.throw(TypeError, "Invalid value: Date. Expected a string.");
    expect(invalid(/1234/)).to.throw(TypeError, "Invalid value: /1234/. Expected a string.");
    expect(invalid({ foo: "bar" })).to.throw(TypeError, "Invalid value: {foo}. Expected a string.");
    expect(invalid([1, 2, 3])).to.throw(TypeError, "Invalid value: [1,2,3]. Expected a string.");
  });

  it("should throw an error for invalid defaults", () => {
    function invalidDefault (defaultValue) {
      return () => {
        validate.string(undefined, "name", defaultValue);
      };
    }

    expect(invalidDefault(NaN)).to.throw(TypeError, "Invalid name: NaN. Expected a string.");
    expect(invalidDefault(null)).to.throw(TypeError, "Invalid name: null. Expected a string.");
    expect(invalidDefault(0)).to.throw(TypeError, "Invalid name: 0. Expected a string.");
    expect(invalidDefault(Number.MAX_VALUE)).to.throw(TypeError, "Invalid name: 1.7976931348623157e+308. Expected a string.");
    expect(invalidDefault(String)).to.throw(TypeError, "Invalid name: function. Expected a string.");
    expect(invalidDefault(new Date())).to.throw(TypeError, "Invalid name: Date. Expected a string.");
    expect(invalidDefault(/1234/)).to.throw(TypeError, "Invalid name: /1234/. Expected a string.");
    expect(invalidDefault({ foo: "bar" })).to.throw(TypeError, "Invalid name: {foo}. Expected a string.");
    expect(invalidDefault([1, 2, 3])).to.throw(TypeError, "Invalid name: [1,2,3]. Expected a string.");
  });

});
