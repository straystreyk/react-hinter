const OFFSET = 10;
const DEAD_LINE = 10 + OFFSET;

export const renderHinterPos = (
  element: HTMLElement,
  hinterElement: HTMLDivElement
) => {
  const rect = element.getBoundingClientRect();
  const { left, top } = rect;
  const offsetTop = top + window.scrollY;

  const windowHeight =
    window.innerHeight || document.documentElement.clientHeight;
  const windowWidth = window.innerWidth || document.documentElement.clientWidth;

  const isInViewport =
    rect.top <= windowHeight &&
    rect.bottom >= 0 &&
    rect.left <= windowWidth &&
    rect.right >= 0;

  let leftToUse = left + element.offsetWidth / 2;
  let topToUse = offsetTop + OFFSET + element.offsetHeight;

  const preferredPos = element.dataset?.rhPreferredPosition || "bottom";
  const hinterHeight = hinterElement.offsetHeight;
  const hinterWidth = hinterElement.offsetWidth;

  if (leftToUse - hinterWidth / 2 < 0) {
    leftToUse += (leftToUse - hinterWidth / 2 - OFFSET) * -1;
  }
  if (leftToUse + hinterWidth / 2 > windowWidth) {
    leftToUse -= leftToUse + hinterWidth / 2 - windowWidth + OFFSET;
  }

  if (preferredPos === "bottom") {
    const range = window.innerHeight - hinterHeight - topToUse;
    // если указали bottom а нет места на отрисовку внизу
    if (range < DEAD_LINE) topToUse = offsetTop - hinterHeight - OFFSET;
  }

  if (preferredPos === "top") {
    const range = offsetTop - hinterHeight - OFFSET;
    // если указали top а нет места на отрисовку внизу
    if (range > DEAD_LINE) topToUse = offsetTop - hinterHeight - OFFSET;
  }

  return {
    left: leftToUse,
    top: topToUse,
    isInViewport,
  };
};
