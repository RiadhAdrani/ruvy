import { isBlank } from "@riadh-adrani/utils";

export default (base = ""): string => {
  if (!isBlank(base)) {
    return location.pathname.substring(`/${base}`.length);
  } else {
    return location.pathname;
  }
};
