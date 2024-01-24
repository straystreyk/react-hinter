export const canUseDOM = () => {
  return !!(
    typeof window !== "undefined" &&
    window.document &&
    document &&
    window.document.createElement
  );
};
