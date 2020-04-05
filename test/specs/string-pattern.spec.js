"use strict";

const { assert } = require("../../lib");
const { expect } = require("chai");

describe("assert.string.pattern()", () => {

  it("should assert values that match the pattern", () => {
    expect(assert.string.pattern("", /^$/)).to.equal("");
    expect(assert.string.pattern("FoOo", /^fo+$/i)).to.equal("FoOo");
    expect(assert.string.pattern("logo.jpg", /\.(jpg|jpeg)$/)).to.equal("logo.jpg");
  });

  it("should throw an error for values that do not match the pattern", () => {
    function invalid (value, pattern) {
      return () => {
        assert.string.pattern(value, pattern);
      };
    }

    expect(invalid("foobar", /^fo+$/i))
      .to.throw(Error, 'Invalid value: "foobar". It must match /^fo+$/i.');

    expect(invalid("jpeg.gif", /\.(jpg|jpeg)$/))
      .to.throw(Error, 'Invalid value: "jpeg.gif". It must match /\\.(jpg|jpeg)$/.');

    expect(invalid("", /^a-z+$/))
      .to.throw(Error, 'Invalid value: "". It must match /^a-z+$/.');
  });

  it("should throw an error for invalid defaults", () => {
    function badDefault (defaultValue, pattern) {
      return () => {
        assert.string.pattern(undefined, pattern, "thing", defaultValue);
      };
    }

    expect(badDefault("foobar", /^fo+$/i))
      .to.throw(Error, 'Invalid thing: "foobar". It must match /^fo+$/i.');

    expect(badDefault("jpeg.gif", /\.(jpg|jpeg)$/))
      .to.throw(Error, 'Invalid thing: "jpeg.gif". It must match /\\.(jpg|jpeg)$/.');

    expect(badDefault("", /^a-z+$/))
      .to.throw(Error, 'Invalid thing: "". It must match /^a-z+$/.');
  });

  it("should throw an error using the example", () => {
    function invalidWithExample (value, pattern, example) {
      return () => {
        pattern.examples = example;
        pattern.example = example;
        assert.string.pattern(value, pattern);
      };
    }

    expect(invalidWithExample("foobar", /^fo+$/i, "fooooo"))
      .to.throw(Error, 'Invalid value: "foobar". It should look like "fooooo".');

    expect(invalidWithExample("jpeg.gif", /\.(jpg|jpeg)$/, ["image.jpg", "image.jpeg"]))
      .to.throw(Error, 'Invalid value: "jpeg.gif". It should look like "image.jpg" or "image.jpeg".');

    expect(invalidWithExample("", /^a-z$/, ["a", "b", "c", "d", "e"]))
      .to.throw(Error, 'Invalid value: "". It should look like "a", "b", "c", "d", or "e".');
  });

  it("should not use the example if it's not a string", () => {
    function invalidExample (value, pattern, example) {
      return () => {
        pattern.example = example;
        assert.string.pattern(value, pattern);
      };
    }

    expect(invalidExample("foobar", /^fo+$/i, 12345))
      .to.throw(Error, 'Invalid value: "foobar". It must match /^fo+$/i.');

    expect(invalidExample("jpeg.gif", /\.(jpg|jpeg)$/, new Date()))
      .to.throw(Error, 'Invalid value: "jpeg.gif". It must match /\\.(jpg|jpeg)$/.');

    expect(invalidExample("", /^a-z+$/, String))
      .to.throw(Error, 'Invalid value: "". It must match /^a-z+$/.');
  });

});
