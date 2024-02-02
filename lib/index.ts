export {
  useCallback,
  useState,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useId,
  useComposable,
  createContext,
  createComposable,
} from './component/index.js';

export { Outlet, Portal, Fragment } from './types.js';

export type { RuvyNode } from './types.js';
export * from './global.d.js';

export { mountApp, unmountApp } from './core/index.js';

export {
  getParams,
  getPathname,
  createRouter,
  createDestination,
  navigate,
  getSearchParams,
  unmountRouter,
} from './router/router.js';

export { RouterType, isUrlNavigatable } from '@riadh-adrani/dom-router';

export type {
  RawRoute,
  IndexRawRoute,
  PathRawRoute,
  CatchRawRoute,
  LayoutRawRoute,
  DestinationOptions,
  NamedDestinationRequest,
  RelativeDestinationRequest,
  DestinationRequest,
} from '@riadh-adrani/dom-router';

export * from './utils/utils.js';
