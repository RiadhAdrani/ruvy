/** @jsx createJsxElement */

// @ts-ignore
import { createJsxElement } from "../../create/index.js";
import { beforeEach, describe, expect, it } from "vitest";
import element from "../new/element.js";
import root from "../new/root.js";
import createRemoveBranchAction from "./removeBranch.js";

describe("createRemoveBranchAction", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
  });

  it("should remove branch", () => {
    const parent = root(document.body, null);

    const div = element((<div>Hello</div>) as any, parent, 0);

    createRemoveBranchAction(div.children[0])();

    expect(div.children).toStrictEqual([]);
  });
});