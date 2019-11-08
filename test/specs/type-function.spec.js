"use strict";

const { validate } = require("../../");
const { expect } = require("chai");

describe("validate.type.function()", () => {

  it("should validate all types of functions", () => {
    expect(validate.type.function(function foo () {})).to.be.a("function");
    expect(validate.type.function(function () {})).to.be.a("function");
    expect(validate.type.function(function* () {})).to.be.a("function");
    expect(validate.type.function(async function () {})).to.be.a("function");
    expect(validate.type.function(async function* () {})).to.be.a("function");
    expect(validate.type.function(() => {})).to.be.a("function");
    expect(validate.type.function(async () => {})).to.be.a("function");
    expect(validate.type.function(new Date().toUTCString)).to.be.a("function");
    expect(validate.type.function(class Foo {})).to.be.a("function");
  });

  it("should validate default values", () => {
    expect(validate.type.function(undefined, "method", function foo () {})).to.be.a("function");
    expect(validate.type.function(undefined, "method", function () {})).to.be.a("function");
    expect(validate.type.function(undefined, "method", function* () {})).to.be.a("function");
    expect(validate.type.function(undefined, "method", async function () {})).to.be.a("function");
    expect(validate.type.function(undefined, "method", async function* () {})).to.be.a("function");
    expect(validate.type.function(undefined, "method", () => {})).to.be.a("function");
    expect(validate.type.function(undefined, "method", async () => {})).to.be.a("function");
    expect(validate.type.function(undefined, "method", new Date().toUTCString)).to.be.a("function");
    expect(validate.type.function(undefined, "method", class Foo {})).to.be.a("function");
  });

  it("should throw an error for invalid values", () => {
    function invalid (value) {
      return () => {
        validate.type.function(value);
      };
    }

    expect(invalid(null)).to.throw(TypeError, "Invalid value: null. Expected a function.");
    expect(invalid(NaN)).to.throw(TypeError, "Invalid value: NaN. Expected a function.");
    expect(invalid(0)).to.throw(TypeError, "Invalid value: 0. Expected a function.");
    expect(invalid(Number.MAX_VALUE)).to.throw(TypeError, "Invalid value: 1.7976931348623157e+308. Expected a function.");
    expect(invalid(false)).to.throw(TypeError, "Invalid value: false. Expected a function.");
    expect(invalid(true)).to.throw(TypeError, "Invalid value: true. Expected a function.");
    expect(invalid("")).to.throw(TypeError, "Invalid value: \"\". Expected a function.");
    expect(invalid("Hello, world!")).to.throw(TypeError, "Invalid value: \"Hello, world!\". Expected a function.");
    expect(invalid(/regex/)).to.throw(TypeError, "Invalid value: /regex/. Expected a function.");
    expect(invalid(new Date())).to.throw(TypeError, "Invalid value: Date. Expected a function.");
  });

  it("should throw an error for invalid defaults", () => {
    function invalidDefault (defaultValue) {
      return () => {
        validate.type.function(undefined, "thing", defaultValue);
      };
    }

    expect(invalidDefault(null)).to.throw(TypeError, "Invalid thing: null. Expected a function.");
    expect(invalidDefault(NaN)).to.throw(TypeError, "Invalid thing: NaN. Expected a function.");
    expect(invalidDefault(0)).to.throw(TypeError, "Invalid thing: 0. Expected a function.");
    expect(invalidDefault(Number.MAX_VALUE)).to.throw(TypeError, "Invalid thing: 1.7976931348623157e+308. Expected a function.");
    expect(invalidDefault(false)).to.throw(TypeError, "Invalid thing: false. Expected a function.");
    expect(invalidDefault(true)).to.throw(TypeError, "Invalid thing: true. Expected a function.");
    expect(invalidDefault("")).to.throw(TypeError, "Invalid thing: \"\". Expected a function.");
    expect(invalidDefault("Hello, world!")).to.throw(TypeError, "Invalid thing: \"Hello, world!\". Expected a function.");
    expect(invalidDefault(/regex/)).to.throw(TypeError, "Invalid thing: /regex/. Expected a function.");
    expect(invalidDefault(new Date())).to.throw(TypeError, "Invalid thing: Date. Expected a function.");
  });

});
