import { Arrayable, isArray, isDefined } from '@riadh-adrani/utils';

/**
 * filters the list of provided classes (removes `null` and `undefined`)
 * and returns a valid className as `string`.
 * @param classes array of : `Array<string>` | `string` | `null` | `undefined`
 */
export const joinClasses = (...classes: Array<Arrayable<string> | undefined>): string => {
  const filtered = classes.filter(it => isDefined(it));

  return filtered.map(it => (isArray(it) ? (it as Array<string>).join(' ') : it)).join(' ');
};
