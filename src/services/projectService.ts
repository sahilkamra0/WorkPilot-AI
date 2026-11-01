import { prisma } from "../lib/prisma";



export const getAllProjects = async () => {
  return await prisma.project.findMany();
};


export const addProject = async (name: string) => {
  return await prisma.project.create({
    data: {
      name,
    },
  });
};  

export const updateProject = async (id: number, name: string) => {
  try {
    return await prisma.project.update({
      where: { id },
      data: { name },
    });
  } catch (error) {
    if (
      error instanceof Error &&
      "code" in error &&
      error.code === "P2025"
    ) {
      return null;
    }

    throw error;
  }
};

export const deleteProject = async (id: number) => {
  try {
    return await prisma.project.delete({
      where: { id },
    });
  } catch (error) {
    if (
      error instanceof Error &&
      "code" in error &&
      error.code === "P2025"
    ) {
      return null;
    }

    throw error;
  }
};
