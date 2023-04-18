import { describe, expect, it, vitest } from "vitest";
import { getTag, haveSameTagAndType, isValidTemplate, isValidTextChild } from "./index.js";
import { Branch, BranchStatus, BranchSymbol, BranchTag, BranchTemplate } from "../types/index.js";
import { omit } from "@riadh-adrani/utils";
import { createFragmentTemplate } from "../create/index.js";

describe("isBranchTemplate", () => {
  const template: BranchTemplate = { children: [], props: {}, symbol: BranchSymbol, type: "div" };
  const templateNoChildren = omit(template, "children");
  const templateNoProps = omit(template, "props");
  const templateNoSymbol = omit(template, "symbol");
  const templateNoType = omit(template, "type");

  it.each([
    ["test", false],
    [1, false],
    [true, false],
    [{}, false],
    [templateNoChildren, false],
    [templateNoProps, false],
    [templateNoSymbol, false],
    [templateNoType, false],
    [template, true],
  ])("should determine if object is branch template", (obj, res) => {
    expect(isValidTemplate(obj)).toBe(res);
  });
});

describe("isBranchTemplateTextChild", () => {
  it.each([
    ["test", true],
    [1, true],
    [{}, true],
    [false, false],
    [true, false],
    [null, false],
    [undefined, false],
    [{ children: [], props: {}, symbol: BranchSymbol, type: "div" }, false],
  ])("should determine if object (%s) is branch template", (obj, res) => {
    expect(isValidTextChild(obj)).toBe(res);
  });
});

describe("getTag", () => {
  const fc: BranchTemplate = { children: [], props: {}, symbol: BranchSymbol, type: vitest.fn() };
  const fr: BranchTemplate = {
    children: [],
    props: {},
    symbol: BranchSymbol,
    type: createFragmentTemplate,
  };
  const div: BranchTemplate = { children: [], props: {}, symbol: BranchSymbol, type: "div" };

  it.each([
    ["hello", BranchTag.Text],
    [1, BranchTag.Text],
    [{}, BranchTag.Text],
    [true, BranchTag.Null],
    [null, BranchTag.Null],
    [undefined, BranchTag.Null],
    [fc, BranchTag.Function],
    [fr, BranchTag.Fragment],
    [div, BranchTag.Element],
  ])("should return correct branch type (%s) => (%s)", (obj, expected) => {
    expect(getTag(obj)).toBe(expected);
  });
});

describe("haveSameTagAndType", () => {
  const fn = vitest.fn();
  const fn2 = vitest.fn();

  const fc: BranchTemplate = { children: [], props: {}, symbol: BranchSymbol, type: fn };
  const fc2: BranchTemplate = { children: [], props: {}, symbol: BranchSymbol, type: fn2 };
  const fcBranch: Branch = {
    children: [],
    hooks: {},
    key: 0,
    pendingActions: [],
    props: {},
    status: BranchStatus.Mounted,
    tag: BranchTag.Function,
    type: fn,
  };

  const fr: BranchTemplate = {
    children: [],
    props: {},
    symbol: BranchSymbol,
    type: createFragmentTemplate,
  };
  const fr2: BranchTemplate = {
    children: [],
    props: {},
    symbol: BranchSymbol,
    type: createFragmentTemplate,
  };
  const frBranch: Branch = {
    children: [],
    hooks: {},
    key: 0,
    pendingActions: [],
    props: {},
    status: BranchStatus.Mounted,
    tag: BranchTag.Fragment,
    type: createFragmentTemplate,
  };

  const el: BranchTemplate = { children: [], props: {}, symbol: BranchSymbol, type: "div" };
  const el2: BranchTemplate = { children: [], props: {}, symbol: BranchSymbol, type: "button" };
  const elBranch: Branch = {
    children: [],
    hooks: {},
    key: 0,
    pendingActions: [],
    props: {},
    status: BranchStatus.Mounted,
    tag: BranchTag.Element,
    type: "div",
  };

  const text = "text";
  const text2 = "text-2";
  const textBranch: Branch = {
    children: [],
    hooks: {},
    key: 0,
    pendingActions: [],
    props: {},
    status: BranchStatus.Mounted,
    tag: BranchTag.Text,
    type: BranchTag.Text,
  };

  const nullBranch: Branch = {
    children: [],
    hooks: {},
    key: 0,
    pendingActions: [],
    props: {},
    status: BranchStatus.Mounted,
    tag: BranchTag.Null,
    type: BranchTag.Null,
  };

  it.each([
    // function
    [fcBranch, fc, true],
    [fcBranch, fc2, false],
    [fcBranch, fr, false],
    [fcBranch, el, false],
    [fcBranch, text, false],
    [fcBranch, text, false],
    [fcBranch, 1, false],
    [fcBranch, null, false],

    // fragment
    [frBranch, fc, false],
    [frBranch, fc2, false],
    [frBranch, fr, true],
    [frBranch, fr2, true],
    [frBranch, el, false],
    [frBranch, text, false],
    [frBranch, "text", false],
    [frBranch, 1, false],
    [frBranch, null, false],

    // element
    [elBranch, fc, false],
    [elBranch, fc2, false],
    [elBranch, fr, false],
    [elBranch, fr2, false],
    [elBranch, el, true],
    [elBranch, el2, false],
    [elBranch, text, false],
    [elBranch, "text", false],
    [elBranch, 1, false],
    [elBranch, null, false],

    // text
    [textBranch, fc, false],
    [textBranch, fc2, false],
    [textBranch, fr, false],
    [textBranch, fr2, false],
    [textBranch, el, false],
    [textBranch, el2, false],
    [textBranch, text, true],
    [textBranch, text2, true],
    [textBranch, 1, true],
    [textBranch, null, false],

    // null
    [nullBranch, fc, false],
    [nullBranch, fc2, false],
    [nullBranch, fr, false],
    [nullBranch, fr2, false],
    [nullBranch, el, false],
    [nullBranch, el2, false],
    [nullBranch, text, false],
    [nullBranch, text2, false],
    [nullBranch, 1, false],
    [nullBranch, null, true],
  ])("should compare branch and template : (%s) vs (%s) => (%s)", (branch, template, res) => {
    expect(haveSameTagAndType(branch, template)).toBe(res);
  });
});
