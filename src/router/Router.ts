import { Context } from "../context";
import { Callback, RawRoute, Route, RouterConfig } from "../types";
import { findRouteFromList, flatten, getParams, getRouteFromUrl } from "./utils";

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

  get params(): Record<string, string> {
    return getParams(this.path, this.route?.path ?? "");
  }

  get object(): T | undefined {
    const depth = this.context.data;
    const current = this.route;

    if (depth === undefined) {
      return undefined;
    }

    if (!current) {
      return undefined;
    }

    if (current.fragments.length <= depth) {
      return undefined;
    }

    const expected = `/${current.fragments.join("/")}`;

    const expectedRoute = findRouteFromList(expected, this.routes);

    if (!expectedRoute) {
      return undefined;
    }

    return expectedRoute.object as T;
  }

  useContext<R>(callback: Callback<R>) {
    const depth = this.context.data ?? -1;

    return this.context.use(callback, depth + 1);
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
