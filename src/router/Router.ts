import { isObject, hasProperty, isNumber, forEachKey } from '@riadh-adrani/obj-utils';
import { isBlank } from '@riadh-adrani/str-utils';
import { Callback } from '@riadh-adrani/type-utils';
import {
  NamedNavigationRequest,
  RawRoute,
  Route,
  RouterConstructorParams,
  NavigationRequest,
  TransformTitle,
} from './types.js';
import {
  findRouteFromList,
  flatten,
  fragmentize,
  getParams,
  getRouteFromUrl,
} from './utils/index.js';

export default class Router<T = unknown> {
  routes: Record<string, Route<T>> = {};
  base = '';
  scrollToTop = false;
  onStateChange: Callback;
  titleSuffix = '';
  titlePrefix = '';
  transformTitle: TransformTitle;

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
      route = findRouteFromList<T>('/', this.routes);
    }

    for (let i = 0; i < fragments.length; i++) {
      const maybePath = `/${fragments.slice(0, i + 1).join('/')}`;

      const maybeRoute = findRouteFromList<T>(maybePath, this.routes);

      if (maybeRoute) {
        route = maybeRoute;
      }
    }

    return route;
  }

  get params(): Record<string, string> {
    return getParams(this.path, this.nearestRoute?.path ?? '');
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
      return this.getRouteOrCatch('/', 0);
    }

    if (current.fragments.length <= depth) {
      return this.getCatchRouteByDepth(depth + 1)?.component;
    }

    const expected = `/${current.fragments.slice(0, depth + 1).join('/')}`;

    return this.getRouteOrCatch(expected, depth);
  }

  getCatchRouteByDepth(depth: number): Route<T> | undefined {
    const current = this.nearestRoute;

    let catchRoute = '/*';

    if (current) {
      // we find the [/../*] route if existing

      const catchBase = current.fragments.slice(0, depth - 1);

      catchRoute = `/${catchBase.join('/')}/*`;
    }

    let expectedRoute = findRouteFromList<T>(catchRoute, this.routes);

    if (!expectedRoute) {
      // backup catch all route
      expectedRoute = findRouteFromList<T>('/**', this.routes);
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

  constructor(
    routes: Array<RawRoute>,
    {
      onStateChange,
      base,
      scrollToTop,
      titlePrefix,
      titleSuffix,
      transformTitle,
    }: RouterConstructorParams,
  ) {
    this.onStateChange = onStateChange;
    this.base = base ?? this.base;
    this.scrollToTop = scrollToTop ?? false;
    this.routes = flatten(routes);
    this.titlePrefix = titlePrefix ?? '';
    this.titleSuffix = titleSuffix ?? '';
    this.transformTitle = transformTitle ?? (t => t);

    window.addEventListener('popstate', () => {
      this.onStateChange();
    });

    // check if base is not blank and valid
    if (!isBlank(base ?? '') && !base?.startsWith('/')) {
      throw `[Ruvy] Unexpected Input : invalid base (${base}), should start with "/"`;
    }

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

  shouldTriggerUpdate(request: string | number): boolean {
    if (isNumber(request)) {
      return request !== 0;
    }

    if (isBlank(request as string)) {
      return false;
    }

    return (request as string).trim() !== this.path;
  }

  isNavigatable(path: string): boolean {
    return path[0] === '/';
  }

  push(to: NavigationRequest) {
    const $to: string | number = this.transformNavigationRequest(to);

    if (!this.shouldTriggerUpdate($to)) {
      return;
    }

    if (isNumber($to)) {
      history.go($to as number);

      return;
    }

    const path = this.getCorrectPath($to as string);

    const url = `${this.base}${path}`;

    history.pushState({ path }, '', url);

    this.onStateChange();
  }

  replace(to: Exclude<NavigationRequest, number>) {
    const $to: string | number = this.transformNavigationRequest(to);

    if (!this.shouldTriggerUpdate($to)) {
      return;
    }

    const path = this.getCorrectPath(`${$to}`);

    const url = `${this.base}${path}`;

    history.replaceState({ path }, '', url);

    this.onStateChange();
  }

  updateTitle() {
    const nearest = this.nearestRoute;

    if (nearest && nearest.title) {
      document.title = `${this.titlePrefix}${this.transformTitle(nearest.title, nearest)}${
        this.titleSuffix
      }`;
    }
  }

  updateScroll() {
    if (this.scrollToTop) {
      window.scrollTo(0, 0);
    }
  }

  onPostStateChange() {
    this.updateTitle();
    this.updateScroll();
  }

  buildPathFromRequest(request: NamedNavigationRequest): string {
    const { name, params, search } = request;

    const key = Object.keys(this.routes).find(it => this.routes[it].name === name);

    if (!key) {
      return '';
    }

    const route = this.routes[key];

    let path = route.fragments
      .map(it => {
        if (it.startsWith(':')) {
          const key = it.substring(1);

          return `${params ? params[key] : undefined}`;
        }

        return it;
      })
      .join('/');

    // add searchparams
    if (search) {
      // transform arrays to string
      const record: Record<string, string> = {};

      forEachKey((key, value) => {
        record[key] = `${value}`;
      }, search);

      const query = new URLSearchParams(record).toString();

      if (!isBlank(query)) {
        path = `${path}?${query}`;
      }
    }

    return `/${path}`;
  }

  transformNavigationRequest(request: NavigationRequest): string | number {
    // if string we return it
    if (!isNamedNavigationRequest(request)) {
      return request as string;
    }

    // we have a named request
    // build the route
    return this.buildPathFromRequest(request as NamedNavigationRequest);
  }

  buildHrefFromRequest(request: NavigationRequest): string | undefined {
    if (isNumber(request)) {
      return undefined;
    }

    let url = this.transformNavigationRequest(request);

    if (isNumber(request as number)) return undefined;

    if (this.base) {
      url = `${this.base}${url}`;
    }

    return url as string;
  }
}

export const isNamedNavigationRequest = (o: unknown): boolean => {
  return isObject(o) && hasProperty(o, 'name');
};
