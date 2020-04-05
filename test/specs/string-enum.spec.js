"use strict";

const { assert } = require("../../lib");
const { expect } = require("chai");

describe("assert.string.enum()", () => {

  it("should assert values that are in the enumeration", () => {
    expect(assert.string.enum("foo", { Foo: "foo", Bar: "bar" })).to.equal("foo");
    expect(assert.string.enum("3", { One: "1", Two: "2", Three: "3" })).to.equal("3");
    expect(assert.string.enum("", { None: "", All: "all" })).to.equal("");
  });

  it("should throw an error for values that are not in the list of allowed values", () => {
    function notAllowed (value, enumeration) {
      return () => {
        assert.string.enum(value, enumeration);
      };
    }

    expect(notAllowed("Foo", { Foo: "foo", Bar: "bar" }))
      .to.throw(TypeError, 'Invalid value: "Foo". Expected foo or bar.');

    expect(notAllowed("5", { One: "1", Two: "2", Three: "3" }))
      .to.throw(TypeError, 'Invalid value: "5". Expected 1, 2, or 3.');

    expect(notAllowed("", { None: "none", All: "all" }))
      .to.throw(TypeError, 'Invalid value: "". Expected none or all.');
  });

  it("should throw an error for invalid defaults", () => {
    function badDefault (defaultValue, enumeration) {
      return () => {
        assert.string.enum(undefined, enumeration, "thing", defaultValue);
      };
    }

    expect(badDefault("Foo", { Foo: "foo", Bar: "bar" }))
      .to.throw(TypeError, 'Invalid thing: "Foo". Expected foo or bar.');

    expect(badDefault("5", { One: "1", Two: "2", Three: "3" }))
      .to.throw(TypeError, 'Invalid thing: "5". Expected 1, 2, or 3.');

    expect(badDefault("", { None: "none", All: "all" }))
      .to.throw(TypeError, 'Invalid thing: "". Expected none or all.');
  });

});
