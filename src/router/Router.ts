import { RawRoute, Route } from "../types";

export default class Router {
  routes: Record<string, Route> = {};

  constructor(routes: Array<RawRoute>) {
    // convert raw routes to routes
    // attach pop state event listener
  }
}
