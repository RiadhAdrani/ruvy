import { isBlank } from '@riadh-adrani/utils';

export default (base = ''): string => {
  if (!isBlank(base)) {
    const includeBase = location.pathname.substring(0, base.length) === base;

    if (!includeBase) {
      return location.pathname;
    }

    return location.pathname.substring(base.length);
  } else {
    return location.pathname;
  }
};
