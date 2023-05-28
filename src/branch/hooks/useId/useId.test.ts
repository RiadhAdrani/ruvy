import { describe, expect, it } from "vitest";
import { createId, getStore, removeId } from "./useId.js";

describe("useId", () => {
  it("should generate id with given length", () => {
    const id = createId(5);

    expect(id.length).toBe(5);

    removeId(id);
  });

  it("should remove id", () => {
    const id = createId(5);

    expect(id.length).toBe(5);

    removeId(id);

    expect(getStore()).toStrictEqual({});
  });

  it("should generate different id", () => {
    const id1 = createId(5);
    const id2 = createId(5);

    expect(id1 !== id2).toBe(true);
  });
});
