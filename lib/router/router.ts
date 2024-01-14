import { isNumber, isUndefined } from '@riadh-adrani/obj-utils';
import { RuvyError } from '../helpers/helpers.js';
import { queueRequest } from '../core/index.js';
import { RouterOptions, Template } from '../types.js';
import {
  DestinationOptions,
  DestinationRequest,
  Router,
  isUrlNavigatable,
} from '@riadh-adrani/dom-router';

let router: Router<Template> | undefined;

export const __router__ = () => router;

export const getClosestAnchorParent = (element: Element): HTMLAnchorElement | undefined => {
  if (element.tagName.toLowerCase() === 'a') {
    return element as HTMLAnchorElement;
  }

  const parent = element.parentElement;

  if (parent) {
    if (parent.tagName.toLowerCase() === 'a') {
      return parent as HTMLAnchorElement;
    } else if (parent.parentElement) {
      return getClosestAnchorParent(parent.parentElement);
    }
  }

  return undefined;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
document.addEventListener('click', (e: any) => {
  if (!router) return;

  const anchorEl = getClosestAnchorParent(e.target);

  if (anchorEl) {
    const path: string | null = anchorEl.getAttribute('href');
    if (path && isUrlNavigatable(path)) {
      e.preventDefault();

      navigate(path);
    }
  }
});

/**
 * create a new router instance
 * @param options router options
 * @throws if a router is already created.
 * @since v0.5.0
 */
export const createRouter = (options: RouterOptions) => {
  if (router) {
    throw new RuvyError('another router was already mounted, please unmount it first');
  }

  const onChanged = () => {
    queueRequest({ type: 'route' });
  };

  router = new Router({ ...options, onChanged });
};

const withRouter = <T>(callback: (router: Router<Template>) => T): T => {
  if (!router) {
    throw new RuvyError('a router is yet to be created');
  }

  return callback(router);
};

/**
 * unmount the current router and perform needed cleanup.
 * @since v0.5.1
 */
export const unmountRouter = () => {
  router?.unload();

  router = undefined;
};

export const getTemplateByDepth = (depth: number): Template => {
  if (!router) return null;

  const template = router.getElementByDepth(depth);

  return template;
};

/**
 * schedule a navigation request using the provided destination.
 * @param destination request
 * @throws if no router is created
 * @param options navigation options.
 * @since v0.5.0
 */
export const navigate = (destination: DestinationRequest, options: DestinationOptions = {}) => {
  withRouter(router => {
    router.navigate(destination, options);
  });
};

/**
 * compute destination string path from a named/path destination request,
 * adds base and perform needed transformation for named routes.
 *
 * returns undefined when destination is of type ``undefined`` or a ``number``.
 *
 * @param destination named destination or a simple relative url path.
 * @throws if no router is created
 * @example
 * ```
 * const to = createDestination({name: 'User', params:{id:'122'}}); // /users/123
 * ```
 * @since v0.5.1
 */
export const createDestination = (destination: DestinationRequest): string | undefined => {
  if (isUndefined(destination) || isNumber(destination)) return undefined;

  if (typeof destination === 'string' && (!router || !isUrlNavigatable(destination))) {
    return destination;
  }

  return withRouter(router => {
    return router.toHref(destination);
  });
};

/**
 * retrieve the current router path (without base).
 *
 * @throws if no router is created
 * @example
 * ```jsx
 * const UserPage = () => {
 *  const path = getPathname() // /users/123
 *
 * // ...
 * }
 * ```
 * @since v0.5.0
 */
export const getPathname = (): string => withRouter(router => router.getPath());

/**
 * retrieve the current router path search query params.
 *
 * @throws if no router is created
 * @example
 * ```jsx
 * const UserPage = () => {
 *  const params = getSearchParams() // { id : '123' }
 *
 * // ...
 * }
 * ```
 * @since v0.5.0
 */
export const getSearchParams = () => withRouter(router => router.getSearchParams());

/**
 * retrieve the current router path params.
 *
 * @throws if no router is created
 * @example
 * ```jsx
 * const UserPage = () => {
 *  const params = getParams() // { id : '123' }
 *  // ...
 * }
 * ```
 * @since v0.5.0
 */
export const getParams = () => withRouter(router => router.getParams());
