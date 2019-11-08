/* globals BigInt */
/* eslint-disable no-new-object, no-new-wrappers */
"use strict";

const { validate } = require("../../");
const { expect } = require("chai");

describe("validate.type.oneOf()", () => {

  it("should validate special values that are in the list of allowed types", () => {
    expect(validate.type.oneOf(null, [String, Boolean, null, Number])).to.equal(null);
    expect(validate.type.oneOf(undefined, [String, Boolean, undefined, Number])).to.equal(undefined);
    expect(validate.type.oneOf(NaN, [String, Boolean, NaN, Number])).to.satisfy(Number.isNaN);
  });

  it("should validate primitive values that are in the list of allowed types", () => {
    expect(validate.type.oneOf("Hello, world!", [String, Boolean, null, Number])).to.equal("Hello, world!");
    expect(validate.type.oneOf(12345, [String, Boolean, undefined, Number])).to.equal(12345);
    expect(validate.type.oneOf(false, [String, Boolean, NaN, Number])).to.equal(false);
  });

  it("should validate wrapped primitive values that are in the list of allowed types", () => {
    expect(validate.type.oneOf(new String("Hello, world!"), [String, Boolean, null, Number])).to.deep.equal(new String("Hello, world!"));
    expect(validate.type.oneOf(new Number(12345), [String, Boolean, undefined, Number])).to.deep.equal(new Number(12345));
    expect(validate.type.oneOf(new Boolean(false), [String, Boolean, NaN, Number])).to.deep.equal(new Boolean(false));
    expect(validate.type.oneOf(BigInt(123456789), [String, Boolean, NaN, BigInt])).to.deep.equal(BigInt(123456789));
    expect(validate.type.oneOf(Symbol("foo"), [String, Boolean, Symbol, Number])).to.be.a("symbol");
  });

  it("should validate values that are instances of allowed types", () => {
    expect(validate.type.oneOf(/regex/, [String, Boolean, RegExp, Number])).to.be.an.instanceOf(RegExp);
    expect(validate.type.oneOf(() => undefined, [String, Function, RegExp, Number])).to.be.a("function");
    expect(validate.type.oneOf(new Date(), [String, Function, RegExp, Date])).to.be.an.instanceOf(Date);
    expect(validate.type.oneOf(new Map(), [String, Function, Map, Date])).to.be.an.instanceOf(Map);
    expect(validate.type.oneOf(new Set(), [String, Function, Set, Date])).to.be.an.instanceOf(Set);
    expect(validate.type.oneOf(Buffer.alloc(0), [String, Buffer, RegExp, Date])).to.be.an.instanceOf(Buffer);
  });

  it("should validate default values", () => {
    expect(validate.type.oneOf(undefined, [Number, BigInt], "count", 12345)).to.equal(12345);
    expect(validate.type.oneOf(undefined, [Array, Map, Set], "list", [])).to.deep.equal([]);
    expect(validate.type.oneOf(undefined, [String, RegExp], "pattern", /regex/)).to.deep.equal(/regex/);
  });

  it("should throw an error for special values that are not in the list of allowed types", () => {
    function notAllowed (value, allowed) {
      return () => {
        validate.type.oneOf(value, allowed, "thing");
      };
    }

    expect(notAllowed(null, [String, undefined, Date, NaN]))
      .to.throw(TypeError, "Invalid thing: null. Expected a string, Date, undefined, or NaN.");

    expect(notAllowed(undefined, [String, null, RegExp, NaN]))
      .to.throw(TypeError, "Invalid thing: undefined. Expected a string, RegExp, null, or NaN.");

    expect(notAllowed(NaN, [Map, undefined, Buffer, null]))
      .to.throw(TypeError, "Invalid thing: NaN. Expected a Map, Buffer, undefined, or null.");
  });

  it("should throw an error for primitive values that are not in the list of allowed types", () => {
    function notAllowed (value, allowed) {
      return () => {
        validate.type.oneOf(value, allowed, "thing");
      };
    }

    expect(notAllowed("Hello, world!", [Number, RegExp, undefined, Date, NaN, Boolean]))
      .to.throw(TypeError, 'Invalid thing: "Hello, world!". Expected a number, boolean, RegExp, Date, undefined, or NaN.');

    expect(notAllowed(12345, [String, RegExp, undefined, Date, NaN, Boolean]))
      .to.throw(TypeError, "Invalid thing: 12345. Expected a string, boolean, RegExp, Date, undefined, or NaN.");

    expect(notAllowed(false, [String, RegExp, undefined, Date, NaN, Number]))
      .to.throw(TypeError, "Invalid thing: false. Expected a string, number, RegExp, Date, undefined, or NaN.");

    expect(notAllowed(true, [String, RegExp, undefined, Date, NaN, Number]))
      .to.throw(TypeError, "Invalid thing: true. Expected a string, number, RegExp, Date, undefined, or NaN.");
  });

  it("should throw an error for wrapped primitive values that are not in the list of allowed types", () => {
    function notAllowed (value, allowed) {
      return () => {
        validate.type.oneOf(value, allowed, "thing");
      };
    }

    expect(notAllowed(new String("Hello, world!"), [Number, RegExp, undefined, Date, NaN, Boolean]))
      .to.throw(TypeError, "Invalid thing: Hello, world!. Expected a number, boolean, RegExp, Date, undefined, or NaN.");

    expect(notAllowed(new Number(12345), [String, RegExp, undefined, Date, NaN, Boolean]))
      .to.throw(TypeError, "Invalid thing: 12345. Expected a string, boolean, RegExp, Date, undefined, or NaN.");

    expect(notAllowed(new Boolean(false), [String, RegExp, undefined, Date, NaN, Number]))
      .to.throw(TypeError, "Invalid thing: false. Expected a string, number, RegExp, Date, undefined, or NaN.");

    expect(notAllowed(BigInt(123456789), [String, RegExp, undefined, Date, NaN, Number]))
      .to.throw(TypeError, "Invalid thing: 123456789. Expected a string, number, RegExp, Date, undefined, or NaN.");

    expect(notAllowed(Symbol("foo"), [String, RegExp, undefined, Date, NaN, Number]))
      .to.throw(TypeError, "Invalid thing: Symbol(foo). Expected a string, number, RegExp, Date, undefined, or NaN.");
  });

  it("should throw an error for values that are not in the list of allowed types", () => {
    function notAllowed (value, allowed) {
      return () => {
        validate.type.oneOf(value, allowed, "thing");
      };
    }

    expect(notAllowed(/regex/, [Number, Map, undefined, Date, NaN, Boolean]))
      .to.throw(TypeError, "Invalid thing: /regex/. Expected a number, boolean, Map, Date, undefined, or NaN.");

    expect(notAllowed(() => undefined, [String, RegExp, undefined, Date, NaN, Number]))
      .to.throw(TypeError, "Invalid thing: () => undefined. Expected a string, number, RegExp, Date, undefined, or NaN.");

    expect(notAllowed(new Date(), [String, RegExp, undefined, Symbol, NaN, Number]))
      .to.throw(TypeError, "Invalid thing: Date. Expected a string, symbol, number, RegExp, undefined, or NaN.");

    expect(notAllowed(new Map(), [String, RegExp, undefined, Date, NaN, Number]))
      .to.throw(TypeError, "Invalid thing: Map. Expected a string, number, RegExp, Date, undefined, or NaN.");

    expect(notAllowed(new Set([1, 2, 3]), [String, RegExp, Array, Date, Map, Number]))
      .to.throw(TypeError, "Invalid thing: Set. Expected a string, number, RegExp, Array, Date, or Map.");

    expect(notAllowed(Buffer.alloc(0), [String, Map, Function, Array, Set, Number]))
      .to.throw(TypeError, "Invalid thing: Uint8Array. Expected a string, number, Map, Function, Array, or Set.");
  });

});
