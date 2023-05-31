import { BranchTemplate } from "./types.js";

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
} from "./hooks/index.js";

export { createFragmentTemplate, createJsxElement, createTemplate } from "./create/index.js";

export * from "./types.js";

export * from "./process/index.js";

export { default as process } from "./process/index.js";

export { default as createRoot } from "./process/new/root.js";

export const Outlet = (): BranchTemplate => null as unknown as BranchTemplate;
