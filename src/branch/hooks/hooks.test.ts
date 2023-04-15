import { describe, expect, it } from "vitest";
import { HookType } from "../types/index.js";
import { createHookKey } from "./index.js";

describe("createHookKey", () => {
  it.each([
    [HookType.Effect, 2, `${HookType.Effect}@2`],
    [HookType.Memo, 0, `${HookType.Memo}@0`],
    [HookType.State, 1, `${HookType.State}@1`],
  ])("should create hook key : (%s) + (%s) => (%s)", (type, index, res) => {
    expect(createHookKey(type, index)).toBe(res);
  });
});
