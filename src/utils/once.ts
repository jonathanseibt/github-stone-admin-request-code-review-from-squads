import { get } from '.'

interface IOnce {
  (event: 'find' | 'mount' | 'unmount', selector: string, callback: (element: HTMLElement) => void): void
}

const once: IOnce = (event, selector, callback): ReturnType<IOnce> => {
  const selectedElement = get(selector)

  if (event === 'find' && selectedElement) {
    callback(selectedElement)
    return
  }

  const observer = new MutationObserver((records: MutationRecord[]): void => {
    const mutations = records.filter((record): boolean => record.type === 'childList').reverse()

    let nodes: Node[] = []
    switch (event) {
      case 'find':
        nodes = mutations.map((mutation): Node => mutation.target)
        break
      case 'mount':
        nodes = mutations.flatMap((mutation): Node[] => Array.from(mutation.addedNodes))
        break
      case 'unmount':
        nodes = mutations.flatMap((mutation): Node[] => Array.from(mutation.removedNodes))
        break
    }

    const elements = nodes.filter((node): node is HTMLElement => node.nodeType === Node.ELEMENT_NODE)

    let element: HTMLElement | undefined
    switch (event) {
      case 'find':
      case 'mount':
        element = elements.find((listenedElement): boolean => listenedElement.matches(selector))
        break
      case 'unmount':
        element = elements.find((listenedElement): boolean => listenedElement === selectedElement)
        break
    }

    if (element) {
      callback(element)
      observer.disconnect()
    }
  })

  observer.observe(document, { childList: true, subtree: true })
}

export { once }
