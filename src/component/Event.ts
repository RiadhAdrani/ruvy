import { isFunction } from "@riadh-adrani/utility-js";

const isValidName = (name: string): boolean => {
  return /^on[A-Z]{1}[a-z]{1,}$/.test(name);
};

const isValid = (name: string, callback: unknown) => {
  return isValidName(name) && isFunction(callback);
}

export default { isValid, isValidName }