

export const isValidProjectName = (name: unknown): name is string => {
  return (
    typeof name === "string" &&
    name.trim().length > 0 &&
    name.trim().length <= 100
  );
};
