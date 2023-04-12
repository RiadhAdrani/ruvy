import { describe, expect, it } from "vitest";
import { createTemplate } from "./index.js";
import { BranchSymbol, BranchTemplate } from "../types/index.js";

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
