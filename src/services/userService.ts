
import { Prisma } from "../generated/prisma/client";
import { prisma } from "../lib/prisma";

export const createUser = async (
  email: string,
  passwordHash: string
) => {
  try {
    return await prisma.user.create({
      data: {
        email,
        passwordHash,
      },
    });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return null;
    }

    throw error;
  }
};

export const findUserByEmail = async (email: string) => {
  return await prisma.user.findUnique({
    where: {
      email,
    },
  });
};
