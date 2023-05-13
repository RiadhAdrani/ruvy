import type { Callback } from "./common.js";

export interface CommonRoute<T = unknown> {
  path: string;
  redirectTo?: string;
  title?: string;
  component: T;
}

export interface RawRoute<T = unknown> extends CommonRoute<T> {
  routes?: Array<RawRoute>;
}

export interface Route<T = unknown> extends CommonRoute<T> {
  fragments: Array<string>;
  isDynamic: boolean;
}

export interface RouterParams {
  onStateChange: Callback;
  base?: string;
  scrollToTop?: boolean;
}