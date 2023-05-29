/** @jsx createJsxElement */

import { describe, expect, beforeEach, it } from "vitest";
import { createJsxElement } from "../../create/index.js";
import { Core, Outlet, createRouter } from "../../../core/Core.js";
import { initBranch } from "../../utils/index.js";
import outlet from "./outlet.js";
import { BranchTag } from "../../types.js";

createJsxElement;

describe("new.outlet", () => {
  beforeEach(() => {
    new Core();

    createRouter([{ path: "/", component: "root element" }], {});
  });

  it("should return nothing", () => {
    new Core();

    const parent = initBranch();
    const branch = outlet(<Outlet />, parent, 0);

    expect(branch.type).toStrictEqual(Outlet);
    expect(branch.tag).toStrictEqual(BranchTag.Outlet);

    expect(branch.children.length).toBe(1);
    expect(branch.children[0].tag).toBe(BranchTag.Null);
  });

  it("should return root element", () => {
    const parent = initBranch();
    const branch = outlet(<Outlet />, parent, 0);

    expect(branch.type).toStrictEqual(Outlet);
    expect(branch.tag).toStrictEqual(BranchTag.Outlet);

    expect(branch.children.length).toBe(1);
    expect(branch.children[0].tag).toBe(BranchTag.Text);
    expect(branch.children[0].text).toBe("root element");
  });
});
