const OFFSET = 10;
const DEAD_LINE = 10 + OFFSET;

export const renderHinterPos = (
  element: HTMLElement,
  hinterElement: HTMLDivElement,
) => {
  const { left } = element.getBoundingClientRect();
  let leftToUse = left + element.offsetWidth / 2;
  let topToUse = element.offsetTop + OFFSET + element.offsetHeight;

  const preferredPos = element.dataset?.rhPreferredPosition || "bottom";
  const hinterHeight = hinterElement.offsetHeight;
  const hinterWidth = hinterElement.offsetWidth;

  if (leftToUse - hinterWidth / 2 < 0) {
    leftToUse += (leftToUse - hinterWidth / 2 - OFFSET) * -1;
  }
  if (leftToUse + hinterWidth / 2 > window.innerWidth) {
    leftToUse -= leftToUse + hinterWidth / 2 - window.innerWidth + OFFSET;
  }

  if (preferredPos === "bottom") {
    const range = window.innerHeight - hinterHeight - topToUse;
    // если указали bottom а нет места на отрисовку внизу
    if (range < DEAD_LINE) topToUse = element.offsetTop - hinterHeight - OFFSET;
  }

  if (preferredPos === "top") {
    const range = element.offsetTop - hinterHeight - OFFSET;
    // если указали top а нет места на отрисовку внизу
    if (range > DEAD_LINE) topToUse = element.offsetTop - hinterHeight - OFFSET;
  }

  return {
    left: leftToUse,
    top: topToUse,
  };
};
