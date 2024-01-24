export const canUseDOM = () => {
  return typeof window !== "undefined" && !!document;
};
