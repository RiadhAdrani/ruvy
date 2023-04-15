import { describe, expect, it, beforeEach } from "vitest";
import { Branch, BranchStatus, BranchTag, HookType } from "../types/index.js";
import { createHookKey, ctx, dispatchSetState, useHooksContext } from "./index.js";
import { BranchHooks } from "../types/index.js";

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

describe("dispatchSetState", () => {
  let branch: Branch;

  beforeEach(() => {
    branch = {
      children: [],
      hooks: {},
      key: 0,
      pendingActions: [],
      props: {},
      status: BranchStatus.Pending,
      tag: BranchTag.Element,
      type: "div",
    };
  });

  it("should create a hook entry with value, setter and a getter", () => {
    const [val, set, get] = useHooksContext(() => {
      return dispatchSetState("0", "test", branch);
    }, branch);

    expect(branch.hooks).toStrictEqual<BranchHooks>({
      0: {
        data: "test",
        initialData: "test",
        key: `0`,
        type: HookType.State,
      },
    });

    expect(get()).toBe("test");
    expect(val).toBe("test");

    set("test-2");
    expect(get()).toBe("test-2");
  });

  it("should retrieve current state if non existing", () => {
    branch.hooks[0] = { data: "test", initialData: "test", key: "0", type: HookType.State };

    const [val, set, get] = useHooksContext(() => {
      return dispatchSetState("0", "test-2", branch);
    }, branch);

    expect(branch.hooks).toStrictEqual<BranchHooks>({
      0: {
        data: "test",
        initialData: "test",
        key: `0`,
        type: HookType.State,
      },
    });

    expect(get()).toBe("test");
    expect(val).toBe("test");

    set("test-2");
    expect(get()).toBe("test-2");
  });
});
