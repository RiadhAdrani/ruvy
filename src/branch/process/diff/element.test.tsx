import { beforeEach, describe, expect, it } from "vitest";
import { initBranch } from "../../utils/index.js";
import { diffElementProps } from "./element.js";

describe("diff.element", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
  });

  it("should not create an op when values are the same", () => {
    const oldBranch = initBranch({ props: { class: "test" } });
    const newBranch = initBranch({ props: { class: "test" } });

    const ops = diffElementProps(oldBranch.props, newBranch.props);

    expect(ops).toStrictEqual([]);
  });

  it("should create a remove op", () => {
    const oldBranch = initBranch({ props: { class: "test" } });
    const newBranch = initBranch();

    const ops = diffElementProps(oldBranch.props, newBranch.props);

    expect(ops).toStrictEqual([{ op: "remove", priority: 1, prop: "class", value: "test" }]);
  });

  it("should create an update op", () => {
    const oldBranch = initBranch({ props: { class: "test" } });
    const newBranch = initBranch({ props: { class: "test-2" } });

    const ops = diffElementProps(oldBranch.props, newBranch.props);

    expect(ops).toStrictEqual([{ op: "update", priority: 1, prop: "class", value: "test-2" }]);
  });

  it("should create a set op", () => {
    const oldBranch = initBranch();
    const newBranch = initBranch({ props: { class: "test" } });

    const ops = diffElementProps(oldBranch.props, newBranch.props);

    expect(ops).toStrictEqual([{ op: "set", priority: 1, prop: "class", value: "test" }]);
  });
});
