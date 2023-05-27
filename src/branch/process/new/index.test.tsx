/** @jsx createJsxElement */
/** @jsxFrag createFragmentTemplate */

// @ts-ignore
import { createJsxElement, createFragmentTemplate } from "../../create/index.js";
import { describe, expect, it } from "vitest";
import { initBranch } from "../../utils/index.js";
import createNewBranch from "./index.js";
import { BranchTag } from "../../types/index.js";

describe("new", () => {
  const parent = initBranch();

  it("should create a function branch", () => {
    const Container = () => <div></div>;
    const template = <Container />;

    const branch = createNewBranch(template, parent, 0);

    expect(branch.tag).toBe(BranchTag.Function);
  });

  it("should create an element branch", () => {
    const template = <div></div>;
    const branch = createNewBranch(template, parent, 0);

    expect(branch.tag).toBe(BranchTag.Element);
  });

  it("should create a fragment branch", () => {
    const template = <></>;
    const branch = createNewBranch(template, parent, 0);

    expect(branch.tag).toBe(BranchTag.Fragment);
  });

  it("should create a text branch", () => {
    const template = "test";
    const branch = createNewBranch(template, parent, 0);

    expect(branch.tag).toBe(BranchTag.Text);
  });

  it.each([[undefined], [null], [true], [false]])("should create a null branch", template => {
    const branch = createNewBranch(template, parent, 0);

    expect(branch.tag).toBe(BranchTag.Null);
  });
});
