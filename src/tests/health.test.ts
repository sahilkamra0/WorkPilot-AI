
import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "../app";

describe("GET /health", () => {
  it("returns a healthy status", async () => {
    const response = await request(app).get("/health");

    expect(response.status).toBe(200);
    expect(response.body.status).toBe("OK");
    expect(response.body.message).toBe(
      "WorkPilot AI backend is healthy"
    );
  });
});
