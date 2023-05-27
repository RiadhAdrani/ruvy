/** @jsx createJsxElement */
/** @jsxFrag createFragmentTemplate */

// @ts-ignore
import { createFragmentTemplate, createJsxElement } from "../../create/index.js";
import { describe, expect, it, vitest } from "vitest";
import { initBranch } from "../../utils/index.js";
import fn from "./function.js";

describe("diff.function", () => {
  it("should return function result", () => {
    const Component = vitest.fn(() => <div />);

    const branch = initBranch({ type: Component });

    const res = fn(branch, (<Component />) as any);

    expect(res).toStrictEqual([<div />]);
  });

  it("should execute function with current context", () => {
    const Component = vitest.fn(() => <div />);

    const branch = initBranch({ type: Component });

    fn(branch, (<Component />) as any);

    expect(Component).toHaveBeenCalledOnce();
  });
});
