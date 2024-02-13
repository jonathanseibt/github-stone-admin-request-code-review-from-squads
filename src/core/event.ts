interface IEvent {
  (event: keyof DocumentEventMap, selector: string, callback: (element: HTMLElement) => void): void
}

const event: IEvent = (event, selector, callback): void =>
  document.addEventListener(event, (event): void => {
    if (!(event.target instanceof HTMLElement) || !event.target.matches(selector)) return

    callback(event.target)
  })

export { event }
