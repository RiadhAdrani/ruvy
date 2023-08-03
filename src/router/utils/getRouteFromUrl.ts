import { isBlank } from '@riadh-adrani/str-utils';

export const getPathFromURL = (url: string, base = ''): string => {
  if (!isBlank(base)) {
    const includeBase = url.substring(0, base.length) === base;

    if (!includeBase) {
      return url;
    }

    return url.substring(base.length);
  } else {
    return url;
  }
};

export default (base = ''): string => {
  return getPathFromURL(location.pathname, base);
};
