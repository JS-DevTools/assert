"use strict";

const { expect } = require("chai");
const commonJSExport = require("../../");
const { default: defaultExport } = require("../../");
const { validate: namedExport } = require("../../");

describe("@code-engine/validate package exports", () => {

  it("should export the validate function as the default CommonJS export", () => {
    expect(commonJSExport).to.be.an("object");
    expect(commonJSExport).to.equal(defaultExport);
    expect(commonJSExport).to.equal(namedExport);
  });

  it("should export the validate function as the default ESM export", () => {
    expect(defaultExport).to.be.an("object");
    expect(defaultExport).to.equal(commonJSExport);
    expect(defaultExport).to.equal(namedExport);
  });

  it("should export the validate function as a named ESM export", () => {
    expect(namedExport).to.be.an("object");
    expect(namedExport).to.equal(commonJSExport);
    expect(namedExport).to.equal(defaultExport);
  });

  it("should not export anything else", () => {
    expect(commonJSExport).to.have.keys(
      "default",
      "validate",
      "string",
      "number",
      "type",
      "value",
    );
  });

});
