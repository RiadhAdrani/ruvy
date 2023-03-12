import { flatten } from "../utils";
import { describe, it, expect } from "vitest";
import { RawRoute } from "../../types";

describe("flatten", () => {
  it("should throw when input is not an array", () => {
    expect(() => flatten(0 as unknown as Array<RawRoute>)).toThrow();
  });

  it("should throw when a path is blank", () => {
    expect(() => flatten([{ path: "" }])).toThrow();
  });

  it("should flatten an array of raw routes", () => {
    const routes: Array<RawRoute> = [
      { path: "/", title: "Home" },
      { path: "test-2", title: "Test 2", component: "component" },
      { path: "test", title: "Test", redirectTo: "/test-2" },
    ];

    expect(flatten(routes)).toStrictEqual({
      "/": {
        path: "/",
        fragments: [],
        title: "Home",
        isDynamic: false,
      },
      "/test-2": {
        path: "/test-2",
        fragments: ["test-2"],
        title: "Test 2",
        isDynamic: false,
        component: "component",
      },
      "/test": {
        path: "/test",
        fragments: ["test"],
        title: "Test",
        redirectTo: "/test-2",
        isDynamic: false,
      },
    });
  });

  it("should flatten routes recursively", () => {
    const routes: Array<RawRoute> = [
      {
        path: "/",
        routes: [{ path: "main" }, { path: "user", routes: [{ path: ":id" }] }],
      },
      { path: "*" },
    ];

    expect(flatten(routes)).toStrictEqual({
      "/": {
        path: "/",
        fragments: [],
        isDynamic: false,
      },
      "/*": {
        path: "/*",
        fragments: ["*"],
        isDynamic: false,
      },
      "/main": {
        path: "/main",
        fragments: ["main"],
        isDynamic: false,
      },
      "/user": {
        path: "/user",
        fragments: ["user"],
        isDynamic: false,
      },
      "/user/:id": {
        path: "/user/:id",
        fragments: ["user", ":id"],
        isDynamic: true,
      },
    });
  });
});
