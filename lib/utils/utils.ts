import { isArray, isFalsy } from '../helpers/obj-utils.js';
import type { Arrayable } from '../helpers/type-utils.js';

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
