import { beforeEach, describe, expect, it, vitest } from "vitest";
import { createReactiveObject, useReactive } from "./useReactive.js";
import { ReactiveArray } from "@riadh-adrani/utils";
import { initBranch } from "../../utils/index.js";
import { createJsxElement, createFragmentTemplate } from "../../create/index.js";
import { HookType, process } from "../../index.js";

createFragmentTemplate;
createJsxElement;

describe("useReactive", () => {
  let onChanged = vitest.fn();

  beforeEach(() => {
    onChanged = vitest.fn();
  });

  describe("createReactiveObject", () => {
    it("should create an object with same structure", () => {
      const out = createReactiveObject({ hello: "world" }, onChanged);

      expect(out).toStrictEqual({ hello: "world" });
    });

    it("should create a reactive array", () => {
      const out = createReactiveObject([1, 2, 3], onChanged);

      expect(out instanceof ReactiveArray).toBe(true);
    });

    it("should execute onValueChanged when a property changes", () => {
      const out = createReactiveObject({ hello: "world" }, onChanged);

      out.hello = "test";

      expect(onChanged).toHaveBeenCalledOnce();
    });

    it("should execute onValueChanged when a nested property changes", () => {
      const out = createReactiveObject({ props: { n: 1, s: "" } }, onChanged);

      out.props.n = 2;

      expect(onChanged).toHaveBeenCalledOnce();
    });

    it("should execute onValueChanged when an item is pushed into a nested array", () => {
      const out = createReactiveObject({ numbers: [1, 2, 3] }, onChanged);

      out.numbers.push(4);

      expect(onChanged).toHaveBeenCalledOnce();
      expect((out.numbers as ReactiveArray<number>).items).toStrictEqual([1, 2, 3, 4]);
    });

    it("should transform the new value to reactive", () => {
      const out = createReactiveObject(
        { props: { n: 1, s: { count: 0, name: "test" } } },
        onChanged
      );

      out.props.s = { count: 1, name: "done" };
      out.props.s.count++;

      expect(onChanged).toHaveBeenCalledTimes(2);
    });
  });

  describe("dispatchUseReactive", () => {
    it("should add hook", () => {
      const branch = initBranch();

      const Child = () => {
        const count = useReactive({ value: 0 });

        return <div>{count.value}</div>;
      };

      const out = process(<Child />, undefined, branch, 0);

      expect(out.hooks[`${HookType.Reactive}@0`]).toStrictEqual({
        data: { value: 0 },
        initialData: { value: 0 },
        key: `${HookType.Reactive}@0`,
        type: HookType.Reactive,
      });
    });
  });
});
