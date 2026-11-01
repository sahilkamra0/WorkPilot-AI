
import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import { createUser, findUserByEmail } from "../services/userService";
import { generateToken } from "../utils/jwt";
import { prisma } from "../lib/prisma";

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {

    const { email, password } = req.body;

    if (
      typeof email !== "string" ||
      typeof password !== "string" ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) ||
      password.length < 8 ||
!/[a-z]/.test(password) ||
!/[A-Z]/.test(password) ||
!/[0-9]/.test(password)
    ) {
      return res.status(400).json({
        message: "A valid email and password of at least 8 characters are required",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const existingUser = await findUserByEmail(normalizedEmail);

    if (existingUser) {
      return res.status(409).json({
        message: "An account with this email already exists",
      });
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const user = await createUser(normalizedEmail, passwordHash);

        if (!user) {
      return res.status(409).json({
        message: "An account with this email already exists",
      });
    }

    return res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user.id,
        email: user.email,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    return next(error);
  }
};


export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    if (
      typeof email !== "string" ||
      typeof password !== "string" ||
      !email.trim() ||
      !password
    ) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const user = await findUserByEmail(normalizedEmail);

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      user.passwordHash
    );

    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }
    
    const token = generateToken(user.id);

    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        email: user.email,
      },
    });
  } catch (error) {
    return next(error);
  }
};


export const getCurrentUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = res.locals.userId as number;

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        email: true,
        createdAt: true,
      },
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json({ user });
  } catch (error) {
    return next(error);
  }
};


export const logoutUser = (
  _req: Request,
  res: Response
) => {
  return res.status(200).json({
    message: "Logout successful. Discard your authentication token.",
  });
};


