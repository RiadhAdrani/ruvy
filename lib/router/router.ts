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

  if (!router) {
    return;
  }

  const anchorEl = getClosestAnchorParent(e.target);

  if (anchorEl) {
    const path: string | null = anchorEl.getAttribute('href');
    if (path && isUrlNavigatable(path)) {
      e.preventDefault();

      navigate(path);
    }
  }
});

export const createRouter = (options: RouterOptions) => {
  if (router) {
    throw new RuvyError('another router was already, please unmount it first');
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

export const unmountRouter = () => {
  if (router) router.unload();

  router = undefined;
};

export const getTemplateByDepth = (depth: number): Template => {
  if (!router) return null;

  const template = router.getElementByDepth(depth);

  return template;
};

export const navigate = (destination: DestinationRequest, options: DestinationOptions = {}) => {
  withRouter(router => {
    router.navigate(destination, options);
  });
};

export const createDestination = (destination: DestinationRequest): string | undefined => {
  if (isUndefined(destination) || isNumber(destination)) return undefined;

  return withRouter(router => {
    if (typeof destination === 'string' && !isUrlNavigatable(destination)) {
      return destination;
    }
    return router.toHref(destination);
  });
};

export const getPathname = (): string => withRouter(router => router.getPath());

export const getSearchParams = () => withRouter(router => router.getSearchParams());

export const getParams = () => withRouter(router => router.getParams());
