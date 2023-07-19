import {
  isBlank,
  Callback,
  isObject,
  hasProperty,
  isNumber,
  forEachKey,
} from '@riadh-adrani/utils';
import { Context } from '../context/index.js';
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

  /**
   * @deprecated
   */
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
      return findRouteFromList<T>('/', this.routes)?.component;
    }

    if (current.fragments.length <= depth) {
      return undefined;
    }

    const expected = `/${current.fragments.slice(0, depth + 1).join('/')}`;

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

  /**
   * @deprecated
   */
  useContext<R>(callback: Callback<R>) {
    const depth = this.context.data ?? -1;

    return this.context.use(callback, depth + 1);
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
    }: RouterConstructorParams
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
      throw `[Ruvy] invalid base (${base})`;
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
    const $to: string | number = transformNavigationRequest(to, this.routes);

    if (!this.shouldTriggerUpdate($to)) {
      return;
    }

    if (isNumber($to)) {
      history.go($to as number);

      return;
    }

    const path = this.getCorrectPath($to as string);

    history.pushState({ path }, '', `${this.base}${path}`);

    this.onStateChange();
  }

  replace(to: Exclude<NavigationRequest, number>) {
    const $to: string | number = transformNavigationRequest(to, this.routes);

    if (!this.shouldTriggerUpdate($to)) {
      return;
    }

    const path = this.getCorrectPath(`${$to}`);

    history.replaceState({ path }, '', `${this.base}${path}`);

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
}

export const isNamedNavigationRequest = (o: unknown): boolean => {
  return isObject(o) && hasProperty(o, 'name');
};

export const buildPathFromRequest = (
  request: NamedNavigationRequest,
  routes: Record<string, Route>
): string => {
  const { name, params, search } = request;

  const key = Object.keys(routes).find(it => routes[it].name === name);

  if (!key) {
    return '';
  }

  const route = routes[key];

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
};

export const transformNavigationRequest = (
  request: NavigationRequest,
  routes: Record<string, Route>
): string | number => {
  // if string we return it
  if (!isNamedNavigationRequest(request)) {
    return request as string;
  }

  // we have a named request
  // build the route
  return buildPathFromRequest(request as NamedNavigationRequest, routes);
};
