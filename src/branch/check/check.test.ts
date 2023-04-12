import { describe, expect, it, vitest } from "vitest";
import { getBranchTypeByTemplate } from "./index.js";
import { BranchSymbol, BranchTag, BranchTemplate } from "../types/index.js";

describe("getBranchTypeByTemplate", () => {
  const fc: BranchTemplate = { children: [], props: {}, symbol: BranchSymbol, type: vitest.fn() };
  const fr: BranchTemplate = {
    children: [],
    props: {},
    symbol: BranchSymbol,
    type: BranchTag.Fragment,
  };
  const div: BranchTemplate = { children: [], props: {}, symbol: BranchSymbol, type: "div" };

  it.each([
    ["hello", BranchTag.Text],
    [1, BranchTag.Text],
    [{}, BranchTag.Text],
    [true, BranchTag.Text],
    [null, BranchTag.Null],
    [undefined, BranchTag.Null],
    [fc, BranchTag.Function],
    [fr, BranchTag.Fragment],
    [div, BranchTag.Element],
  ])("should return correct branch type (%s) => (%s)", (obj, expected) => {
    expect(getBranchTypeByTemplate(obj)).toBe(expected);
  });
});
