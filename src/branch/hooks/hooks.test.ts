import { describe, expect, it } from "vitest";
import { Branch, BranchStatus, BranchTag, HookType } from "../types/index.js";
import { createHookKey, ctx, useHooksContext } from "./index.js";

describe("createHookKey", () => {
  it.each([
    [HookType.Effect, 2, `${HookType.Effect}@2`],
    [HookType.Memo, 0, `${HookType.Memo}@0`],
    [HookType.State, 1, `${HookType.State}@1`],
  ])("should create hook key : (%s) + (%s) => (%s)", (type, index, res) => {
    expect(createHookKey(type, index)).toBe(res);
  });
});

describe("useHooksContext", () => {
  const branch: Branch = {
    children: [],
    hooks: {},
    key: 0,
    pendingActions: [],
    props: {},
    status: BranchStatus.Pending,
    tag: BranchTag.Element,
    type: "div",
  };

  it("should execute a context", () => {
    useHooksContext(() => {
      expect(ctx.get()).toStrictEqual(branch);
    }, branch);
  });
});
