import { isArray, isFalsy } from '@riadh-adrani/obj-utils';
import type { Arrayable } from '@riadh-adrani/type-utils';

/**
 * filters the list of provided classes (removes `null` and `undefined`)
 * and returns a valid className as `string`.
 * @param classes array of : `Array<string>` | `string` | `null` | `undefined`
 */
export const joinClasses = (
  ...classes: Array<Arrayable<string | undefined | null | boolean>>
): string => {
  const filtered = classes.filter(it => !isFalsy(it));

  return filtered
    .map(it => (isArray(it) ? it.filter(cls => !isFalsy(cls)).join(' ') : it))
    .join(' ')
    .trim();
};
