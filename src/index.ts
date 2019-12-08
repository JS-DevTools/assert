import { number } from "./number";
import { string } from "./string";
import { type } from "./type";
import { value } from "./value";

/**
 * CodeEngine validation functions
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
