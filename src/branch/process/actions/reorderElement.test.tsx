/** @jsx createJsxElement */
/** @jsxFrag createFragmentTemplate */

// @ts-ignore
import { createJsxElement, createFragmentTemplate } from "../../create/index.js";

import { beforeEach, describe, expect, it } from "vitest";
import root from "../new/root.js";
import element from "../new/element.js";
import { collectActions, commit } from "../common/index.js";
import createReorderHostElement from "./reorderElement.js";

describe("createReorderHostElement", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
  });

  it("should reorder branch instance", () => {
    const parent = root(document.body, null);

    const div = (
      <div>
        <input />
        <input />
        <button />
      </div>
    );

    const branch = element(div as any, parent, 0);
    commit(collectActions(branch));

    expect(document.body.innerHTML).toBe("<div><input><input><button></button></div>");

    const child1 = branch.children[0];
    const child2 = branch.children[1];
    const child3 = branch.children[2];

    branch.children = [child3, child1, child2];

    createReorderHostElement(child3)();
    expect(document.body.innerHTML).toBe("<div><button></button><input><input></div>");
  });

  it("should reorder branch instance even when nested", () => {
    const parent = root(document.body, null);

    const div = (
      <div>
        <input />
        <input />
        <>
          <button />
        </>
      </div>
    );

    const branch = element(div as any, parent, 0);
    commit(collectActions(branch));

    expect(document.body.innerHTML).toBe("<div><input><input><button></button></div>");

    const child1 = branch.children[0];
    const child2 = branch.children[1];
    const child3 = branch.children[2];

    branch.children = [child3, child1, child2];

    createReorderHostElement(child3.children[0])();
    expect(document.body.innerHTML).toBe("<div><button></button><input><input></div>");
  });
});
