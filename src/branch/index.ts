import { BranchTemplate } from './types.js';

export {
  useEffect,
  useState,
  useMemo,
  useRef,
  useCallback,
  useId,
  useContext,
  createContext,
  useReactive,
  usePromise,
} from './hooks/index.js';

export { createFragmentTemplate, createJsxElement, createTemplate } from './create/index.js';

export * from './types.js';

export * from './components/components.js';
export { process } from './components/components.js';

export { commit, collectActions } from './utils/index.js';

export const Outlet = (): BranchTemplate => null as unknown as BranchTemplate;
