export const generateRandomId = (): string => {
  return (Math.random() + 1).toString(36).substring(2);
};
