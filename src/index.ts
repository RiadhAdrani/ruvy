// init
export { mountApp } from './core/index.js';

// hooks
export { useKey } from './core/index.js';
export {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useId,
  useRef,
  useContext,
  createContext,
  useReactive,
  usePromise,
} from './branch/index.js';

export { Portal } from './branch/index.js';

// router
export {
  createRouter,
  navigate,
  replace,
  getParams,
  getRoute,
  getPathname,
  getSearchParams,
} from './core/index.js';
export { Outlet } from './branch/index.js';

// types
export type { Effect, RuvyNode, Namespace, BranchKey as Key } from './branch/types.js';
export type { MountParams } from './core/types.js';
export type { RawRoute, RouterParams } from './router/types.js';
export type { StateArray } from './store/types.js';
export * from './types/index.js';

// utils
export * from './utils/utils.js';
