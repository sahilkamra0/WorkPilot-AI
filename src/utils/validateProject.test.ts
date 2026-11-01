
import { describe, it, expect } from "vitest";
import { isValidProjectName } from "./validateProject";

describe("isValidProjectName", () => {
  it("accepts a valid project name", () => {
    expect(isValidProjectName("WorkPilot AI")).toBe(true);
  });

  it("rejects an empty name", () => {
    expect(isValidProjectName("")).toBe(false);
  });

  it("rejects a name containing only spaces", () => {
    expect(isValidProjectName("   ")).toBe(false);
  });

  it("rejects a number", () => {
    expect(isValidProjectName(123)).toBe(false);
  });

  it("rejects a name longer than 100 characters", () => {
    expect(isValidProjectName("A".repeat(101))).toBe(false);
  });
});
