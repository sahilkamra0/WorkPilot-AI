
import jwt from "jsonwebtoken";

const jwtSecret = process.env.JWT_SECRET;

if (!jwtSecret) {
  throw new Error("JWT_SECRET is not set");
}

export const generateToken = (userId: number): string => {
  return jwt.sign(
    { userId },
    jwtSecret,
    { expiresIn: "1h" }
  );
};
