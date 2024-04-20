export function getAll(selector: string): Array<HTMLElement> {
  return [...document.querySelectorAll<HTMLElement>(selector)]
}
