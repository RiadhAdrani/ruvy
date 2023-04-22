/** @jsx createJsxElement */

// @ts-ignore
import { createFragmentTemplate, createJsxElement } from "../../create/index.js";

import { beforeEach, describe, expect, it, vitest } from "vitest";
import { initBranch } from "../../utils/index.js";
import createRenderAction from "./render.js";
import { Branch, BranchStatus, BranchTag } from "../../types/index.js";
import text from "../new/text.js";
import element from "../new/element.js";
import { createElement, injectNode } from "@riadh-adrani/dom-utils";

describe("createRenderAction", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
  });

  const root = initBranch({ tag: BranchTag.Root, type: BranchTag.Root, instance: document.body });

  it("should throw when branch is non-element", () => {
    const branch = initBranch() as Branch<string>;

    expect(createRenderAction(branch)).toThrow(`Cannot render a non-host branch.`);
  });

  it("should inject text in the root", () => {
    const branch = text("text", root, 0);

    createRenderAction(branch)();

    expect(document.body.outerHTML).toBe("<body>text</body>");

    expect(branch.instance).toBeDefined();
    expect(branch.status).toBe(BranchStatus.Mounted);
  });

  it("should inject div in the root", () => {
    const branch = element((<div />) as any, root, 0);

    createRenderAction(branch)();

    expect(document.body.outerHTML).toBe("<body><div></div></body>");

    expect(branch.instance).toBeDefined();
    expect(branch.status).toBe(BranchStatus.Mounted);
  });

  it("should inject div with props", () => {
    const branch = element((<div class="test" id="test" />) as any, root, 0);

    createRenderAction(branch)();

    expect(document.body.outerHTML).toBe('<body><div class="test" id="test"></div></body>');
  });

  it("should inject div with events", () => {
    const onClick = vitest.fn();

    const branch = element((<div onClick={onClick} />) as any, root, 0);

    createRenderAction(branch)();

    expect(document.body.outerHTML).toBe("<body><div></div></body>");

    const instance = branch.instance as HTMLDivElement;
    instance.click();

    expect(onClick).toHaveBeenCalledOnce();
  });

  it("should replace element instead of just creating a new one", () => {
    const instance = createElement("input");
    injectNode(instance, document.body);

    expect(document.body.outerHTML).toBe("<body><input></body>");

    const oldBranch = initBranch({
      instance,
      type: "div",
      tag: BranchTag.Element,
      status: BranchStatus.Mounted,
    });

    const branch = element((<div />) as any, root, 0);
    branch.old = oldBranch;

    createRenderAction(branch)();

    expect(document.body.outerHTML).toBe("<body><div></div></body>");
  });

  it("should replace element nested deeply", () => {
    const instance = createElement("input");
    injectNode(instance, document.body);

    expect(document.body.outerHTML).toBe("<body><input></body>");

    const oldBranch = initBranch({
      type: createFragmentTemplate,
      tag: BranchTag.Fragment,
      status: BranchStatus.Mounted,
    });

    oldBranch.children.push(
      initBranch({
        type: "input",
        tag: BranchTag.Element,
        status: BranchStatus.Mounted,
        instance,
      })
    );

    const branch = element((<div />) as any, root, 0);
    branch.old = oldBranch;

    createRenderAction(branch)();

    expect(document.body.outerHTML).toBe("<body><div></div></body>");
  });
});
