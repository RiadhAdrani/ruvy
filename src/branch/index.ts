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
} from './hooks/index.js';

import { createFragmentTemplate } from './create/index.js';

export { createJsxElement, createTemplate } from './create/index.js';
export { createFragmentTemplate };

export * from './types.js';

export * from './components/components.js';
export { handleComponent } from './components/components.js';

export const Outlet = (): BranchTemplate => null as unknown as BranchTemplate;

export { Fragment } from './components/fragment/fragment.js';
