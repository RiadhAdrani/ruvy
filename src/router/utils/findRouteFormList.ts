import { Route } from '../types.js';
import fragmentize from './fragmentize.js';

export default <T>(path: string, record: Record<string, Route<T>>): Route<T> | undefined => {
  const fragments = fragmentize(path);

  if (fragments.length === 0) {
    if (path === '/') {
      return record[path] as Route<T>;
    } else {
      return undefined;
    }
  } else {
    // we need to narrow down to the same length of fragments
    const withSameLength = Object.keys(record)
      .filter(route => record[route].fragments.length === fragments.length)
      .map(route => record[route]);

    if (withSameLength.length === 0) {
      return undefined;
    } else {
      // try to find exact match first
      const exact = withSameLength.find(route => route.fragments.join('/') === fragments.join('/'));

      if (exact) {
        return exact as Route<T>;
      }

      const first = withSameLength
        .sort((a, b) => {
          if (a.isDynamic === b.isDynamic) {
            return 0;
          } else if (!a.isDynamic && b.isDynamic) {
            return -1;
          } else {
            return 1;
          }
        })
        .find(route =>
          route.fragments.every((fragment, index) => {
            return fragment === fragments[index] || fragment[0] === ':';
          })
        );

      return first as Route<T>;
    }
  }
};
