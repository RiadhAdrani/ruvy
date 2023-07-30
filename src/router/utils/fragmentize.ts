import { isBlank } from '@riadh-adrani/str-utils';

export default (path: string): Array<string> => {
  return path.split('/').filter(fragment => !isBlank(fragment));
};
