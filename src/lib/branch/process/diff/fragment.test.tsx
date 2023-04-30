/** @jsx createJsxElement */
/** @jsxFrag createFragmentTemplate */

// @ts-ignore
import { createFragmentTemplate, createJsxElement } from "../../create/index.js";
import { describe, expect, it } from "vitest";
import fragment from "./fragment.js";

describe("diff.fragment", () => {
  it("should just return children", () => {
    const template = <>hello world</>;

    expect(fragment(template as any)).toStrictEqual(["hello world"]);
  });
});
