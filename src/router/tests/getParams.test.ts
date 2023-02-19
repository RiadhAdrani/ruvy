import { it, describe, expect } from "vitest";
import { getParams } from "../utils";

describe("getParams", () => {
  it.each([
    ["/", "/:id", { id: "undefined" }],
    ["/user", "/:id", { id: "user" }],
    ["/:id", "/:id", { id: ":id" }],
    ["/123/test/tester", "/:id/test/:type", { id: "123", type: "tester" }],
    ["/user/123/section/about", "/user/:id/section/:section", { id: "123", section: "about" }],
  ])("should extract correct params '%s' x '%s'", (path, template, expected) => {
    expect(getParams(path, template)).toStrictEqual(expected);
  });
});
