/** @jsxFrag createFragmentTemplate */
/** @jsx createJsxElement */

import { describe, expect, it } from "vitest";
import { createTemplate, createJsxElement, createFragmentTemplate } from "./index.js";
import { BranchSymbol, BranchTemplate } from "../types/index.js";

createJsxElement;

describe("createTemplate", () => {
  it("should add symbol", () => {
    const template = createTemplate("div", {}, []);

    expect(template).toStrictEqual<BranchTemplate>({
      type: "div",
      children: [],
      props: {},
      symbol: BranchSymbol,
      key: undefined,
    });
  });

  it("should add key from props", () => {
    const template = createTemplate("div", { key: 1 }, []);

    expect(template).toStrictEqual<BranchTemplate>({
      type: "div",
      children: [],
      props: { key: 1 },
      symbol: BranchSymbol,
      key: 1,
    });
  });
});

describe("createJsxElement", () => {
  it("should create a jsx element", () => {
    const template = <div class="test" />;

    expect(template).toStrictEqual<BranchTemplate>({
      type: "div",
      children: [],
      props: { class: "test" },
      symbol: BranchSymbol,
      key: undefined,
    });
  });

  it("should create an jsx element with children", () => {
    const template = (
      <div class="test" key="2">
        Hello
      </div>
    );

    expect(template).toStrictEqual<BranchTemplate>({
      type: "div",
      children: ["Hello"],
      props: { class: "test", key: "2" },
      symbol: BranchSymbol,
      key: "2",
    });
  });
});

describe("createJsxFragment", () => {
  it("should create a jsx fragment", () => {
    const template = <></>;

    expect(template).toStrictEqual<BranchTemplate>({
      type: createFragmentTemplate,
      children: [],
      props: {},
      symbol: BranchSymbol,
      key: undefined,
    });
  });
});
