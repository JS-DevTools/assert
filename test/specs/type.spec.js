/* globals BigInt */
/* eslint-disable no-new-object, no-new-wrappers */
"use strict";

const { validate } = require("../../");
const { expect } = require("chai");

describe("validate.type()", () => {

  it("should validate special values", () => {
    expect(validate.type(null, null)).to.equal(null);
    expect(validate.type(undefined, undefined)).to.equal(undefined);
    expect(validate.type(NaN, NaN)).to.satisfy(Number.isNaN);
  });

  it("should validate primitive values", () => {
    expect(validate.type("Hello, world!", String)).to.equal("Hello, world!");
    expect(validate.type(12345, Number)).to.equal(12345);
    expect(validate.type(false, Boolean)).to.equal(false);
  });

  it("should validate wrapped primitive values", () => {
    expect(validate.type(new String("Hello, world!"), String)).to.deep.equal(new String("Hello, world!"));
    expect(validate.type(new Number(12345), Number)).to.deep.equal(new Number(12345));
    expect(validate.type(new Boolean(false), Boolean)).to.deep.equal(new Boolean(false));
    expect(validate.type(BigInt(123456789), BigInt)).to.deep.equal(BigInt(123456789));
    expect(validate.type(Symbol("foo"), Symbol)).to.be.a("symbol");
  });

  it("should validate values that are instances of the type", () => {
    expect(validate.type(/regex/, RegExp)).to.be.an.instanceOf(RegExp);
    expect(validate.type(() => undefined, Function)).to.be.a("function");
    expect(validate.type(new Date(), Date)).to.be.an.instanceOf(Date);
    expect(validate.type(new Map(), Map)).to.be.an.instanceOf(Map);
    expect(validate.type(new Set(), Set)).to.be.an.instanceOf(Set);
    expect(validate.type(Buffer.alloc(0), Buffer)).to.be.an.instanceOf(Buffer);
  });

  it("should validate default values", () => {
    expect(validate.type(undefined, Number, "count", 12345)).to.equal(12345);
    expect(validate.type(undefined, Array, "list", [])).to.deep.equal([]);
    expect(validate.type(undefined, RegExp, "pattern", /regex/)).to.deep.equal(/regex/);
  });

  it("should throw an error for special values that are not allowed", () => {
    function notAllowed (value, allowed) {
      return () => {
        validate.type(value, allowed, "thing");
      };
    }

    expect(notAllowed(null, undefined))
      .to.throw(TypeError, "Invalid thing: null. Expected undefined.");

    expect(notAllowed(undefined, null))
      .to.throw(TypeError, "Invalid thing: undefined. Expected null.");

    expect(notAllowed(NaN, undefined))
      .to.throw(TypeError, "Invalid thing: NaN. Expected undefined.");
  });

  it("should throw an error for primitive values of the wrong type", () => {
    function notAllowed (value, allowed) {
      return () => {
        validate.type(value, allowed, "thing");
      };
    }

    expect(notAllowed("Hello, world!", Boolean))
      .to.throw(TypeError, 'Invalid thing: "Hello, world!". Expected a boolean.');

    expect(notAllowed(12345, String))
      .to.throw(TypeError, "Invalid thing: 12345. Expected a string.");

    expect(notAllowed(false, Number))
      .to.throw(TypeError, "Invalid thing: false. Expected a number.");

    expect(notAllowed(true, RegExp))
      .to.throw(TypeError, "Invalid thing: true. Expected a RegExp.");
  });

  it("should throw an error for wrapped primitive values of the wrong type", () => {
    function notAllowed (value, allowed) {
      return () => {
        validate.type(value, allowed, "thing");
      };
    }

    expect(notAllowed(new String("Hello, world!"), Number))
      .to.throw(TypeError, "Invalid thing: Hello, world!. Expected a number.");

    expect(notAllowed(new Number(12345), Date))
      .to.throw(TypeError, "Invalid thing: 12345. Expected a Date.");

    expect(notAllowed(new Boolean(false), Number))
      .to.throw(TypeError, "Invalid thing: false. Expected a number.");

    expect(notAllowed(BigInt(123456789), Number))
      .to.throw(TypeError, "Invalid thing: 123456789. Expected a number.");

    expect(notAllowed(Symbol("foo"), String))
      .to.throw(TypeError, "Invalid thing: Symbol(foo). Expected a string.");
  });

  it("should throw an error for values of the wrong type", () => {
    function notAllowed (value, allowed) {
      return () => {
        validate.type(value, allowed, "thing");
      };
    }

    expect(notAllowed(/regex/, String))
      .to.throw(TypeError, "Invalid thing: /regex/. Expected a string.");

    expect(notAllowed(() => undefined, Number))
      .to.throw(TypeError, "Invalid thing: () => undefined. Expected a number.");

    expect(notAllowed(new Date(), Number))
      .to.throw(TypeError, "Invalid thing: Date. Expected a number.");

    expect(notAllowed(new Map(), Array))
      .to.throw(TypeError, "Invalid thing: Map. Expected an Array.");

    expect(notAllowed(new Set([1, 2, 3]), Map))
      .to.throw(TypeError, "Invalid thing: Set. Expected a Map.");

    expect(notAllowed(Buffer.alloc(0), String))
      .to.throw(TypeError, "Invalid thing: Uint8Array. Expected a string.");
  });

});
