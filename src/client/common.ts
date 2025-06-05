export function findTarget(el: HTMLElement, selector: (el: HTMLElement) => boolean): HTMLElement | undefined {
  return selector(el)
    ? el
    : el.parentElement
      ? findTarget(el.parentElement, selector)
      : undefined;
}