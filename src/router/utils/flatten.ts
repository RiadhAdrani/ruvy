import { copy, isArray, isBlank } from "@riadh-adrani/utils";
import { RawRoute, Route } from "../../types/index.js";
import fragmentize from "./fragmentize.js";

const flatten = <T>(_items: Array<RawRoute>, parent?: string): Record<string, Route<T>> => {
  const items = copy(_items);

  let output: Record<string, Route> = {};

  if (!isArray(items)) {
    throw "Unexpected Input: items should be an array.";
  }

  items.forEach(item => {
    if (isBlank(item.path)) {
      throw "Unexpected Input: path is not a valid string.";
    }

    const root = `${parent ?? ""}${parent === "/" ? "" : "/"}`;
    const path = `${root}${item.path}`.replace("//", "/");
    const fragments = fragmentize(path);
    const isDynamic = fragments.some(f => f[0] === ":");

    const valid = { ...item };
    delete valid.routes;

    const route: Route = { ...valid, fragments, path, isDynamic };

    output = { ...output, [path]: route };

    if (item.routes) {
      output = { ...output, ...flatten(item.routes, path) };
    }
  });

  return output as Record<string, Route<T>>;
};

export default flatten;
