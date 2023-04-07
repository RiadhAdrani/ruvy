import { describe, beforeEach, expect, it } from "vitest";
import {
  ComponentNodeType,
  ComponentSymbol,
  ComputedComponent,
  HookType,
  MemoizedHook,
  Namespace,
} from "../../types/_component.js";
import { createHookKey, dispatchHook, resetHooksIndex, useHooksContext } from "./index.js";
import { StateArray } from "../../types/store.js";
import { Core } from "../../core/Core.js";

describe("hooks", () => {
  let root: ComputedComponent;
  let grandParent: ComputedComponent;
  let parent: ComputedComponent;
  let child: ComputedComponent;

  beforeEach(() => {
    Core.singleton.store.resetUsage();

    resetHooksIndex();

    root = {
      attributes: {},
      children: [],
      memoizedProps: {},
      elementTag: "div",
      elementType: "div",
      events: {},
      memoizedHooks: {},
      key: 0,
      nodeType: ComponentNodeType.Standard,
      ns: Namespace.html,
      symbol: ComponentSymbol,
    };

    grandParent = {
      attributes: {},
      children: [],
      memoizedProps: {},
      elementTag: "div",
      elementType: "div",
      events: {},
      memoizedHooks: {},
      key: 0,
      nodeType: ComponentNodeType.Standard,
      ns: Namespace.html,
      symbol: ComponentSymbol,
      parent: root,
    };

    parent = {
      attributes: {},
      children: [],
      memoizedProps: {},
      elementTag: "div",
      elementType: "div",
      events: {},
      memoizedHooks: {},
      key: 0,
      nodeType: ComponentNodeType.Standard,
      ns: Namespace.html,
      symbol: ComponentSymbol,
      parent: grandParent,
    };

    child = {
      attributes: {},
      children: [],
      memoizedProps: {},
      elementTag: "div",
      elementType: "div",
      events: {},
      memoizedHooks: {},
      key: 0,
      nodeType: ComponentNodeType.Standard,
      ns: Namespace.html,
      symbol: ComponentSymbol,
      parent: parent,
    };

    root.children = [grandParent];
    grandParent.children = [parent];
    parent.children = [child];
  });

  describe("createHookKey", () => {
    it("should create hook key with correct path", () => {
      const key = createHookKey(HookType.state, 0, root);

      expect(key).toBe("[useState]-[0]-[0]");
    });

    it("should create hook key for nested component", () => {
      const key = createHookKey(HookType.state, 5, child);

      expect(key).toBe("[useState]-[5]-[0]-[0]-[0]-[0]");
    });
  });

  describe("dispatchHook", () => {
    it("should throw when no component exists within the context", () => {
      expect(() => dispatchHook(HookType.state, 0)).toThrow(
        "Cannot dispatch hook outside a functional component."
      );
    });

    it("should create a new hook entry", () => {
      useHooksContext(() => {
        dispatchHook(HookType.state, 0);
      }, root);

      expect(root.memoizedHooks["[useState]-[0]-[0]"]).toStrictEqual<MemoizedHook>({
        index: 0,
        initialValue: 0,
        key: "[useState]-[0]-[0]",
        type: HookType.state,
      });
    });

    it("should return a state array", () => {
      let array = [] as unknown as StateArray<number>;

      useHooksContext(() => {
        array = dispatchHook(HookType.state, 0);
      }, root);

      expect(array).toBeTruthy();
      expect(array.length).toBe(3);
    });

    it("should retrieve existing hook", () => {
      useHooksContext(() => {
        dispatchHook(HookType.state, 0);
      }, root);

      resetHooksIndex();

      useHooksContext(() => {
        dispatchHook(HookType.state, 0);
      }, root);

      expect(root.memoizedHooks["[useState]-[0]-[0]"]).toStrictEqual<MemoizedHook>({
        index: 0,
        initialValue: 0,
        key: "[useState]-[0]-[0]",
        type: HookType.state,
      });
    });

    it("should throw when number of hooks changes between iterations", () => {
      useHooksContext(() => {
        dispatchHook(HookType.state, 0);
      }, root);

      resetHooksIndex();

      const callback = () =>
        useHooksContext(() => {
          dispatchHook(HookType.state, 0);
          dispatchHook(HookType.state, 0);
        }, root);

      expect(callback).toThrow(`Number of hooks changed between renders`);
    });

    it("should change initial value when a new hook called with different initial value than actual", () => {
      useHooksContext(() => {
        dispatchHook(HookType.state, 0);
      }, root);

      resetHooksIndex();

      const [count] = useHooksContext(() => {
        return dispatchHook(HookType.state, 1);
      }, root);

      expect(count).toBe(1);
      expect(root.memoizedHooks["[useState]-[0]-[0]"].initialValue).toBe(1);
    });
  });
});
