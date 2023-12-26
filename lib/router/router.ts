import { RuvyError } from '@/helpers/helpers.js';
import { RouterOptions, Template } from '@/types.js';
import { DestinationRequest, RouterInstance } from '@riadh-adrani/dom-router';

let router: RouterInstance<Template> | undefined;

export const createRouter = (options: RouterOptions) => {
  if (router) {
    throw new RuvyError('another router was already, please unmount it first');
  }

  const onChanged = () => {
    // TODO: request update
  };

  router = new RouterInstance({ ...options, onChanged });
};

const withRouter = <T>(callback: (router: RouterInstance<Template>) => T): T => {
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

  return router.getElementByDepth(depth);
};

export const navigate = (destination: DestinationRequest) => {
  withRouter(router => {
    router.navigate(destination);
  });
};

export const createDestination = (destination: DestinationRequest): string | undefined => {
  if (typeof destination === 'number') return undefined;

  if (typeof destination === 'string') return destination;

  return withRouter(router => router.createPathFromNamedDestination(destination));
};

export const getPath = (): string => withRouter(router => router.getPath());

export const getSearchParams = (): Record<string, string | undefined> =>
  withRouter(router => router.getSearchParams());
