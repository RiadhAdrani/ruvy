import { isBlank } from "@riadh-adrani/utils";
import { Context } from "../context/index.js";
import { Callback, RawRoute, Route, RouterParams } from "../types/index.js";
import {
  findRouteFromList,
  flatten,
  fragmentize,
  getParams,
  getRouteFromUrl,
} from "./utils/index.js";

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

      const maybeRoute = findRouteFromList<T>(maybePath, this.routes);

      if (maybeRoute) {
        route = maybeRoute;
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

    if (current.fragments.length === 0 && depth === 0) {
      return findRouteFromList<T>("/", this.routes)?.component;
    }

    if (current.fragments.length <= depth) {
      return undefined;
    }

    const expected = `/${current.fragments.slice(0, depth + 1).join("/")}`;

    const expectedRoute = findRouteFromList<T>(expected, this.routes);

    return expectedRoute?.component;
  }

  getComponentByDepth(depth: number): T | undefined {
    const current = this.nearestRoute;

    if (depth === undefined) {
      return undefined;
    }

    if (!current) {
      return this.getCatchRouteByDepth(depth)?.component;
    }

    if (current.fragments.length === 0 && depth === 0) {
      return this.getRouteOrCatch("/", 0);
    }

    if (current.fragments.length <= depth) {
      return this.getCatchRouteByDepth(depth + 1)?.component;
    }

    const expected = `/${current.fragments.slice(0, depth + 1).join("/")}`;

    return this.getRouteOrCatch(expected, depth);
  }

  getCatchRouteByDepth(depth: number): Route<T> | undefined {
    const current = this.nearestRoute;

    let catchRoute = "/*";

    if (current) {
      // we find the [/../*] route if existing

      const catchBase = current.fragments.slice(0, depth - 1);

      catchRoute = `/${catchBase.join("/")}/*`;
    }

    let expectedRoute = findRouteFromList<T>(catchRoute, this.routes);

    if (!expectedRoute) {
      // backup catch all route
      expectedRoute = findRouteFromList<T>("/**", this.routes);
    }

    return expectedRoute;
  }

  getRouteOrCatch(path: string, depth: number): T | undefined {
    let expectedRoute = findRouteFromList<T>(path, this.routes);

    if (!expectedRoute) {
      expectedRoute = this.getCatchRouteByDepth(depth);
    }

    return expectedRoute?.component;
  }

  useContext<R>(callback: Callback<R>) {
    const depth = this.context.data ?? -1;

    return this.context.use(callback, depth + 1);
  }

  constructor(routes: Array<RawRoute>, { onStateChange, base, scrollToTop }: RouterParams) {
    this.onStateChange = onStateChange;
    this.base = base ?? this.base;
    this.scrollToTop = scrollToTop ?? false;
    this.routes = flatten(routes);

    window.addEventListener("popstate", () => {
      this.onStateChange();
    });

    const path = this.getCorrectPath(getRouteFromUrl(this.base));

    this.replace(path);
  }

  getCorrectPath(to: string): string {
    const maybe = findRouteFromList(to, this.routes);

    if (!maybe) {
      return to;
    }

    return maybe.redirectTo ?? to;
  }

  shouldTriggerUpdate(path: string): boolean {
    if (isBlank(path)) {
      return false;
    }

    return path.trim() !== this.path;
  }

  isNavigatable(path: string): boolean {
    return path[0] === "/";
  }

  push(to: string) {
    if (!this.shouldTriggerUpdate(to)) {
      return;
    }

    const path = this.getCorrectPath(to);

    history.pushState({ path }, "", `${this.base}${path}`);

    this.onStateChange();
    this.updateTitle();
  }

  replace(to: string) {
    if (!this.shouldTriggerUpdate(to)) {
      return;
    }

    const path = this.getCorrectPath(to);

    history.replaceState({ path }, "", `${this.base}${path}`);

    this.onStateChange();
    this.updateTitle();
  }

  updateTitle() {
    if (this.nearestRoute?.title) {
      document.title = this.nearestRoute?.title;
    }
  }
}
