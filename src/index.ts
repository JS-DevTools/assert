import { number } from "./number";
import { string } from "./string";
import { type } from "./type";
import { value } from "./value";

/**
 * Simple validation helpers with user-friendly error messages
 */
export const validate = {
  value,
  type,
  string,
  number,
};

// Export `validate` as the default export
// tslint:disable: no-default-export
export default validate;

// CommonJS default export hack
if (typeof module === "object" && typeof module.exports === "object") {
  module.exports = Object.assign(module.exports.default, module.exports);  // tslint:disable-line: no-unsafe-any
}
