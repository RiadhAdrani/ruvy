import { Callback, RawRoute, Route, RouterConfig } from "../types";
import { flatten } from "./utils";

export default class Router {
  routes: Record<string, Route> = {};
  base = "";
  scrollToTop = false;
  onStateChange: Callback;

  constructor(routes: Array<RawRoute>, { onStateChange, base, scrollToTop }: RouterConfig) {
    this.onStateChange = onStateChange;
    this.base = base ?? this.base;
    this.scrollToTop = scrollToTop ?? false;
    this.routes = flatten(routes);

    // we need to calculate current route

    window.addEventListener("popstate", () => {
      this.onStateChange();
    });
  }

  push(path: string) {
    history.pushState({ path }, "", path);

    this.onStateChange();
  }

  replace(path: string) {
    history.replaceState({ path }, "", path);

    this.onStateChange();
  }
}
