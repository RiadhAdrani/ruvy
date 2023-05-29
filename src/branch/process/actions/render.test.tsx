/** @jsx createJsxElement */

import { createFragmentTemplate, createJsxElement } from "../../create/index.js";

import { beforeEach, describe, expect, it, vitest } from "vitest";
import { initBranch } from "../../utils/index.js";
import createRenderAction from "./render.js";
import { Branch, BranchStatus, BranchTag } from "../../types.js";
import text from "../new/text.js";
import element from "../new/element.js";

createFragmentTemplate;
createJsxElement;

describe("createRenderAction", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
  });

  const root = initBranch({ tag: BranchTag.Root, type: BranchTag.Root, instance: document.body });

  it("should throw when branch is non-element", () => {
    const branch = initBranch() as Branch<string>;

    expect(createRenderAction(branch)).toThrow("Cannot render a non-host branch.");
  });

  it("should inject text in the root", () => {
    const branch = text("text", root, 0);

    createRenderAction(branch)();

    expect(document.body.outerHTML).toBe("<body>text</body>");

    expect(branch.instance).toBeDefined();
    expect(branch.status).toBe(BranchStatus.Mounted);
  });

  it("should inject div in the root", () => {
    const branch = element(<div />, root, 0);

    createRenderAction(branch)();

    expect(document.body.outerHTML).toBe("<body><div></div></body>");

    expect(branch.instance).toBeDefined();
    expect(branch.status).toBe(BranchStatus.Mounted);
  });

  it("should inject div with props", () => {
    const branch = element(<div class="test" id="test" />, root, 0);

    createRenderAction(branch)();

    expect(document.body.outerHTML).toBe(`<body><div class="test" id="test"></div></body>`);
  });

  it("should inject div with events", () => {
    const onClick = vitest.fn();

    const branch = element(<div onClick={onClick} />, root, 0);

    createRenderAction(branch)();

    expect(document.body.outerHTML).toBe("<body><div></div></body>");

    const instance = branch.instance as HTMLDivElement;
    instance.click();

    expect(onClick).toHaveBeenCalledOnce();
  });
});
