
import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "../app";

describe("POST /projects", () => {
  it("creates a project with a valid name", async () => {
    const response = await request(app)
      .post("/projects")
      .send({ name: "Test Project" });

    expect(response.status).toBe(201);
    expect(response.body.message).toBe("Project created successfully");
    expect(response.body.project.name).toBe("Test Project");
  });

  it("rejects an empty project name", async () => {
    const response = await request(app)
      .post("/projects")
      .send({ name: "   " });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe(
      "Project name must be a non-empty string of at most 100 characters"
    );
  });

  it("rejects a number as the project name", async () => {
    const response = await request(app)
      .post("/projects")
      .send({ name: 123 });

    expect(response.status).toBe(400);
  });
});

describe("PATCH /projects/:id", () => {
  it("updates an existing project", async () => {
    const created = await request(app)
      .post("/projects")
      .send({ name: "Original Project" });

    const id = created.body.project.id;

    const response = await request(app)
      .patch(`/projects/${id}`)
      .send({ name: "Updated Project" });

    expect(response.status).toBe(200);
    expect(response.body.project.name).toBe("Updated Project");
  });

  it("returns 404 when the project does not exist", async () => {
    const response = await request(app)
      .patch("/projects/99999")
      .send({ name: "Updated Project" });

    expect(response.status).toBe(404);
  });
});

describe("DELETE /projects/:id", () => {
  it("deletes an existing project", async () => {
    const created = await request(app)
      .post("/projects")
      .send({ name: "Project to Delete" });

    const id = created.body.project.id;

    const response = await request(app).delete(`/projects/${id}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Project deleted successfully");
  });

  it("returns 404 when the project does not exist", async () => {
    const response = await request(app).delete("/projects/99999");

    expect(response.status).toBe(404);
  });
});
