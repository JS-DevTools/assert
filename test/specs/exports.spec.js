"use strict";

const { expect } = require("chai");
const commonJSExport = require("../../");
const { default: defaultExport } = require("../../");
const { validate: namedExport } = require("../../");

describe("@code-engine/validate package exports", () => {

  it("should export the module as the default CommonJS export", () => {
    expect(commonJSExport).to.be.an("object");
    expect(commonJSExport.default).to.equal(defaultExport);
    expect(commonJSExport.validate).to.equal(namedExport);
  });

  it("should export the validate function as the default ESM export", () => {
    expect(defaultExport).to.be.an("object");
    expect(defaultExport).to.have.keys("value", "type", "string", "number");
  });

  it("should export the validate function as a named ESM export", () => {
    expect(namedExport).to.be.an("object");
    expect(namedExport).to.have.keys("value", "type", "string", "number");
  });

  it("should not export anything else", () => {
    expect(commonJSExport).to.have.keys(
      "default",
      "validate",
    );
  });

});
