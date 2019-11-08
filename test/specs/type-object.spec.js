/* eslint-disable no-new-object, no-new-wrappers */
"use strict";

const { validate } = require("../../");
const { expect } = require("chai");

describe("validate.type.object()", () => {

  it("should validate empty objects", () => {
    expect(validate.type.object({})).to.deep.equal({});
  });

  it("should validate object literals", () => {
    expect(validate.type.object({ foo: 1 })).to.deep.equal({ foo: 1 });
    expect(validate.type.object({ foo: "bar", biz: "baz" })).to.deep.equal({ foo: "bar", biz: "baz" });
  });

  it("should validate class instances", () => {
    expect(validate.type.object(/regex/)).to.be.an.instanceOf(RegExp);
    expect(validate.type.object([])).to.be.an.instanceOf(Array);
    expect(validate.type.object(new Array(1))).to.be.an.instanceOf(Array);
    expect(validate.type.object(new Object())).to.be.an.instanceOf(Object);
    expect(validate.type.object(new Boolean(false))).to.be.an.instanceOf(Boolean);
    expect(validate.type.object(new Number(123))).to.be.an.instanceOf(Number);
    expect(validate.type.object(new String())).to.be.an.instanceOf(String);
    expect(validate.type.object(new Date())).to.be.an.instanceOf(Date);
    expect(validate.type.object(new Map())).to.be.an.instanceOf(Map);
    expect(validate.type.object(new Set())).to.be.an.instanceOf(Set);
  });

  it("should validate default values", () => {
    expect(validate.type.object(undefined, "thing", { foo: 1 })).to.deep.equal({ foo: 1 });
    expect(validate.type.object(undefined, "thing", /regex/)).to.be.an.instanceOf(RegExp);
    expect(validate.type.object(undefined, "thing", [])).to.be.an.instanceOf(Array);
    expect(validate.type.object(undefined, "thing", new Array(1))).to.be.an.instanceOf(Array);
    expect(validate.type.object(undefined, "thing", new Object())).to.be.an.instanceOf(Object);
    expect(validate.type.object(undefined, "thing", new Boolean(false))).to.be.an.instanceOf(Boolean);
    expect(validate.type.object(undefined, "thing", new Number(123))).to.be.an.instanceOf(Number);
    expect(validate.type.object(undefined, "thing", new String())).to.be.an.instanceOf(String);
    expect(validate.type.object(undefined, "thing", new Date())).to.be.an.instanceOf(Date);
    expect(validate.type.object(undefined, "thing", new Map())).to.be.an.instanceOf(Map);
    expect(validate.type.object(undefined, "thing", new Set())).to.be.an.instanceOf(Set);
  });

  it("should throw an error for invalid values", () => {
    function invalid (value) {
      return () => {
        validate.type.object(value);
      };
    }

    expect(invalid(null)).to.throw(TypeError, "Invalid value: null. Expected an object.");
    expect(invalid(NaN)).to.throw(TypeError, "Invalid value: NaN. Expected an object.");
    expect(invalid(0)).to.throw(TypeError, "Invalid value: 0. Expected an object.");
    expect(invalid(Number.MAX_VALUE)).to.throw(TypeError, "Invalid value: 1.7976931348623157e+308. Expected an object.");
    expect(invalid(false)).to.throw(TypeError, "Invalid value: false. Expected an object.");
    expect(invalid(true)).to.throw(TypeError, "Invalid value: true. Expected an object.");
    expect(invalid("")).to.throw(TypeError, "Invalid value: \"\". Expected an object.");
    expect(invalid("Hello, world!")).to.throw(TypeError, "Invalid value: \"Hello, world!\". Expected an object.");
    expect(invalid(String)).to.throw(TypeError, "Invalid value: function. Expected an object.");
  });

  it("should throw an error for invalid defaults", () => {
    function invalidDefault (defaultValue) {
      return () => {
        validate.type.object(undefined, "thing", defaultValue);
      };
    }

    expect(invalidDefault(null)).to.throw(TypeError, "Invalid thing: null. Expected an object.");
    expect(invalidDefault(NaN)).to.throw(TypeError, "Invalid thing: NaN. Expected an object.");
    expect(invalidDefault(0)).to.throw(TypeError, "Invalid thing: 0. Expected an object.");
    expect(invalidDefault(Number.MAX_VALUE)).to.throw(TypeError, "Invalid thing: 1.7976931348623157e+308. Expected an object.");
    expect(invalidDefault(false)).to.throw(TypeError, "Invalid thing: false. Expected an object.");
    expect(invalidDefault(true)).to.throw(TypeError, "Invalid thing: true. Expected an object.");
    expect(invalidDefault("")).to.throw(TypeError, "Invalid thing: \"\". Expected an object.");
    expect(invalidDefault("Hello, world!")).to.throw(TypeError, "Invalid thing: \"Hello, world!\". Expected an object.");
    expect(invalidDefault(String)).to.throw(TypeError, "Invalid thing: function. Expected an object.");
  });

});
