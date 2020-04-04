"use strict";

const { assert } = require("../../");
const { expect } = require("chai");

describe("assert.value.oneOf()", () => {

  it("should assert values that are in the list of allowed values", () => {
    expect(assert.value.oneOf(1.0, [1, 2, 3, 4, 5])).to.equal(1);
    expect(assert.value.oneOf(false, [true, false])).to.equal(false);
    expect(assert.value.oneOf("Wilma", ["Fred", "Barney", "Wilma", "Betty"])).to.equal("Wilma");
  });

  it("should throw an error for values that are not in the list of allowed values", () => {
    function notAllowed (value, allowed) {
      return () => {
        assert.value.oneOf(value, allowed);
      };
    }

    expect(notAllowed(-1, [1, 2, 3, 4]))
      .to.throw(TypeError, "Invalid value: -1. Expected 1, 2, 3, or 4.");

    expect(notAllowed(0, [true, false]))
      .to.throw(TypeError, "Invalid value: 0. Expected true or false.");

    expect(notAllowed("Arnold", ["Fred", "Barney", "Wilma", "Betty"]))
      .to.throw(TypeError, 'Invalid value: "Arnold". Expected "Fred", "Barney", "Wilma", or "Betty"');
  });

  it("should throw an error for invalid defaults", () => {
    function badDefault (allowed, defaultValue) {
      return () => {
        assert.value.oneOf(undefined, allowed, "thing", defaultValue);
      };
    }

    expect(badDefault([1, 2, 3], Number.MAX_SAFE_INTEGER))
      .to.throw(TypeError, "Invalid thing: 9007199254740991. Expected 1, 2, or 3.");

    expect(badDefault([true, false], "true"))
      .to.throw(TypeError, 'Invalid thing: "true". Expected true or false.');

    expect(badDefault(["Fred", "Barney", "Wilma", "Betty"], /Wilma/))
      .to.throw(TypeError, 'Invalid thing: /Wilma/. Expected "Fred", "Barney", "Wilma", or "Betty"');
  });

});
