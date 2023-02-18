import { beforeAll, describe, expect, it, vitest } from "vitest";
import { Callback, RawRoute, Route } from "../../types";
import Router from "../Router";

const testId: RawRoute = { path: ":id" };
const test: RawRoute = { path: "test", routes: [testId] };
const root: RawRoute = { path: "/", routes: [test] };

describe("Router class", () => {
  let onChange: Callback;
  let router: Router;

  beforeAll(() => {
    location.pathname = "/";

    onChange = vitest.fn(() => 0);

    router = new Router([root], {
      onStateChange: onChange,
    });
  });

  it("should push state correctly", () => {
    router.push("/hello");

    expect(location.pathname).toBe("/hello");
    expect(history.state).toStrictEqual({ path: "/hello" });
    expect(history.length).toBe(2);
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it("should replace state correctly", () => {
    router.replace("/hello");

    expect(location.pathname).toBe("/hello");
    expect(history.state).toStrictEqual({ path: "/hello" });
    expect(history.length).toBe(2);
    expect(onChange).toHaveBeenCalledTimes(2);
  });

  it("should get current path", () => {
    router.push("/test");

    expect(router.path).toBe("/test");
  });

  it("should get current path with base", () => {
    router.base = "tester";
    router.push("/test");

    expect(router.path).toBe("/test");
  });

  it("should get route object", () => {
    router.push("/test");

    const route = router.route as Route;

    expect(route).toBeDefined();
    expect(route.isDynamic).toBe(false);
    expect(route.path).toBe("/test");
  });
});
