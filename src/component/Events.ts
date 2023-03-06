import { isFunction } from "@riadh-adrani/utils";
import { isOnEventName } from "@riadh-adrani/dom-control-js";

const isValidName = (name: string): boolean => {
  return isOnEventName(name);
};

const isValid = (name: string, callback: unknown) => {
  return isValidName(name) && isFunction(callback);
};

export default { isValid, isValidName };
