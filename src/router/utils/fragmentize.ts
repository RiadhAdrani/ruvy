import { isBlank } from "@riadh-adrani/utility-js";

export default (path: string): Array<string> => {
  return path.split("/").filter((fragment) => !isBlank(fragment));
};
