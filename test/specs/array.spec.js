/* eslint-disable no-new-wrappers */
"use strict";

const { assert } = require("../../");
const { expect } = require("chai");

describe("assert.array()", () => {

  it("should assert empty arrays", () => {
    expect(assert.array([])).to.deep.equal([]);
  });

  it("should assert arrays with falsy items", () => {
    expect(assert.array([undefined])).to.deep.equal([undefined]);
    expect(assert.array([null])).to.deep.equal([null]);
    expect(assert.array([false])).to.deep.equal([false]);
    expect(assert.array([NaN])).to.deep.equal([NaN]);
  });

  it("should assert arrays with contents", () => {
    expect(assert.array("Hello".split(""))).to.deep.equal(["H", "e", "l", "l", "o"]);
    expect(assert.array([1, 2, 3, 4])).to.deep.equal([1, 2, 3, 4]);
    expect(assert.array([true, false])).to.deep.equal([true, false]);
    expect(assert.array([Date, Object.toString])).to.deep.equal([Date, Object.toString]);
  });

  it("should assert default values", () => {
    expect(assert.array(undefined, "list", [])).to.deep.equal([]);
    expect(assert.array(undefined, "list", [1, 2, 3])).to.deep.equal([1, 2, 3]);
    expect(assert.array(undefined, "list", ["H", "e", "l", "l", "o"])).to.deep.equal(["H", "e", "l", "l", "o"]);
  });

  it("should throw an error for invalid values", () => {
    function invalid (value) {
      return () => {
        assert.array(value);
      };
    }

    expect(invalid(NaN)).to.throw(TypeError, "Invalid value: NaN. Expected an array.");
    expect(invalid(null)).to.throw(TypeError, "Invalid value: null. Expected an array.");
    expect(invalid(0)).to.throw(TypeError, "Invalid value: 0. Expected an array.");
    expect(invalid("hello")).to.throw(TypeError, 'Invalid value: "hello". Expected an array.');
    expect(invalid(Number.MAX_VALUE)).to.throw(TypeError, "Invalid value: 1.7976931348623157e+308. Expected an array.");
    expect(invalid(Array)).to.throw(TypeError, "Invalid value: function. Expected an array.");
    expect(invalid(new Date())).to.throw(TypeError, "Invalid value: Date. Expected an array.");
    expect(invalid(/1234/)).to.throw(TypeError, "Invalid value: /1234/. Expected an array.");
    expect(invalid({ foo: "bar" })).to.throw(TypeError, "Invalid value: {foo}. Expected an array.");
  });

  it("should throw an error for invalid defaults", () => {
    function invalidDefault (defaultValue) {
      return () => {
        assert.array(undefined, "list", defaultValue);
      };
    }

    expect(invalidDefault(NaN)).to.throw(TypeError, "Invalid list: NaN. Expected an array.");
    expect(invalidDefault(null)).to.throw(TypeError, "Invalid list: null. Expected an array.");
    expect(invalidDefault(0)).to.throw(TypeError, "Invalid list: 0. Expected an array.");
    expect(invalidDefault("hello")).to.throw(TypeError, 'Invalid list: "hello". Expected an array.');
    expect(invalidDefault(Number.MAX_VALUE)).to.throw(TypeError, "Invalid list: 1.7976931348623157e+308. Expected an array.");
    expect(invalidDefault(Array)).to.throw(TypeError, "Invalid list: function. Expected an array.");
    expect(invalidDefault(new Date())).to.throw(TypeError, "Invalid list: Date. Expected an array.");
    expect(invalidDefault(/1234/)).to.throw(TypeError, "Invalid list: /1234/. Expected an array.");
    expect(invalidDefault({ foo: "bar" })).to.throw(TypeError, "Invalid list: {foo}. Expected an array.");
  });

});
