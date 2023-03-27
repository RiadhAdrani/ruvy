import { it, describe, expect } from "vitest";
import Event from "../Events.js";

describe("Event", () => {
  it.each([
    ["onClick", true],
    ["click", false],
    ["onChange", true],
    ["onclick", true],
    ["on Click", false],
  ])("should validate name %s to %s", (name, expected) => {
    expect(Event.isValidName(name)).toBe(expected);
  });

  it.each([
    ["onClick", true, () => 0],
    ["onClick", false, ""],
    ["onChange", false, {}],
    ["click", false, () => 0],
  ])("should validate event %s to %s", (name, expected, callback) => {
    expect(Event.isValid(name, callback)).toBe(expected);
  });
});
