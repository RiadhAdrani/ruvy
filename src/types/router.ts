export interface CommonRoute {
  path: string;
  redirectTo?: string;
  title?: string;
}

export interface RawRoute extends CommonRoute {
  routes?: Array<RawRoute>;
}

export interface Route extends CommonRoute {
  fragments: Array<string>;
}
