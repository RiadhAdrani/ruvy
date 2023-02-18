import { Callback, RawRoute, Route, RouterConfig } from "../types";
import { findRouteFromList, flatten, getParams, getRouteFromUrl } from "./utils";

export default class Router {
  routes: Record<string, Route> = {};
  base = "";
  scrollToTop = false;
  onStateChange: Callback;

  get path(): string {
    return getRouteFromUrl(this.base);
  }

  get route(): Route | undefined {
    return findRouteFromList(this.path, this.routes);
  }

  get params(): Record<string, string> {
    return getParams(this.path, this.route?.path ?? "");
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
    history.pushState({ path }, "", `${this.base}${path}`);

    this.onStateChange();
  }

  replace(path: string) {
    history.replaceState({ path }, "", `${this.base}${path}`);

    this.onStateChange();
  }
}
