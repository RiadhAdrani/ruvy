import { copy, isArray, isBlank } from "@riadh-adrani/utility-js";
import { RawRoute, Route } from "../../types";

const flatten = (_items: Array<RawRoute>, parent?: string): Record<string, Route> => {
  const items = copy(_items);

  let output: Record<string, Route> = {};

  if (!isArray(items)) {
    throw "Unexpected Input: items should be an array.";
  }

  items.forEach((item) => {
    if (isBlank(item.path)) {
      throw "Unexpected Input: path is not a valid string.";
    }

    const root = `${parent ?? ""}${parent === "/" ? "" : "/"}`;
    const path = `${root}${item.path}`.replace("//", "/");
    const fragments = path.split("/").filter((fragment) => !isBlank(fragment));

    const valid = { ...item };
    delete valid.routes;

    const route: Route = { ...valid, fragments, path };

    output = { ...output, [path]: route };

    if (item.routes) {
      output = { ...output, ...flatten(item.routes, path) };
    }
  });

  return output;
};

export default flatten;
