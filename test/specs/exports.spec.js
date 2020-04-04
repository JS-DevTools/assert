"use strict";

const { expect } = require("chai");
const commonJSExport = require("../../");
const { default: defaultExport, assert: namedExport } = require("../../");

describe("@jsdevtools/assert package exports", () => {

  it("should export the module as the default CommonJS export", () => {
    expect(commonJSExport).to.be.an("object");
    expect(defaultExport).to.include.keys("value", "type", "string", "number");
  });

  it("should export the assert function as the default ESM export", () => {
    expect(defaultExport).to.be.an("object");
    expect(defaultExport).to.include.keys("value", "type", "string", "number");
  });

  it("should export the assert function as a named ESM export", () => {
    expect(namedExport).to.be.an("object");
    expect(namedExport).to.include.keys("value", "type", "string", "number");
  });

  it("should export assert.number", () => {
    expect(namedExport.number).to.be.a("function");
    expect(namedExport.number.name).to.equal("assertNumber");
    expect(namedExport.number).to.equal(commonJSExport.number);
  });

  it("should export assert.string", () => {
    expect(namedExport.string).to.be.a("function");
    expect(namedExport.string.name).to.equal("assertString");
    expect(namedExport.string).to.equal(commonJSExport.string);
  });

  it("should export assert.type", () => {
    expect(namedExport.type).to.be.a("function");
    expect(namedExport.type.name).to.equal("assertType");
    expect(namedExport.type).to.equal(commonJSExport.type);
  });

  it("should export assert.value", () => {
    expect(namedExport.value).to.be.a("function");
    expect(namedExport.value.name).to.equal("assertHasValue");
    expect(namedExport.value).to.equal(commonJSExport.value);
  });

  it("should not export anything else", () => {
    expect(commonJSExport).to.have.keys(
      "default",
      "assert",
      "number",
      "string",
      "type",
      "value",
    );
  });

});
