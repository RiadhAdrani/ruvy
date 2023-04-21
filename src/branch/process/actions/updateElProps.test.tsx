/** @jsx createJsxElement */

// @ts-ignore
import { createJsxElement } from "../../create/index.js";
import { beforeEach, describe, expect, it, vitest } from "vitest";
import el from "../new/element.js";
import root from "../new/root.js";
import createRenderAction from "./render.js";
import { diffElProps } from "../diff/element.js";
import createElPropsUpdateAction from "./updateElProps.js";
import { cast } from "@riadh-adrani/utils";

describe("updateElProps", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
  });

  it("should update attribute", () => {
    const parent = root(document.body, null);

    const div = el((<div class="test" />) as any, parent, 0);
    createRenderAction(div)();

    expect(document.body.innerHTML).toBe('<div class="test"></div>');

    const div2 = el((<div class="test-2" />) as any, parent, 0);
    const diffs = diffElProps(div.props, div2.props);
    createElPropsUpdateAction(div, diffs)();

    expect(document.body.innerHTML).toBe('<div class="test-2"></div>');
  });

  it("should add attribute", () => {
    const parent = root(document.body, null);

    const div = el((<div />) as any, parent, 0);
    createRenderAction(div)();

    expect(document.body.innerHTML).toBe("<div></div>");

    const div2 = el((<div class="test" />) as any, parent, 0);
    const diffs = diffElProps(div.props, div2.props);
    createElPropsUpdateAction(div, diffs)();

    expect(document.body.innerHTML).toBe('<div class="test"></div>');
  });

  it("should remove an attribute", () => {
    const parent = root(document.body, null);

    const div = el((<div class="test" />) as any, parent, 0);
    createRenderAction(div)();

    expect(document.body.innerHTML).toBe('<div class="test"></div>');

    const div2 = el((<div />) as any, parent, 0);
    const diffs = diffElProps(div.props, div2.props);
    createElPropsUpdateAction(div, diffs)();

    expect(document.body.innerHTML).toBe("<div></div>");
  });

  it("should add event", () => {
    const parent = root(document.body, null);

    const onClick = vitest.fn();

    const div = el((<div />) as any, parent, 0);
    createRenderAction(div)();

    const div2 = el((<div onClick={onClick} />) as any, parent, 0);
    const diffs = diffElProps(div.props, div2.props);

    createElPropsUpdateAction(div, diffs)();

    cast<HTMLElement>(div.instance).click();

    expect(onClick).toHaveBeenCalledOnce();
  });

  it("should update event", () => {
    const parent = root(document.body, null);

    const onClick = vitest.fn();
    const onClick2 = vitest.fn();

    const div = el((<div onClick={onClick} />) as any, parent, 0);
    createRenderAction(div)();

    const div2 = el((<div onClick={onClick2} />) as any, parent, 0);
    const diffs = diffElProps(div.props, div2.props);

    createElPropsUpdateAction(div, diffs)();

    cast<HTMLElement>(div.instance).click();

    expect(onClick).toHaveBeenCalledTimes(0);
    expect(onClick2).toHaveBeenCalledOnce();
  });

  it("should remove event", () => {
    const parent = root(document.body, null);

    const onClick = vitest.fn();

    const div = el((<div onClick={onClick} />) as any, parent, 0);
    createRenderAction(div)();

    const div2 = el((<div />) as any, parent, 0);
    const diffs = diffElProps(div.props, div2.props);

    createElPropsUpdateAction(div, diffs)();

    cast<HTMLElement>(div.instance).click();

    expect(onClick).toHaveBeenCalledTimes(0);
  });
});
