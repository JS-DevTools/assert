import { assert } from "./assert";

export { assert };

// Export `assert` as the default export
export default assert;

// CommonJS default export hack
/* eslint-env commonjs */
if (typeof module === "object" && typeof module.exports === "object") {
  module.exports = Object.assign(module.exports.default, module.exports);
}
