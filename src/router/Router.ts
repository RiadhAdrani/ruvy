import { Context } from "../context";
import { Callback, RawRoute, Route, RouterConfig } from "../types";
import { findRouteFromList, flatten, fragmentize, getParams, getRouteFromUrl } from "./utils";

export default class Router<T = unknown> {
  routes: Record<string, Route<T>> = {};
  base = "";
  scrollToTop = false;
  onStateChange: Callback;

  context = new Context<number>();

  get path(): string {
    return getRouteFromUrl(this.base);
  }

  get route(): Route<T> | undefined {
    return findRouteFromList(this.path, this.routes) as Route<T>;
  }

  get nearestRoute(): Route<T> | undefined {
    const fragments = fragmentize(this.path);

    let route: Route<T> | undefined;

    if (fragments.length === 0) {
      route = findRouteFromList<T>("/", this.routes);
    }

    for (let i = 0; i < fragments.length; i++) {
      const maybePath = `/${fragments.slice(0, i + 1).join("/")}`;

      const maybeRoute = findRouteFromList(maybePath, this.routes);

      if (maybeRoute) {
        route = maybeRoute as Route<T>;
      }
    }

    return route;
  }

  get params(): Record<string, string> {
    return getParams(this.path, this.nearestRoute?.path ?? "");
  }

  get component(): T | undefined {
    const depth = this.context.data;
    const current = this.nearestRoute;

    if (depth === undefined) {
      return undefined;
    }

    if (!current) {
      return undefined;
    }

    console.log(depth);

    if (current.fragments.length < depth) {
      return undefined;
    }

    const expected = `/${current.fragments.join("/")}`;

    const expectedRoute = findRouteFromList<T>(expected, this.routes);

    if (!expectedRoute) {
      return undefined;
    }

    return expectedRoute.component;
  }

  useContext<R>(callback: Callback<R>) {
    const depth = this.context.data ?? -1;

    return this.context.use(callback, depth + 1, () => {
      console.log("has ended: ", this.context.data);
    });
  }

  constructor(routes: Array<RawRoute>, { onStateChange, base, scrollToTop }: RouterConfig) {
    this.onStateChange = onStateChange;
    this.base = base ?? this.base;
    this.scrollToTop = scrollToTop ?? false;
    this.routes = flatten(routes);

    window.addEventListener("popstate", () => {
      this.onStateChange();
    });
  }

  push(path: string) {
    // TODO : we need to check if path is the same

    history.pushState({ path }, "", `${this.base}${path}`);

    this.onStateChange();
  }

  replace(path: string) {
    // TODO : we need to check if path is the same

    history.replaceState({ path }, "", `${this.base}${path}`);

    this.onStateChange();
  }
}
