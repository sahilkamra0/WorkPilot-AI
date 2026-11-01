
type Project = {
  id: number;
  name: string;
};

const projects: Project[] = [
  { id: 1, name: "WorkPilot AI" },
  { id: 2, name: "My First Project" },
];

export const getAllProjects = () => {
  return projects;
};

let nextProjectId = 3;

export const addProject = (name: string) => {
  const project = {
    id: nextProjectId++,
    name,
  };

  projects.push(project);

  return project;
};

export const updateProject = (id: number, name: string) => {
  const project = projects.find((project) => project.id === id);

  if (!project) {
    return null;
  }

  project.name = name;

  return project;
};

export const deleteProject = (id: number) => {
  const projectIndex = projects.findIndex((project) => project.id === id);

  if (projectIndex === -1) {
    return null;
  }

  const deletedProjects = projects.splice(projectIndex, 1);

  return deletedProjects[0];
};

