export function event(event: keyof DocumentEventMap, selector: string, callback: (element: HTMLElement) => void): void {
  return document.addEventListener(event, (event): void => {
    if (!(event.target instanceof HTMLElement) || !event.target.matches(selector)) return

    callback(event.target)
  })
}
