import type { Callback } from '@riadh-adrani/utils';

export interface NamedNavigationRequest {
  name: string;
  params?: Record<string, string | number>;
  search?: Record<string, string | number>;
}

export type NavigationRequest = number | string | NamedNavigationRequest;

export interface CommonRoute<T = unknown> {
  path: string;
  name?: string;
  redirectTo?: string;
  title?: string;
  component: T;
}

export interface RawRoute<T = unknown> extends CommonRoute<T> {
  routes?: Array<RawRoute<T>>;
}

export interface Route<T = unknown> extends CommonRoute<T> {
  fragments: Array<string>;
  isDynamic: boolean;
}

export type TransformTitle = (title: string, route: Route) => string;

export interface RouterConstructorParams {
  onStateChange: Callback;
  base?: string;
  scrollToTop?: boolean;
  titleSuffix?: string;
  titlePrefix?: string;
  transformTitle?: TransformTitle;
}

export type RouterParams = Omit<RouterConstructorParams, 'onStateChange'>;
