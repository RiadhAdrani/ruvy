import { describe, expect, it, beforeEach, vitest } from "vitest";
import {
  ActionType,
  Branch,
  BranchAction,
  BranchStatus,
  BranchTag,
  HookData,
  HookType,
  SetEffectData,
} from "../types/index.js";
import {
  createHookKey,
  ctx,
  dispatchUseEffect,
  dispatchUseState,
  useHooksContext,
  useEffect,
  collectEffects,
} from "./index.js";
import { BranchHooks } from "../types/index.js";
import { cast, omit } from "@riadh-adrani/utils";

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
    status: BranchStatus.Mounting,
    tag: BranchTag.Element,
    type: "div",
    unmountedChildren: [],
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
      status: BranchStatus.Mounting,
      tag: BranchTag.Element,
      type: "div",
      unmountedChildren: [],
    };
  });

  it("should create a hook entry with value, setter and a getter", () => {
    const [val, set, get] = useHooksContext(() => {
      return dispatchUseState("0", "test", branch);
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
      return dispatchUseState("0", "test-2", branch);
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

describe("dispatchSetEffect", () => {
  let branch: Branch;

  beforeEach(() => {
    branch = {
      children: [],
      hooks: {},
      key: 0,
      pendingActions: [],
      props: {},
      status: BranchStatus.Mounting,
      tag: BranchTag.Element,
      type: "div",
      unmountedChildren: [],
    };
  });

  it("should create a hook entry", () => {
    const key = "0";

    const callback = vitest.fn();

    useHooksContext(() => {
      dispatchUseEffect(key, { callback, deps: undefined }, branch);
    }, branch);

    const hook = cast<HookData<SetEffectData>>(branch.hooks[key]);

    expect(hook.key).toBe(`0`);
    expect(hook.type).toBe(HookType.Effect);
  });

  it("should run effect/cleanup via pending", () => {
    const key = "0";

    const cleanup = vitest.fn();
    const callback = vitest.fn(() => cleanup);

    useHooksContext(() => {
      dispatchUseEffect(key, { callback, deps: undefined }, branch);
    }, branch);

    const hook = cast<HookData<SetEffectData>>(branch.hooks[key]);

    hook.data.pendingEffect?.();

    expect(callback).toHaveBeenCalledOnce();
    expect(hook.data.pendingEffect).toBe(undefined);

    // trigger clean up manually
    hook.data.pendingCleanUp = hook.data.cleanUp;

    hook.data.pendingCleanUp?.();
    expect(cleanup).toHaveBeenCalledOnce();
    expect(hook.data.pendingCleanUp).toBe(undefined);
    expect(hook.data.cleanUp).toBe(undefined);
  });

  it("should not override data when reexecuted", () => {
    const key = "0";

    const cleanup = vitest.fn();
    const callback = vitest.fn(() => cleanup);
    const callback2 = vitest.fn();

    useHooksContext(() => {
      dispatchUseEffect(key, { callback, deps: undefined }, branch);
    }, branch);

    useHooksContext(() => {
      dispatchUseEffect(key, { callback: callback2, deps: undefined }, branch);
    }, branch);

    const hook = cast<HookData<SetEffectData>>(branch.hooks[key]);

    expect(hook.data.callback).toStrictEqual(callback);
  });

  it("should override data when deps changes", () => {
    const key = "0";

    const cleanup = vitest.fn();
    const callback = vitest.fn(() => cleanup);

    const cleanup2 = vitest.fn();
    const callback2 = vitest.fn(() => cleanup2);

    useHooksContext(() => {
      dispatchUseEffect(key, { callback, deps: undefined }, branch);
    }, branch);

    useHooksContext(() => {
      dispatchUseEffect(key, { callback: callback2, deps: 1 }, branch);
    }, branch);

    const hook = cast<HookData<SetEffectData>>(branch.hooks[key]);

    expect(hook.data.callback).toStrictEqual(callback2);
    expect(hook.data.deps).toStrictEqual(1);

    hook.data.pendingEffect?.();

    expect(callback).toHaveBeenCalledTimes(0);
    expect(callback2).toHaveBeenCalledOnce();
    expect(hook.data.pendingEffect).toBe(undefined);

    // trigger clean up manually
    hook.data.pendingCleanUp = hook.data.cleanUp;

    hook.data.pendingCleanUp?.();

    expect(cleanup).toHaveBeenCalledTimes(0);
    expect(cleanup2).toHaveBeenCalledOnce();
    expect(hook.data.pendingCleanUp).toBe(undefined);
    expect(hook.data.cleanUp).toBe(undefined);
  });
});

describe("collectEffects", () => {
  let branch: Branch;

  beforeEach(() => {
    branch = {
      children: [],
      hooks: {},
      key: 0,
      pendingActions: [],
      props: {},
      status: BranchStatus.Mounting,
      tag: BranchTag.Element,
      type: "div",
      unmountedChildren: [],
    };
  });

  it("should collect pending effects", () => {
    const cleanup = vitest.fn();
    const callback = vitest.fn(() => cleanup);

    useHooksContext(() => {
      useEffect(callback);
    }, branch);

    const hook = branch.hooks[`${HookType.Effect}@0`] as HookData<SetEffectData>;
    expect(hook).toBeDefined();

    const { pendingEffect } = hook.data;

    const actions = collectEffects(branch);

    expect(actions.length).toBe(1);
    expect(omit(actions[0], "requestTime")).toStrictEqual<Omit<BranchAction, "requestTime">>({
      callback: pendingEffect!,
      type: ActionType.Effect,
    });
  });

  it("should collect pending cleanup", () => {
    const cleanup = vitest.fn();
    const callback = vitest.fn(() => cleanup);

    useHooksContext(() => {
      useEffect(callback);
    }, branch);

    const hook = branch.hooks[`${HookType.Effect}@0`] as HookData<SetEffectData>;
    expect(hook).toBeDefined();

    const { pendingEffect } = hook.data;

    pendingEffect?.();

    hook.data.pendingCleanUp = hook.data.cleanUp;

    const actions = collectEffects(branch);

    expect(actions.length).toBe(1);
    expect(omit(actions[0], "requestTime")).toStrictEqual<Omit<BranchAction, "requestTime">>({
      callback: hook.data.cleanUp!,
      type: ActionType.Cleanup,
    });
  });
});
