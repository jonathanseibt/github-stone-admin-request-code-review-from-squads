interface IEvent {
  (event: keyof DocumentEventMap, selector: string, callback: (element: HTMLElement) => void): void
}

const event: IEvent = (event, selector, callback): void =>
  document.addEventListener(event, (event): void => {
    if (!event.target) return

    const element = event.target as HTMLElement

    if (element.matches(selector)) callback(element)
  })

export { event }
