
import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "../app";

describe("Authentication API", () => {
  it("registers, logs in, and protects user routes", async () => {
    const email = `auth-test-${Date.now()}@example.com`;
    const password = "StrongPass123";

    // 1. Register a new user
    const registerResponse = await request(app)
      .post("/users/register")
      .send({ email, password });

    expect(registerResponse.status).toBe(201);
    expect(registerResponse.body.user.email).toBe(email);
    expect(registerResponse.body.user.passwordHash).toBeUndefined();

    // 2. Reject duplicate registration
    const duplicateResponse = await request(app)
      .post("/users/register")
      .send({ email, password });

    expect(duplicateResponse.status).toBe(409);

    // 3. Reject an incorrect password
    const invalidLoginResponse = await request(app)
      .post("/users/login")
      .send({
        email,
        password: "WrongPassword123",
      });

    expect(invalidLoginResponse.status).toBe(401);

    // 4. Log in with the correct password
    const loginResponse = await request(app)
      .post("/users/login")
      .send({ email, password });

    expect(loginResponse.status).toBe(200);
    expect(loginResponse.body.token).toEqual(
      expect.any(String)
    );

    const token = loginResponse.body.token;

    // 5. Reject access without a token
    const unauthorizedResponse = await request(app)
      .get("/users/me");

    expect(unauthorizedResponse.status).toBe(401);

    // 6. Allow access with a valid token
    const profileResponse = await request(app)
      .get("/users/me")
      .set("Authorization", `Bearer ${token}`);

    expect(profileResponse.status).toBe(200);
    expect(profileResponse.body.user.email).toBe(email);
    expect(profileResponse.body.user.passwordHash).toBeUndefined();

    // 7. Allow an authenticated logout request
    const logoutResponse = await request(app)
      .post("/users/logout")
      .set("Authorization", `Bearer ${token}`);

    expect(logoutResponse.status).toBe(200);
  });

  it("rejects an invalid email during registration", async () => {
    const response = await request(app)
      .post("/users/register")
      .send({
        email: "not-an-email",
        password: "StrongPass123",
      });

    expect(response.status).toBe(400);
  });

  it("rejects an invalid JWT on protected routes", async () => {
    const response = await request(app)
      .get("/users/me")
      .set("Authorization", "Bearer invalid.token.value");

    expect(response.status).toBe(401);
    expect(response.body.message).toBe(
      "Invalid or expired authentication token"
    );
  });

  it("rejects a weak password during registration", async () => {
    const response = await request(app)
      .post("/users/register")
      .send({
        email: `weak-password-${Date.now()}@example.com`,
        password: "password",
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toContain("password");
  });

  it("rejects registration when credentials are missing", async () => {
    const response = await request(app)
      .post("/users/register")
      .send({
        email: "",
        password: "",
      });

    expect(response.status).toBe(400);
  });

  it("rejects login when credentials are missing", async () => {
    const response = await request(app)
      .post("/users/login")
      .send({
        email: "",
        password: "",
      });

    expect(response.status).toBe(400);
  });
});
