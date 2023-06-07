import { isBlank } from '@riadh-adrani/utils';

export default (path: string): Array<string> => {
  return path.split('/').filter(fragment => !isBlank(fragment));
};
