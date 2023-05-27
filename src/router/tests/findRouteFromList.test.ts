import { describe, it, expect } from "vitest";
import { Route } from "../../types/index.js";
import { findRouteFromList as find } from "../utils/index.js";

describe("findRouteFromList", () => {
  const root = { path: "/", fragments: [], isDynamic: false, component: "" };
  const feed = { path: "/feed", fragments: ["feed"], isDynamic: false, component: "" };
  const feedModal = {
    path: "/feed/modal",
    fragments: ["feed", "modal"],
    isDynamic: false,
    component: "",
  };
  const user = { path: "/user", fragments: ["user"], isDynamic: false, component: "" };
  const userSettings = {
    path: "/user/settings",
    fragments: ["user", "settings"],
    isDynamic: false,
    component: "",
  };
  const userId = { path: "/user/:id", fragments: ["user", ":id"], isDynamic: false, component: "" };
  const userIdSection = {
    path: "/user/:id/section",
    fragments: ["user", ":id", "section"],
    isDynamic: true,
    component: "",
  };
  const userIdSectionTitle = {
    path: "/user/:id/section/:title",
    fragments: ["user", ":id", "section", ":title"],
    isDynamic: true,
    component: "",
  };

  const list: Record<string, Route> = {
    "/": root,
    "/feed": feed,
    "/feed/modal": feedModal,
    "/user": user,
    "/user/settings": userSettings,
    "/user/:id": userId,
    "/user/:id/section": userIdSection,
    "/user/:id/section/:title": userIdSectionTitle,
  };

  it("should return root route", () => {
    expect(find("/", list)).toStrictEqual(root);
  });

  it("should return undefined", () => {
    expect(find("", list)).toStrictEqual(undefined);
  });

  it("should return exact route", () => {
    expect(find("/feed", list)).toStrictEqual(feed);
  });

  it("should return exact instead of dynamic route", () => {
    expect(find("/user/settings", list)).toStrictEqual(userSettings);
  });

  it("should return dynamic route", () => {
    expect(find("/user/a2b3c1", list)).toStrictEqual(userId);
  });

  it("should return dynamic route with exact", () => {
    expect(find("/user/a2b3c1/section", list)).toStrictEqual(userIdSection);
  });

  it("should return deeply dynamic route", () => {
    expect(find("/user/a2b3c1/section/1234", list)).toStrictEqual(userIdSectionTitle);
  });

  it("should return undefined", () => {
    expect(find("/user/a2b3c1/sector/1234", list)).toStrictEqual(undefined);
  });

  it("should return undefined", () => {
    expect(find("/user/a2b3c1/section/1234/yes", list)).toStrictEqual(undefined);
  });
});
