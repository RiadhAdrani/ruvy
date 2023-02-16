import { isBlank } from "@riadh-adrani/utility-js";
import { Route } from "../../types";

export default (path: string, record: Record<string, Route>): Route | undefined => {
  const fragments = path.split("/").filter((f) => !isBlank(f));

  if (fragments.length === 0) {
    if (path === "/") {
      return record[path];
    } else {
      return undefined;
    }
  } else {
    // we need to narrow down to the same length of fragments
    const withSameLength = Object.keys(record)
      .filter((route) => record[route].fragments.length === fragments.length)
      .map((route) => record[route]);

    if (withSameLength.length === 0) {
      return undefined;
    } else {
      // try to find exact match first
      const exact = withSameLength.find(
        (route) => route.fragments.join("/") === fragments.join("/")
      );

      if (exact) {
        return exact;
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
        .find((route) =>
          route.fragments.every((fragment, index) => {
            return fragment === fragments[index] || fragment[0] === ":";
          })
        );

      return first;
    }
  }
};
