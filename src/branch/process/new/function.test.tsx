/** @jsx createJsxElement */

// @ts-ignore
import { createJsxElement } from "../../create/index.js";
import { expect, describe, it, vitest } from "vitest";
import createFn from "./function.js";
import { createTemplate } from "../../create/index.js";
import { Branch, BranchStatus, BranchTag, HookType } from "../../types/index.js";
import { cast } from "@riadh-adrani/utils";
import { setState } from "../../hooks/index.js";

describe("new.function", () => {
  it("should create a branch from a function", () => {
    const fn = vitest.fn();

    const branch = createFn(createTemplate(fn, { text: 1 }, []), {} as unknown as Branch, 0);

    expect(branch).toStrictEqual<Branch>({
      children: [],
      hooks: {},
      key: 0,
      pendingActions: [],
      props: { text: 1, children: [] },
      status: BranchStatus.Pending,
      tag: BranchTag.Function,
      type: fn,
      parent: cast<Branch>({}),
    });
  });

  it("should create a branch with a hook", () => {
    const fn = () => {
      setState("text");

      return undefined;
    };

    const branch = createFn(createTemplate(fn, {}, []), {} as unknown as Branch, 0);

    expect(branch).toStrictEqual<Branch>({
      children: [],
      hooks: {
        [`${HookType.State}@0`]: {
          data: "text",
          initialData: "text",
          key: `${HookType.State}@0`,
          type: HookType.State,
        },
      },
      key: 0,
      pendingActions: [],
      props: { children: [] },
      status: BranchStatus.Pending,
      tag: BranchTag.Function,
      type: fn,
      parent: cast<Branch>({}),
    });
  });
});
