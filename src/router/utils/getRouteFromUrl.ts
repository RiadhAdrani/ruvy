import { isBlank } from "@riadh-adrani/utility-js";

export default (base = ""): string => {
  if (!isBlank(base)) {
    return location.pathname.substring(`/${base}`.length);
  } else {
    return location.pathname;
  }
};
