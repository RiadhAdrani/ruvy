import { Callback } from "./common";

export interface CommonRoute<T = unknown> {
  path: string;
  redirectTo?: string;
  title?: string;
  object?: T;
}

export interface RawRoute<T = unknown> extends CommonRoute<T> {
  routes?: Array<RawRoute>;
}

export interface Route<T = unknown> extends CommonRoute<T> {
  fragments: Array<string>;
  isDynamic: boolean;
}

export interface RouterConfig {
  onStateChange: Callback;
  base?: string;
  scrollToTop?: boolean;
}
